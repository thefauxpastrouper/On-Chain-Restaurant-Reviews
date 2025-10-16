import { useState } from "react";
import { Program, web3 } from "@coral-xyz/anchor";
import { getProvider } from "../utils/getProvider";
import { IDL } from "../anchor/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { toast } from "sonner";

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
      <CardHeader>
        <CardTitle className="text-2xl">Update Restaurant</CardTitle>
        <CardDescription>Modify your restaurant information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="restaurant">Restaurant Public Key</Label>
          <Input
            id="restaurant"
            placeholder="Enter restaurant public key"
            value={restaurantPubkey}
            onChange={(e) => setRestaurantPubkey(e.target.value)}
            className="bg-background border-border font-mono text-sm"
          />
        </div>
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
