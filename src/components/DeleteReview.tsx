import { useState } from "react";
import { Program, web3 } from "@coral-xyz/anchor";
import { getProvider } from "../utils/getProvider";
import { PROGRAM_ID, IDL } from "../anchor/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { toast } from "sonner";
import { Trash2, Info } from "lucide-react";
import { RestaurantDropdown } from "./RestaurantDropdown";

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
        <CardDescription>
          Permanently remove your review. Note: Only the wallet that created the review can delete it.
        </CardDescription>
      </CardHeader>
      <Alert className="mb-4">
        <Info className="h-4 w-4" />
        <AlertDescription>
          Only the wallet address that originally submitted this review can delete it. 
          If you didn't create the review, the transaction will fail.
        </AlertDescription>
      </Alert>
      <CardContent className="space-y-4">
        <RestaurantDropdown
          value={restaurantPubkey}
          onValueChange={setRestaurantPubkey}
          placeholder="Select restaurant to delete review from..."
          label="Restaurant"
        />
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
