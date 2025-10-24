import { useState } from "react";
import { Program, web3 } from "@coral-xyz/anchor";
import { getProvider } from "../utils/getProvider";
import { PROGRAM_ID, IDL } from "../anchor/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { RestaurantDropdown } from "./RestaurantDropdown";

export const UpdateReview = () => {
  const [restaurantPubkey, setRestaurantPubkey] = useState("");
  const [newRating, setNewRating] = useState<number>(5);
  const [newReviewCid, setNewReviewCid] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateReview = async () => {
    try {
      setIsLoading(true);
      const provider = getProvider();
      const program = new Program(IDL, provider);

      const restaurantKey = new web3.PublicKey(restaurantPubkey);

      const [reviewPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("review"), restaurantKey.toBuffer(), provider.wallet.publicKey.toBuffer()],
        PROGRAM_ID
      );

      await program.methods
        .updateReview(newRating, newReviewCid || "updated_review_cid_placeholder")
        .accounts({
          restaurant: restaurantKey,
          review: reviewPda,
          reviewer: provider.wallet.publicKey,
        })
        .rpc();

      toast.success("Review updated successfully!");
      setRestaurantPubkey("");
      setNewRating(5);
      setNewReviewCid("");
    } catch (error: any) {
      toast.error(`Failed to update: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-xl md:text-2xl">Update Review</CardTitle>
        <CardDescription className="text-sm md:text-base">Modify your existing review</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6">
        <RestaurantDropdown
          value={restaurantPubkey}
          onValueChange={setRestaurantPubkey}
          placeholder="Select restaurant to update review for..."
          label="Restaurant"
        />
        <div className="space-y-2">
          <Label>New Rating</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setNewRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= newRating ? "fill-accent text-accent" : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="review">New Review Text</Label>
          <Textarea
            id="review"
            placeholder="Write your updated review"
            value={newReviewCid}
            onChange={(e) => setNewReviewCid(e.target.value)}
            className="bg-background border-border min-h-[120px]"
          />
        </div>
        <Button
          onClick={handleUpdateReview}
          disabled={isLoading || !restaurantPubkey}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {isLoading ? "Updating..." : "Update Review"}
        </Button>
      </CardContent>
    </Card>
  );
};
