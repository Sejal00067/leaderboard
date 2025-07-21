import { useState, useEffect } from "react";
import { LeaderboardHeader } from "@/components/LeaderboardHeader";
import { TopThreePodium } from "@/components/TopThreePodium";
import { LeaderboardList } from "@/components/LeaderboardList";
import { UserControls } from "@/components/UserControls";
import { toast } from "@/hooks/use-toast";

// Import profile pictures
import avatarSwetambari from "@/assets/avatar-swetambari.jpg";
import avatarShyla from "@/assets/avatar-shyla.jpg";
import avatarGlobalKing from "@/assets/avatar-globalking.jpg";
import avatarAshok from "@/assets/avatar-ashok.jpg";
import avatarAbhishek from "@/assets/avatar-abhishek.jpg";
import avatarTeqir from "@/assets/avatar-teqir.jpg";
import avatarDivine from "@/assets/avatar-divine.jpg";
import avatarShreeKrishna from "@/assets/avatar-shreekrishna.jpg";
import avatarRahul from "@/assets/avatar-rahul.jpg";
import avatarKamal from "@/assets/avatar-kamal.jpg";

interface User {
  id: string;
  name: string;
  points: number;
  avatar?: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("live");
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Swetambari", points: 10229695, avatar: avatarSwetambari },
    { id: "2", name: "Shyla", points: 10005725, avatar: avatarShyla },
    { id: "3", name: "GLOBAL KING", points: 9444665, avatar: avatarGlobalKing },
    { id: "4", name: "Ashok", points: 8040750, avatar: avatarAshok },
    { id: "5", name: "Abhishek", points: 8024750, avatar: avatarAbhishek },
    { id: "6", name: "teqir", points: 8006380, avatar: avatarTeqir },
    { id: "7", name: "Divine", points: 8006100, avatar: avatarDivine },
    { id: "8", name: "Shree Krishna", points: 8005795, avatar: avatarShreeKrishna },
    { id: "9", name: "Rahul", points: 7500000, avatar: avatarRahul },
    { id: "10", name: "Kamal", points: 7200000, avatar: avatarKamal },
  ]);

  // Sort users by points in descending order
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  const selectedUser = users.find(user => user.id === selectedUserId);

  const handleClaimPoints = (userId: string) => {
    const randomPoints = Math.floor(Math.random() * 10) + 1;
    
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, points: user.points + randomPoints }
          : user
      )
    );

    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: "Points Claimed! 🎉",
        description: `${user.name} earned ${randomPoints} points!`,
      });
    }
  };

  const handleAddUser = (name: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      name,
      points: 0,
    };
    
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  // Auto-select first user if none selected
  useEffect(() => {
    if (!selectedUserId && sortedUsers.length > 0) {
      setSelectedUserId(sortedUsers[0].id);
    }
  }, [selectedUserId, sortedUsers]);

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="max-w-md mx-auto bg-white shadow-xl">
        <LeaderboardHeader 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <TopThreePodium users={sortedUsers} />
        
        <LeaderboardList 
          users={sortedUsers}
          selectedUserId={selectedUserId}
          onUserSelect={setSelectedUserId}
        />
        
        <UserControls
          selectedUser={selectedUser}
          onClaimPoints={handleClaimPoints}
          onAddUser={handleAddUser}
        />
      </div>
    </div>
  );
};

export default Index;
