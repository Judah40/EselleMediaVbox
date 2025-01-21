import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Clock, Trophy } from 'lucide-react';

interface Team {
  name: string;
  logo: string;
  score?: number;
}

interface Match {
  id: string;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  homeTeam: Team;
  awayTeam: Team;
  time: string;
  league: string;
  leagueIcon?: string;
}

interface ScrollableSectionProps {
  title: string;
  children: React.ReactNode;
}

interface MatchCardProps extends Match {}

const ScrollableSection: React.FC<ScrollableSectionProps> = ({ title, children }) => {
  const scrollLeft = () => {
    const container = document.getElementById(`scroll-${title}`);
    container?.scrollLeft && (container.scrollLeft -= 200);
  };

  const scrollRight = () => {
    const container = document.getElementById(`scroll-${title}`);
    container?.scrollLeft && (container.scrollLeft += 200);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={scrollLeft} 
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          <button 
            onClick={scrollRight} 
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            See all
          </button>
        </div>
      </div>
      <div
        id={`scroll-${title}`}
        className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {children}
      </div>
    </div>
  );
};

const MatchCard: React.FC<MatchCardProps> = ({ 
  status, 
  homeTeam, 
  awayTeam, 
  time, 
  league,
  leagueIcon 
}) => {
  const isLive = status === 'LIVE';
  const isPast = status === 'FINISHED';

  return (
    <div className="min-w-[320px] bg-gray-900 rounded-xl border border-gray-800 p-4 hover:border-gray-700 transition-all">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {leagueIcon ? (
            <img src={leagueIcon} alt={league} className="w-4 h-4" />
          ) : (
            <Trophy className="w-4 h-4 text-gray-500" />
          )}
          <span className="text-sm text-gray-400">{league}</span>
        </div>
        {isLive ? (
          <span className="px-3 py-1 bg-red-900/30 text-red-400 rounded-full text-xs font-medium flex items-center gap-1">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            LIVE
          </span>
        ) : (
          <div className="flex items-center gap-1 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-xs">{time}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-800 p-1">
              <img src={homeTeam.logo} alt={homeTeam.name} className="w-full h-full" />
            </div>
            <span className="font-medium text-gray-100 group-hover:text-blue-400 transition-colors">
              {homeTeam.name}
            </span>
          </div>
          <span className="font-semibold text-xl text-gray-100">
            {homeTeam.score ?? '-'}
          </span>
        </div>
        
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-800 p-1">
              <img src={awayTeam.logo} alt={awayTeam.name} className="w-full h-full" />
            </div>
            <span className="font-medium text-gray-100 group-hover:text-blue-400 transition-colors">
              {awayTeam.name}
            </span>
          </div>
          <span className="font-semibold text-xl text-gray-100">
            {awayTeam.score ?? '-'}
          </span>
        </div>
      </div>

      {isLive && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">{time}&apos;</span>
            <button className="text-blue-400 hover:text-blue-300 text-sm">
              Match Stats →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const SportsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'past'>('all');
  
  const tabs = [
    { id: 'all' as const, label: 'All' },
    { id: 'live' as const, label: 'Live' },
    { id: 'past' as const, label: 'Past' },
  ];

  const liveMatches: Match[] = [
    {
      id: '1',
      status: 'LIVE',
      homeTeam: { name: 'Arsenal', logo: '/api/placeholder/32/32', score: 2 },
      awayTeam: { name: 'Chelsea', logo: '/api/placeholder/32/32', score: 1 },
      time: '67',
      league: 'Premier League',
    },
    {
      id: '2',
      status: 'LIVE',
      homeTeam: { name: 'Barcelona', logo: '/api/placeholder/32/32', score: 0 },
      awayTeam: { name: 'Real Madrid', logo: '/api/placeholder/32/32', score: 0 },
      time: '23',
      league: 'La Liga',
    },
  ];

  const upcomingMatches: Match[] = [
    {
      id: '3',
      status: 'UPCOMING',
      homeTeam: { name: 'Liverpool', logo: '/api/placeholder/32/32' },
      awayTeam: { name: 'Man City', logo: '/api/placeholder/32/32' },
      time: 'Tomorrow, 16:30',
      league: 'Premier League',
    },
    {
      id: '4',
      status: 'UPCOMING',
      homeTeam: { name: 'PSG', logo: '/api/placeholder/32/32' },
      awayTeam: { name: 'Lyon', logo: '/api/placeholder/32/32' },
      time: 'Tomorrow, 20:00',
      league: 'Ligue 1',
    },
  ];

  const pastMatches: Match[] = [
    {
      id: '5',
      status: 'FINISHED',
      homeTeam: { name: 'Juventus', logo: '/api/placeholder/32/32', score: 2 },
      awayTeam: { name: 'Milan', logo: '/api/placeholder/32/32', score: 2 },
      time: 'Yesterday',
      league: 'Serie A',
    },
    {
      id: '6',
      status: 'FINISHED',
      homeTeam: { name: 'Bayern', logo: '/api/placeholder/32/32', score: 3 },
      awayTeam: { name: 'Dortmund', logo: '/api/placeholder/32/32', score: 1 },
      time: 'Yesterday',
      league: 'Bundesliga',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-black rounded-2xl p-6">
          {/* Tabs */}
          <div className="flex gap-1 mb-8 border-b border-gray-950">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-blue-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"></div>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'all' && (
            <div className="space-y-8">
              <ScrollableSection title="Live Now">
                {liveMatches.map((match) => (
                  <MatchCard key={match.id} {...match} />
                ))}
              </ScrollableSection>

              <ScrollableSection title="Upcoming Matches">
                {upcomingMatches.map((match) => (
                  <MatchCard key={match.id} {...match} />
                ))}
              </ScrollableSection>

              <ScrollableSection title="Recent Results">
                {pastMatches.map((match) => (
                  <MatchCard key={match.id} {...match} />
                ))}
              </ScrollableSection>
            </div>
          )}

          {activeTab === 'live' && (
            <ScrollableSection title="Live Matches">
              {liveMatches.map((match) => (
                <MatchCard key={match.id} {...match} />
              ))}
            </ScrollableSection>
          )}

          {activeTab === 'past' && (
            <ScrollableSection title="Past Matches">
              {pastMatches.map((match) => (
                <MatchCard key={match.id} {...match} />
              ))}
            </ScrollableSection>
          )}
        </div>
      </div>
    </div>
  );
};

export default SportsDashboard;