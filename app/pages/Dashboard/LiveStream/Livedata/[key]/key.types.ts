// Form Values Interface
export interface FormValues {
  league: {
    name: string;
    logo: File | null;
  };
  homeTeam: {
    name: string;
    logo: File | null;
  };
  awayTeam: {
    name: string;
    logo: File | null;
  };
  round: string;
  dateTime: string;
  location: string;
}

export type channel = {
  status: string;
  dataValues: {
    channelName: string;
    isLive: string;
  };
};

export interface streamData {
  streamKey: string;
  streamUrl: string;
}

export type Match = {
  id: number;
  streamName: number;
  leagueName: string;
  leagueLogo: string;
  round: string;
  Date: string; // Format: "YYYY-MM-DD"
  location: string;
  HomeTeam: string;
  HomeTeamLogo: string;
  homeScore: number;
  AwayTeam: string;
  AwayTeamLogo: string;
  awayScore: number;
  status: string; // e.g. "pending", "live", "finished"
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  channel?: string;
};
