import { Crown, Award, Medal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  points: number;
  avatar?: string;
}

interface TopThreePodiumProps {
  users: User[];
}

export const TopThreePodium = ({ users }: TopThreePodiumProps) => {
  const topThree = users.slice(0, 3);
  const [first, second, third] = topThree;

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-6 h-6 text-medal-gold" />;
      case 2:
        return <Award className="w-6 h-6 text-medal-silver" />;
      case 3:
        return <Medal className="w-6 h-6 text-medal-bronze" />;
      default:
        return null;
    }
  };

  const getMedalColor = (position: number) => {
    switch (position) {
      case 1:
        return "bg-medal-gold";
      case 2:
        return "bg-medal-silver";
      case 3:
        return "bg-medal-bronze";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="bg-gradient-bg px-4 pb-6">
      <div className="flex items-end justify-center space-x-4">
        {/* Second Place */}
        {second && (
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <Avatar className="w-16 h-16 border-4 border-medal-silver shadow-lg">
                <AvatarImage src={second.avatar} />
                <AvatarFallback className="bg-medal-silver text-white font-bold">
                  {second.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${getMedalColor(2)} flex items-center justify-center shadow-lg`}>
                <span className="text-white text-sm font-bold">2</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-center mb-1">{second.name}</h3>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gradient-gold rounded-full"></div>
              <span className="text-sm font-bold">{second.points.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* First Place */}
        {first && (
          <div className="flex flex-col items-center -mt-4">
            <div className="relative mb-2">
              <Avatar className="w-20 h-20 border-4 border-medal-gold shadow-xl animate-glow">
                <AvatarImage src={first.avatar} />
                <AvatarFallback className="bg-gradient-gold text-white font-bold text-lg">
                  {first.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-full ${getMedalColor(1)} flex items-center justify-center shadow-xl animate-float`}>
                <Crown className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-center mb-2">{first.name}</h3>
            <div className="flex items-center space-x-1">
              <div className="w-5 h-5 bg-gradient-gold rounded-full animate-glow"></div>
              <span className="text-lg font-bold">{first.points.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Third Place */}
        {third && (
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <Avatar className="w-16 h-16 border-4 border-medal-bronze shadow-lg">
                <AvatarImage src={third.avatar} />
                <AvatarFallback className="bg-medal-bronze text-white font-bold">
                  {third.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${getMedalColor(3)} flex items-center justify-center shadow-lg`}>
                <span className="text-white text-sm font-bold">3</span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-center mb-1">{third.name}</h3>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gradient-gold rounded-full"></div>
              <span className="text-sm font-bold">{third.points.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};