import { useState } from "react";
import { Program, web3 } from "@coral-xyz/anchor";
import { getProvider } from "../utils/getProvider";
import { IDL } from "../anchor/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { toast } from "sonner";
import { RestaurantDropdown } from "./RestaurantDropdown";
import { Info } from "lucide-react";

export const UpdateRestaurant = () => {
  const [restaurantPubkey, setRestaurantPubkey] = useState("");
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const provider = getProvider();
      const program = new Program(IDL, provider);

      const restaurantKey = new web3.PublicKey(restaurantPubkey);

      await program.methods
        .updateRestaurant(newName, newDescription, "new_metadata_cid_placeholder")
        .accounts({
          restaurant: restaurantKey,
          owner: provider.wallet.publicKey,
        })
        .rpc();

      toast.success("Restaurant updated successfully!");
      setRestaurantPubkey("");
      setNewName("");
      setNewDescription("");
    } catch (error: any) {
      toast.error(`Failed to update: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-xl md:text-2xl">Update Restaurant</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Modify your restaurant information. Note: Only the wallet that created the restaurant can update its details.
        </CardDescription>
      </CardHeader>
      <Alert className="mb-3 md:mb-4 mx-4 md:mx-6">
        <Info className="h-4 w-4" />
        <AlertDescription className="text-xs md:text-sm">
          Only the wallet address that originally registered this restaurant can update its details. 
          If you didn't create the restaurant, the transaction will fail.
        </AlertDescription>
      </Alert>
      <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6">
        <RestaurantDropdown
          value={restaurantPubkey}
          onValueChange={setRestaurantPubkey}
          placeholder="Select restaurant to update..."
          label="Restaurant"
        />
        <div className="space-y-2">
          <Label htmlFor="name">New Name</Label>
          <Input
            id="name"
            placeholder="Enter new name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="bg-background border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">New Description</Label>
          <Textarea
            id="description"
            placeholder="Enter new description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="bg-background border-border min-h-[100px]"
          />
        </div>
        <Button
          onClick={handleUpdate}
          disabled={isLoading || !restaurantPubkey}
          className="w-full bg-yellow-600 hover:bg-yellow-700"
        >
          {isLoading ? "Updating..." : "Update Restaurant"}
        </Button>
      </CardContent>
    </Card>
  );
};
