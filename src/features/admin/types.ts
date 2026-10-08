export type PlatformStats = {
  totalUsers: number;
  activeUsers: number;
  totalOrganizers: number;
  publishedEvents: number;
  activeEvents: number;
  completedMatches: number;
  verifiedEncounters: number;
  reportsPending: number;
};

export type PlatformSettings = {
  maintenanceMode: boolean;
  allowOrganizerRegistration: boolean;
  requireEventApproval: boolean;
  allowUserReports: boolean;
  defaultEventCapacity: number;
};
