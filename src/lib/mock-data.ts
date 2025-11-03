import type { Activity } from "./types/activity";

const activityMock: Activity = {
  activityId: 20828505766,
  activityName: "Brisbane Running",
  type: "running",
  startTimeLocal: "2025-10-29 17:25:37",
  startTimeGmt: "2025-10-29 07:25:37",
  beginTimestamp: 1761722737000,
  durationSeconds: 2022.3819580078125,
  distanceMeters: 5258.27001953125,
  avgSpeedMps: 2.5999999046325684,
  avgHeartRateBpm: 185,
  maxHeartRateBpm: 203,
  steps: 5370,
  elevationGainM: 20,
  elevationLossM: 29,
  startLatitude: -27.582023665308952,
  startLongitude: 153.06751591153443,
  moderateIntensityMinutes: 0,
  vigorousIntensityMinutes: 33,
  calories: 450,
  hrZonesSeconds: {
    zone1Seconds: 8,
    zone2Seconds: 9,
    zone3Seconds: 56.001,
    zone4Seconds: 251.998,
    zone5Seconds: 1683.786,
  },
  hrZonesPercent: {
    zone1Pct: 0.4,
    zone2Pct: 0.45,
    zone3Pct: 2.77,
    zone4Pct: 12.46,
    zone5Pct: 83.26,
  },
};

export { activityMock };
