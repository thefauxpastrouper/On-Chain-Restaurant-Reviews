import React, { useEffect, useState } from "react";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import type { RestaurantReviews } from "../types/restaurant_reviews";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Star, Copy, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";

type RestaurantData = {
  pubkey: anchor.web3.PublicKey;
  owner: anchor.web3.PublicKey;
  name: string;
  category: string;
  metadataCid: string;
  ratingSum: number;
  reviewCount: number;
};

type ReviewData = {
  pubkey: anchor.web3.PublicKey;
  reviewer: anchor.web3.PublicKey;
  rating: number;
  reviewCid: string;
  createdAt: number;
  updatedAt: number;
};

type Props = {
  program: Program<RestaurantReviews>;
  refreshTrigger?: number; // Add refresh trigger prop
};

export const ViewRestaurants: React.FC<Props> = ({ program, refreshTrigger }) => {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [copiedKeys, setCopiedKeys] = useState<Record<string, boolean>>({});
  const [reviews, setReviews] = useState<Record<string, ReviewData[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState<Record<string, boolean>>({});

  const fetchRestaurants = async () => {
    try {
      setIsLoading(true);
      const allRests = (await (program.account as any).restaurant.all()) as any[];
      const parsed = allRests.map((r) => ({
        pubkey: r.publicKey,
        owner: r.account.owner,
        name: r.account.name,
        category: r.account.category,
        metadataCid: r.account.metadataCid,
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [program]);

  // Trigger refresh when refreshTrigger changes
  useEffect(() => {
    if (refreshTrigger && refreshTrigger > 0) {
      fetchRestaurants();
      // Clear existing reviews to force fresh fetch
      setReviews({});
      setExpanded({});
    }
  }, [refreshTrigger]);

  const fetchReviews = async (restaurantPubkey: anchor.web3.PublicKey) => {
    const restKey = restaurantPubkey.toBase58();
    try {
      setLoadingReviews((prev) => ({ ...prev, [restKey]: true }));
      const allReviews = (await (program.account as any).review.all([
        {
          memcmp: {
            offset: 40,
            bytes: restaurantPubkey.toBase58(),
          },
        },
      ])) as any[];

      const parsed: ReviewData[] = allReviews.map((r) => ({
        pubkey: r.publicKey,
        reviewer: r.account.reviewer,
        rating: r.account.rating,
        reviewCid: r.account.reviewCid,
        createdAt: r.account.createdAt.toNumber
          ? r.account.createdAt.toNumber()
          : r.account.createdAt,
        updatedAt: r.account.updatedAt.toNumber
          ? r.account.updatedAt.toNumber()
          : r.account.updatedAt,
      }));

      setReviews((prev) => ({ ...prev, [restKey]: parsed }));
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoadingReviews((prev) => ({ ...prev, [restKey]: false }));
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeys((prev) => ({ ...prev, [key]: true }));
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedKeys((prev) => ({ ...prev, [key]: false })), 1500);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(rating)
                ? "fill-accent text-accent"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  if (restaurants.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px] md:min-h-[400px]">
        <Card className="border-border bg-card p-6 md:p-8 mx-4">
          <CardContent className="text-center space-y-3 md:space-y-4 p-0">
            <h3 className="text-xl md:text-2xl font-bold">No Restaurants Yet</h3>
            <p className="text-sm md:text-base text-muted-foreground">Be the first to register a restaurant!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="space-y-3 md:space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-1 md:space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-primary bg-clip-text text-transparent">
              Browse Restaurants
            </h1>
            <p className="text-muted-foreground text-sm md:text-lg">
              Discover and review restaurants on the blockchain
            </p>
          </div>
          <Button
            variant="outline"
            onClick={fetchRestaurants}
            disabled={isLoading}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="sm:inline">{isLoading ? 'Refreshing...' : 'Refresh'}</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6">
        {restaurants.map((rest) => {
          const restKey = rest.pubkey.toBase58();
          const isExpanded = expanded[restKey];
          const restReviews = reviews[restKey] || [];
          const avgRating = rest.reviewCount > 0 ? rest.ratingSum / rest.reviewCount : 0;
          const isReviewsLoading = loadingReviews[restKey] || false;

          return (
            <Card key={restKey} className="border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
              <CardHeader className="border-b border-border p-4 md:p-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl gradient-accent flex items-center justify-center text-white font-bold text-xl md:text-2xl glow-accent flex-shrink-0">
                    {rest.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 space-y-1 md:space-y-2 min-w-0">
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl break-words">{rest.name}</CardTitle>
                    <p className="text-sm md:text-base text-muted-foreground">$ • {rest.category}</p>
                    <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-3">
                      {renderStars(avgRating)}
                      <span className="text-xs md:text-sm text-muted-foreground">
                        {avgRating.toFixed(1)} ({rest.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 md:space-y-4 p-4 md:pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={`https://placehold.co/400x300/3b3b4f/fff?text=${encodeURIComponent(rest.name)}`}
                      alt={rest.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={`https://placehold.co/400x300/2d2d3a/fff?text=${encodeURIComponent(rest.category)}`}
                      alt={rest.category}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-muted-foreground sm:w-32 font-medium">Restaurant:</span>
                    <button
                      onClick={() => copyToClipboard(rest.pubkey.toBase58(), "restaurant-" + restKey)}
                      className="flex items-center gap-2 text-primary hover:text-primary/80 font-mono text-[10px] md:text-xs flex-1 truncate min-w-0 text-left"
                    >
                      <span className="truncate">{rest.pubkey.toBase58()}</span>
                      {copiedKeys["restaurant-" + restKey] ? (
                        <Check className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      ) : (
                        <Copy className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      )}
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-muted-foreground sm:w-32 font-medium">Owner:</span>
                    <button
                      onClick={() => copyToClipboard(rest.owner.toBase58(), "owner-" + restKey)}
                      className="flex items-center gap-2 text-primary hover:text-primary/80 font-mono text-[10px] md:text-xs flex-1 truncate min-w-0 text-left"
                    >
                      <span className="truncate">{rest.owner.toBase58()}</span>
                      {copiedKeys["owner-" + restKey] ? (
                        <Check className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      ) : (
                        <Copy className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isReviewsLoading}
                  onClick={() => {
                    const newExpanded = !isExpanded;
                    setExpanded((prev) => ({ ...prev, [restKey]: newExpanded }));
                    if (newExpanded) {
                      // Always refetch reviews when expanding to ensure fresh data
                      fetchReviews(rest.pubkey);
                    }
                  }}
                >
                  {isReviewsLoading ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Loading Reviews...
                    </div>
                  ) : (
                    isExpanded ? "Hide Reviews" : `Show Reviews (${rest.reviewCount})`
                  )}
                </Button>

                {isExpanded && (
                  <div className="space-y-2 md:space-y-3 pt-3 md:pt-4 border-t border-border">
                    {restReviews.length > 0 ? (
                      restReviews.map((rev) => (
                        <Card key={rev.pubkey.toBase58()} className="bg-background border-border">
                          <CardContent className="p-3 md:p-4 space-y-2 md:space-y-3">
                            <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                  {rev.reviewer.toBase58().slice(0, 2).toUpperCase()}
                                </div>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      rev.reviewer.toBase58(),
                                      "reviewer-" + rev.pubkey.toBase58()
                                    )
                                  }
                                  className="text-primary hover:text-primary/80 font-mono text-[10px] md:text-xs truncate"
                                >
                                  {rev.reviewer.toBase58().slice(0, 12)}...
                                </button>
                              </div>
                              <div className="flex-shrink-0">
                                {renderStars(rev.rating)}
                              </div>
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground break-words">
                              {rev.reviewCid}
                            </p>
                            <div className="flex flex-col xs:flex-row gap-2 xs:gap-4 text-[10px] md:text-xs text-muted-foreground">
                              <span>Created: {new Date(rev.createdAt * 1000).toLocaleDateString()}</span>
                              <span>Updated: {new Date(rev.updatedAt * 1000).toLocaleDateString()}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <p className="text-center text-sm md:text-base text-muted-foreground py-3 md:py-4">No reviews yet</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
