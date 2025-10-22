import os

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from garminconnect import Garmin, GarminConnectConnectionError, GarminConnectTooManyRequestsError

app = FastAPI(title="Garmin Summary API")


def _get_first(d, keys):
    for k in keys:
        if k in d and d[k] is not None:
            return d[k]
    return None


def build_camelcase_summary(overview, details):
    o = overview or {}
    d = details or {}

    summary = {
        "activityId": _get_first(o, ["activityId", "activityIdLocal", "activity_id"]),
        "activityName": _get_first(o, ["activityName", "name"]),
        "type": (o.get("activityType") or {}).get("typeKey")
        if isinstance(o.get("activityType"), dict)
        else _get_first(o, ["activityType", "activity_type"]),
        "startTimeLocal": _get_first(o, ["startTimeLocal", "start_time_local"]),
        "startTimeGmt": _get_first(o, ["startTimeGMT", "start_time_gmt"]),
        "beginTimestamp": _get_first(o, ["beginTimestamp"]),
        "durationSeconds": _get_first(o, ["duration", "durationInSeconds", "elapsedDuration"]),
        "distanceMeters": _get_first(o, ["distance", "distanceMeters", "distanceInMeters"]),
        "avgSpeedMps": _get_first(o, ["averageSpeed", "avgSpeed"]),
        "avgHeartRateBpm": _get_first(o, ["averageHR", "averageHeartRate", "avgHr"]),
        "maxHeartRateBpm": _get_first(o, ["maxHR", "maxHeartRate", "maxHr"]),
        "steps": _get_first(o, ["steps", "totalSteps"]),
        "elevationGainM": _get_first(o, ["elevationGain", "totalElevationGain"]),
        "elevationLossM": _get_first(o, ["elevationLoss", "totalElevationLoss"]),
        "startLatitude": _get_first(o, ["startLatitude", "start_latitude"]),
        "startLongitude": _get_first(o, ["startLongitude", "start_longitude"]),
        "hasPolyline": bool(_get_first(o, ["hasPolyline"])),
        "moderateIntensityMinutes": _get_first(o, ["moderateIntensityMinutes"]),
        "vigorousIntensityMinutes": _get_first(o, ["vigorousIntensityMinutes"]),
        "calories": _get_first(o, ["calories", "calorie"]),
    }

    # HR zones (Garmin commonly provides hrTimeInZone_1..5 on the overview)
    duration = summary.get("durationSeconds") or 0.0
    hr_zones_seconds = {}
    hr_zones_pct = {}
    try:
        dur = float(duration) if duration else 0.0
    except Exception:
        dur = 0.0

    for i in range(1, 6):
        # look for typical keys
        candidates = [f"hrTimeInZone_{i}", f"hrTimeInZone{i}", f"hr_time_in_zone_{i}", f"hrZone{i}"]
        secs = _get_first(o, candidates) or _get_first(d, candidates)
        secs_val = float(secs) if secs is not None else None
        hr_zones_seconds[f"zone{i}Seconds"] = secs_val
        if secs_val is not None and dur > 0:
            hr_zones_pct[f"zone{i}Pct"] = round((secs_val / dur) * 100.0, 2)
        else:
            hr_zones_pct[f"zone{i}Pct"] = None

    summary["hrZonesSeconds"] = hr_zones_seconds
    summary["hrZonesPercent"] = hr_zones_pct

    summary["note"] = "Compact camelCase summary. No HR samples included."

    return summary


def login_client():
    username = os.environ.get("GARMIN_USER")
    password = os.environ.get("GARMIN_PASS")
    if not username or not password:
        raise RuntimeError("GARMIN_USER and GARMIN_PASS environment variables must be set.")
    client = Garmin(username, password)
    try:
        client.login()
    except GarminConnectTooManyRequestsError as e:
        raise RuntimeError("Garmin rate limit") from e
    except GarminConnectConnectionError as e:
        raise RuntimeError("Garmin connection error") from e
    return client


@app.get("/activity/summary")
def activity_summary():
    """
    Returns a compact camelCase summary for the most recent activity.
    """
    try:
        client = login_client()
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))

    try:
        activities = client.get_activities(1)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch activities: {e}")

    if not activities:
        return JSONResponse(status_code=200, content={"message": "noActivities", "summary": None})

    overview = activities[0]
    activity_id = overview.get("activityId") or overview.get("activityIdLocal") or overview.get("activity_id")

    details = {}
    if activity_id:
        try:
            details = client.get_activity_details(activity_id) or {}
        except Exception:
            # not fatal; details optional for zone extraction
            details = {}

    summary = build_camelcase_summary(overview, details)
    return JSONResponse(status_code=200, content=summary)