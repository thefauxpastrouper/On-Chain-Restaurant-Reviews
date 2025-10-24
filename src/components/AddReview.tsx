import { useState } from "react";
import { Program, web3 } from "@coral-xyz/anchor";
import { getProvider } from "../utils/getProvider";
import { PROGRAM_ID, IDL } from "../anchor/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { toast } from "sonner";
import { Star, Info } from "lucide-react";
import { RestaurantDropdown } from "./RestaurantDropdown";

export const AddReview = () => {
  const [restaurantPubkey, setRestaurantPubkey] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [reviewCid, setReviewCid] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddReview = async () => {
    try {
      setIsLoading(true);
      const provider = getProvider();
      const program = new Program(IDL, provider);

      const [reviewPda] = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("review"),
          new web3.PublicKey(restaurantPubkey).toBuffer(),
          provider.wallet.publicKey.toBuffer(),
        ],
        PROGRAM_ID
      );

      await program.methods
        .addReview(rating, reviewCid || "review_cid_placeholder")
        .accounts({
          review: reviewPda,
          restaurant: new web3.PublicKey(restaurantPubkey),
          reviewer: provider.wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      toast.success("Review added successfully!");
      setRestaurantPubkey("");
      setRating(5);
      setReviewCid("");
    } catch (error: any) {
      toast.error(`Failed to add review: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-xl md:text-2xl">Add Review</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Share your experience. Note: You can only submit one review per restaurant.
        </CardDescription>
      </CardHeader>
      <Alert className="mb-3 md:mb-4 mx-4 md:mx-6">
        <Info className="h-4 w-4" />
        <AlertDescription className="text-xs md:text-sm">
          Each wallet address can only submit one review per restaurant. 
          If you've already reviewed this restaurant, you'll need to update your existing review instead.
        </AlertDescription>
      </Alert>
      <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6">
        <RestaurantDropdown
          value={restaurantPubkey}
          onValueChange={setRestaurantPubkey}
          placeholder="Select restaurant to review..."
          label="Restaurant"
        />
        <div className="space-y-2">
          <Label>Rating</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating ? "fill-accent text-accent" : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="review">Review</Label>
          <Textarea
            id="review"
            placeholder="Write your review"
            value={reviewCid}
            onChange={(e) => setReviewCid(e.target.value)}
            className="bg-background border-border min-h-[120px]"
          />
        </div>
        <Button
          onClick={handleAddReview}
          disabled={isLoading || !restaurantPubkey}
          className="w-full gradient-accent hover:opacity-90"
        >
          {isLoading ? "Adding..." : "Add Review"}
        </Button>
      </CardContent>
    </Card>
  );
};
