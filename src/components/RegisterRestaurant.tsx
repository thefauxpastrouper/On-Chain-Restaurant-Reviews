import { useState } from "react";
import { Program, web3 } from "@coral-xyz/anchor";
import { getProvider } from "../utils/getProvider";
import { PROGRAM_ID, IDL } from "../anchor/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { toast } from "sonner";

export const RegisterRestaurant = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setIsLoading(true);
      const provider = getProvider();
      const program = new Program(IDL, provider);

      const [restaurantPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("restaurant"), provider.wallet.publicKey.toBuffer(), Buffer.from(name)],
        PROGRAM_ID
      );

      await program.methods
        .registerRestaurant(name, description, "metadata_cid_placeholder")
        .accounts({
          restaurant: restaurantPda,
          user: provider.wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();

      toast.success("Restaurant registered successfully!");
      setName("");
      setDescription("");
    } catch (error: any) {
      toast.error(`Failed to register: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-2xl">Register Restaurant</CardTitle>
        <CardDescription>Add your restaurant to the blockchain</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Restaurant Name</Label>
          <Input
            id="name"
            placeholder="Enter restaurant name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-background border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your restaurant"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-background border-border min-h-[100px]"
          />
        </div>
        <Button 
          onClick={handleRegister} 
          disabled={isLoading || !name}
          className="w-full gradient-primary hover:opacity-90"
        >
          {isLoading ? "Registering..." : "Register Restaurant"}
        </Button>
      </CardContent>
    </Card>
  );
};
