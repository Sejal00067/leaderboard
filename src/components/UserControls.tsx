import { useState } from "react";
import { Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  points: number;
  avatar?: string;
}

interface UserControlsProps {
  selectedUser?: User;
  onClaimPoints: (userId: string) => void;
  onAddUser: (name: string) => void;
}

export const UserControls = ({ selectedUser, onClaimPoints, onAddUser }: UserControlsProps) => {
  const [newUserName, setNewUserName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddUser = () => {
    if (newUserName.trim()) {
      onAddUser(newUserName.trim());
      setNewUserName("");
      setIsDialogOpen(false);
      toast({
        title: "User Added!",
        description: `${newUserName} has been added to the leaderboard.`,
      });
    }
  };

  const handleClaimPoints = () => {
    if (selectedUser) {
      onClaimPoints(selectedUser.id);
    }
  };

  return (
    <div className="bg-white p-4 border-t border-muted/20">
      <div className="flex flex-col space-y-3">
        {/* Selected User Display */}
        <div className="bg-gradient-bg rounded-xl p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Selected User</h3>
          {selectedUser ? (
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-lg">{selectedUser.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Current Points: {selectedUser.points.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {selectedUser.name.charAt(0)}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Select a user from the list above</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            onClick={handleClaimPoints}
            disabled={!selectedUser}
            className="flex-1 bg-gradient-gold hover:bg-gold-dark text-white font-bold py-3 shadow-gold"
          >
            <Zap className="w-5 h-5 mr-2" />
            Claim Points
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-gold text-gold hover:bg-gold/10"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Enter user name"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddUser()}
                />
                <div className="flex space-x-2">
                  <Button
                    onClick={handleAddUser}
                    disabled={!newUserName.trim()}
                    className="flex-1 bg-gradient-gold hover:bg-gold-dark text-white"
                  >
                    Add User
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-gold/10 rounded-lg p-3 text-center">
            <div className="w-8 h-8 bg-gradient-gold rounded-full mx-auto mb-1 flex items-center justify-center">
              <span className="text-white text-xs font-bold">★</span>
            </div>
            <p className="text-xs font-medium">Star Tasks</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-3 text-center">
            <div className="w-8 h-8 bg-primary rounded-full mx-auto mb-1 flex items-center justify-center">
              <span className="text-white text-xs font-bold">🏆</span>
            </div>
            <p className="text-xs font-medium">Contribution</p>
          </div>
          <div className="bg-destructive/10 rounded-lg p-3 text-center">
            <div className="w-8 h-8 bg-destructive rounded-full mx-auto mb-1 flex items-center justify-center">
              <span className="text-white text-xs font-bold">🎁</span>
            </div>
            <p className="text-xs font-medium">Rewards</p>
          </div>
        </div>
      </div>
    </div>
  );
};