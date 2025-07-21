import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  points: number;
  avatar?: string;
}

interface LeaderboardListProps {
  users: User[];
  selectedUserId?: string;
  onUserSelect?: (userId: string) => void;
}

export const LeaderboardList = ({ users, selectedUserId, onUserSelect }: LeaderboardListProps) => {
  const getRankIcon = (rank: number) => {
    if (rank <= 3) {
      return (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
          rank === 1 ? 'bg-medal-gold' : rank === 2 ? 'bg-medal-silver' : 'bg-medal-bronze'
        }`}>
          {rank}
        </div>
      );
    }
    return (
      <div className="w-8 h-8 flex items-center justify-center">
        <span className="text-lg font-bold text-muted-foreground">{rank}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-t-3xl p-4 min-h-[400px] shadow-card">
      <div className="space-y-3">
        {users.map((user, index) => {
          const rank = index + 1;
          const isSelected = selectedUserId === user.id;
          
          return (
            <div
              key={user.id}
              onClick={() => onUserSelect?.(user.id)}
              className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-gold/10 border-2 border-gold shadow-gold' 
                  : 'bg-muted/30 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                {getRankIcon(rank)}
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-gold text-white font-bold">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-foreground">{user.name}</h4>
                  {rank <= 3 && (
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="w-3 h-3 bg-gradient-gold rounded-full"></div>
                      <span className="text-xs text-muted-foreground">Top Performer</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-gradient-gold rounded-full"></div>
                  <span className="font-bold text-lg">{user.points.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Last place indicator */}
        {users.length > 0 && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/20">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <span className="text-sm font-bold text-muted-foreground">999+</span>
              </div>
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-muted text-muted-foreground">
                  D
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-muted-foreground">Devil</h4>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-muted rounded-full"></div>
                <span className="font-bold text-lg text-muted-foreground">0</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};