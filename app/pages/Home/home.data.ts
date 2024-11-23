type FootballTable = {
    position: number;
    team: string;
    played: number;
    won: number;
    draw: number;
    lost: number;
    points: number;
  };
  
  const leagueTable: FootballTable[] = [
    {
      position: 1,
      team: "Manchester City",
      played: 12,
      won: 10,
      draw: 1,
      lost: 1,
      points: 31,
    },
    {
      position: 2,
      team: "Arsenal",
      played: 12,
      won: 9,
      draw: 2,
      lost: 1,
      points: 29,
    },
    {
      position: 3,
      team: "Liverpool",
      played: 12,
      won: 8,
      draw: 3,
      lost: 1,
      points: 27,
    },
    {
      position: 4,
      team: "Tottenham Hotspur",
      played: 12,
      won: 7,
      draw: 4,
      lost: 1,
      points: 25,
    },
    {
      position: 5,
      team: "Manchester United",
      played: 12,
      won: 7,
      draw: 2,
      lost: 3,
      points: 23,
    },
  ];
export default leagueTable  