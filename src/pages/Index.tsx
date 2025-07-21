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
  const [liveUsers, setLiveUsers] = useState<User[]>([
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

  const [hourlyUsers] = useState<User[]>([
    { id: "3", name: "GLOBAL KING", points: 15420, avatar: avatarGlobalKing },
    { id: "1", name: "Swetambari", points: 12850, avatar: avatarSwetambari },
    { id: "7", name: "Divine", points: 11200, avatar: avatarDivine },
    { id: "5", name: "Abhishek", points: 9750, avatar: avatarAbhishek },
    { id: "2", name: "Shyla", points: 8940, avatar: avatarShyla },
    { id: "8", name: "Shree Krishna", points: 7650, avatar: avatarShreeKrishna },
    { id: "6", name: "teqir", points: 6820, avatar: avatarTeqir },
    { id: "4", name: "Ashok", points: 5490, avatar: avatarAshok },
    { id: "9", name: "Rahul", points: 4320, avatar: avatarRahul },
    { id: "10", name: "Kamal", points: 3210, avatar: avatarKamal },
  ]);

  const [familyUsers] = useState<User[]>([
    { id: "5", name: "Abhishek", points: 18550000, avatar: avatarAbhishek },
    { id: "8", name: "Shree Krishna", points: 16780000, avatar: avatarShreeKrishna },
    { id: "1", name: "Swetambari", points: 15420000, avatar: avatarSwetambari },
    { id: "9", name: "Rahul", points: 14200000, avatar: avatarRahul },
    { id: "3", name: "GLOBAL KING", points: 12850000, avatar: avatarGlobalKing },
    { id: "7", name: "Divine", points: 11990000, avatar: avatarDivine },
    { id: "2", name: "Shyla", points: 10750000, avatar: avatarShyla },
    { id: "10", name: "Kamal", points: 9640000, avatar: avatarKamal },
    { id: "6", name: "teqir", points: 8320000, avatar: avatarTeqir },
    { id: "4", name: "Ashok", points: 7150000, avatar: avatarAshok },
  ]);

  const [wealthUsers] = useState<User[]>([
    { id: "2", name: "Shyla", points: 25840000, avatar: avatarShyla },
    { id: "7", name: "Divine", points: 23650000, avatar: avatarDivine },
    { id: "1", name: "Swetambari", points: 22100000, avatar: avatarSwetambari },
    { id: "6", name: "teqir", points: 19750000, avatar: avatarTeqir },
    { id: "10", name: "Kamal", points: 18320000, avatar: avatarKamal },
    { id: "3", name: "GLOBAL KING", points: 16890000, avatar: avatarGlobalKing },
    { id: "4", name: "Ashok", points: 15640000, avatar: avatarAshok },
    { id: "8", name: "Shree Krishna", points: 14200000, avatar: avatarShreeKrishna },
    { id: "5", name: "Abhishek", points: 12850000, avatar: avatarAbhishek },
    { id: "9", name: "Rahul", points: 11420000, avatar: avatarRahul },
  ]);

  // Get current users based on active tab
  const getCurrentUsers = () => {
    switch (activeTab) {
      case "hourly": return hourlyUsers;
      case "family": return familyUsers;
      case "wealth": return wealthUsers;
      default: return liveUsers;
    }
  };

  const users = getCurrentUsers();

  // Sort users by points in descending order
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  const selectedUser = users.find(user => user.id === selectedUserId);

  const handleClaimPoints = (userId: string) => {
    // Only allow claiming points in live ranking
    if (activeTab !== "live") {
      toast({
        title: "Points can only be claimed in Live Ranking",
        description: "Switch to Live Ranking tab to claim points.",
      });
      return;
    }

    const randomPoints = Math.floor(Math.random() * 10) + 1;
    
    setLiveUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, points: user.points + randomPoints }
          : user
      )
    );

    const user = liveUsers.find(u => u.id === userId);
    if (user) {
      toast({
        title: "Points Claimed! 🎉",
        description: `${user.name} earned ${randomPoints} points!`,
      });
    }
  };

  const handleAddUser = (name: string) => {
    // Only allow adding users in live ranking
    if (activeTab !== "live") {
      toast({
        title: "Users can only be added in Live Ranking",
        description: "Switch to Live Ranking tab to add users.",
      });
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      points: 0,
    };
    
    setLiveUsers(prevUsers => [...prevUsers, newUser]);
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
