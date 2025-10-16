import { useState } from "react";
import { Program, web3 } from "@coral-xyz/anchor";
import { getProvider } from "../utils/getProvider";
import { PROGRAM_ID, IDL } from "../anchor/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export const DeleteReview = () => {
  const [restaurantPubkey, setRestaurantPubkey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteReview = async () => {
    try {
      setIsLoading(true);
      const provider = getProvider();
      const program = new Program(IDL, provider);

      const restaurantKey = new web3.PublicKey(restaurantPubkey);

      const [reviewPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("review"), restaurantKey.toBuffer(), provider.wallet.publicKey.toBuffer()],
        PROGRAM_ID
      );

      const [reputationPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("reputation"), provider.wallet.publicKey.toBuffer()],
        PROGRAM_ID
      );

      await program.methods
        .deleteReview()
        .accounts({
          restaurant: restaurantKey,
          review: reviewPda,
          reputation: reputationPda,
          reviewer: provider.wallet.publicKey,
        })
        .rpc();

      toast.success("Review deleted successfully!");
      setRestaurantPubkey("");
    } catch (error: any) {
      toast.error(`Failed to delete: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Trash2 className="w-6 h-6" />
          Delete Review
        </CardTitle>
        <CardDescription>Permanently remove your review</CardDescription>
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
        <Button
          onClick={handleDeleteReview}
          disabled={isLoading || !restaurantPubkey}
          className="w-full bg-destructive hover:bg-destructive/90"
        >
          {isLoading ? "Deleting..." : "Delete Review"}
        </Button>
      </CardContent>
    </Card>
  );
};
