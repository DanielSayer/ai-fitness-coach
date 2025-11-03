export type HrZonesSeconds = {
  zone1Seconds: number;
  zone2Seconds: number;
  zone3Seconds: number;
  zone4Seconds: number;
  zone5Seconds: number;
};

export type HrZonesPercent = {
  zone1Pct: number;
  zone2Pct: number;
  zone3Pct: number;
  zone4Pct: number;
  zone5Pct: number;
};

export type Activity = {
  activityId: number;
  activityName: string;
  type: string;
  startTimeLocal: string;
  startTimeGmt: string;
  beginTimestamp: number;
  durationSeconds: number;
  distanceMeters: number;
  avgSpeedMps: number;
  avgHeartRateBpm: number;
  maxHeartRateBpm: number;
  steps: number;
  elevationGainM: number;
  elevationLossM: number;
  startLatitude: number;
  startLongitude: number;
  moderateIntensityMinutes: number;
  vigorousIntensityMinutes: number;
  calories: number;
  hrZonesSeconds: HrZonesSeconds;
  hrZonesPercent: HrZonesPercent;
};
