import { Clock } from "lucide-react";

interface LeaderboardHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const LeaderboardHeader = ({ activeTab, onTabChange }: LeaderboardHeaderProps) => {
  const tabs = [
    { id: "live", label: "Live Ranking" },
    { id: "hourly", label: "Hourly Ranking" },
    { id: "family", label: "Family Ranking" },
    { id: "wealth", label: "Wealth Ranking" }
  ];

  return (
    <div className="bg-gradient-bg p-4 pb-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-6 mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`text-sm font-medium whitespace-nowrap pb-2 transition-colors ${
              activeTab === tab.id
                ? "text-gold border-b-2 border-gold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Settlement Timer */}
      <div className="bg-gold/20 rounded-lg p-3 flex items-center justify-center space-x-2">
        <Clock className="w-4 h-4 text-gold-dark" />
        <span className="text-sm font-medium text-gold-dark">
          Settlement time 2 days 01:45:41
        </span>
      </div>
    </div>
  );
};