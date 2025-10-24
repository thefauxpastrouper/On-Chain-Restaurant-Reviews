import React, { useState, useEffect } from "react";
import { Program } from "@coral-xyz/anchor";
import { web3 } from "@coral-xyz/anchor";
import { IDL } from "../anchor/constants";
import { getProvider } from "../utils/getProvider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown, Building2 } from "lucide-react";
import { cn } from "../lib/utils";

type RestaurantData = {
  pubkey: web3.PublicKey;
  name: string;
  category: string;
  ratingSum: number;
  reviewCount: number;
};

interface RestaurantDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export const RestaurantDropdown: React.FC<RestaurantDropdownProps> = ({
  value,
  onValueChange,
  placeholder = "Select restaurant...",
  label = "Restaurant",
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const provider = getProvider();
        const program = new Program(IDL, provider);
        
        const allRests = (await (program.account as any).restaurant.all()) as any[];
        const parsed = allRests.map((r) => ({
          pubkey: r.publicKey,
          name: r.account.name,
          category: r.account.category,
          ratingSum: r.account.ratingSum.toNumber
            ? r.account.ratingSum.toNumber()
            : r.account.ratingSum,
          reviewCount: r.account.reviewCount.toNumber
            ? r.account.reviewCount.toNumber()
            : r.account.reviewCount,
        }));
        
        // Sort restaurants alphabetically by name
        const sortedRestaurants = parsed.sort((a, b) => 
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
        
        setRestaurants(sortedRestaurants);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const selectedRestaurant = restaurants.find(
    (restaurant) => restaurant.pubkey.toBase58() === value
  );

  const handleSelect = (restaurantPubkey: string) => {
    onValueChange(restaurantPubkey);
    setOpen(false);
  };

  const handleInputChange = (inputValue: string) => {
    onValueChange(inputValue);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor="restaurant">{label}</Label>
      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="flex-1 justify-between bg-background border-border text-sm md:text-base h-auto min-h-[44px] py-2"
            >
              {selectedRestaurant ? (
                <div className="flex items-center gap-1.5 md:gap-2 truncate min-w-0">
                  <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                  <span className="truncate text-foreground font-medium text-xs md:text-sm">{selectedRestaurant.name}</span>
                  <span className="hidden sm:inline text-xs text-muted-foreground">
                    ({selectedRestaurant.pubkey.toBase58().slice(0, 8)}...)
                  </span>
                </div>
              ) : (
                <span className="text-muted-foreground text-xs md:text-sm">{placeholder}</span>
              )}
              <ChevronsUpDown className="ml-1.5 md:ml-2 h-3.5 w-3.5 md:h-4 md:w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[calc(100vw-2rem)] sm:w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Search restaurants..." className="text-sm" />
              <CommandList className="max-h-[300px]">
                <CommandEmpty>
                  {loading ? "Loading restaurants..." : "No restaurants found."}
                </CommandEmpty>
                <CommandGroup>
                  {restaurants.map((restaurant) => {
                    const avgRating = restaurant.reviewCount > 0 
                      ? restaurant.ratingSum / restaurant.reviewCount 
                      : 0;
                    const pubkey = restaurant.pubkey.toBase58();
                    
                    return (
                      <CommandItem
                        key={pubkey}
                        value={`${restaurant.name} ${pubkey}`}
                        onSelect={() => handleSelect(pubkey)}
                        className="flex items-center justify-between p-2 md:p-3 hover:bg-accent/10 focus:bg-accent/10"
                      >
                        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                          <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate text-foreground text-sm md:text-base">{restaurant.name}</div>
                            <div className="text-[10px] md:text-xs text-muted-foreground truncate">
                              {restaurant.category} • {avgRating.toFixed(1)}⭐ ({restaurant.reviewCount})
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2 ml-1 md:ml-2">
                          <div className="hidden sm:block text-[10px] md:text-xs font-mono text-muted-foreground">
                            {pubkey.slice(0, 8)}...{pubkey.slice(-4)}
                          </div>
                          <Check
                            className={cn(
                              "h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0",
                              value === pubkey ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Manual input field for direct public key entry */}
      <div className="space-y-1">
        <Label htmlFor="manual-input" className="text-[10px] md:text-xs text-muted-foreground">
          Or enter public key manually:
        </Label>
        <Input
          id="manual-input"
          placeholder="Enter restaurant public key"
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          className="bg-background border-border font-mono text-xs md:text-sm"
        />
      </div>
    </div>
  );
};
