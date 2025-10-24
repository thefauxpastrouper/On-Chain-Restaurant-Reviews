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
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="border-border bg-card p-8">
          <CardContent className="text-center space-y-4">
            <h3 className="text-2xl font-bold">No Restaurants Yet</h3>
            <p className="text-muted-foreground">Be the first to register a restaurant!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-lg blur-xl"></div>
            <div className="relative z-10">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Browse Restaurants
              </h1>
              <p className="text-muted-foreground text-lg">
                Discover and review restaurants on the blockchain
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={fetchRestaurants}
            disabled={isLoading}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200 hover:border-blue-300 transition-all duration-300"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {restaurants.map((rest) => {
          const restKey = rest.pubkey.toBase58();
          const isExpanded = expanded[restKey];
          const restReviews = reviews[restKey] || [];
          const avgRating = rest.reviewCount > 0 ? rest.ratingSum / rest.reviewCount : 0;
          const isReviewsLoading = loadingReviews[restKey] || false;

          return (
            <Card key={restKey} className="border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
              <CardHeader className="border-b border-border relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/30 to-pink-50/30 opacity-50"></div>
                <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-yellow-300 via-pink-400 to-purple-500 opacity-70"></div>
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <span className="text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300 leading-none">
                        {rest.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <CardTitle className="text-3xl">{rest.name}</CardTitle>
                    <p className="text-muted-foreground">$ • {rest.category}</p>
                    <div className="flex items-center gap-3">
                      {renderStars(avgRating)}
                      <span className="text-sm text-muted-foreground">
                        {avgRating.toFixed(1)} ({rest.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-600 opacity-90"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-yellow-300 via-orange-400 to-red-500 opacity-70"></div>
                    <div className="relative z-10 flex items-center justify-center h-full">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">🍽️</div>
                        <div className="text-lg font-bold drop-shadow-lg">{rest.name}</div>
                        <div className="text-sm opacity-90">Restaurant</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>
                  <div className="relative aspect-video rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 opacity-90"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-teal-300 via-green-400 to-blue-500 opacity-70"></div>
                    <div className="relative z-10 flex items-center justify-center h-full">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">🏷️</div>
                        <div className="text-lg font-bold drop-shadow-lg">{rest.category}</div>
                        <div className="text-sm opacity-90">Category</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-32">Restaurant:</span>
                    <button
                      onClick={() => copyToClipboard(rest.pubkey.toBase58(), "restaurant-" + restKey)}
                      className="flex items-center gap-2 text-primary hover:text-primary/80 font-mono text-xs flex-1 truncate"
                    >
                      {rest.pubkey.toBase58()}
                      {copiedKeys["restaurant-" + restKey] ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-32">Owner:</span>
                    <button
                      onClick={() => copyToClipboard(rest.owner.toBase58(), "owner-" + restKey)}
                      className="flex items-center gap-2 text-primary hover:text-primary/80 font-mono text-xs flex-1 truncate"
                    >
                      {rest.owner.toBase58()}
                      {copiedKeys["owner-" + restKey] ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-gradient-to-r from-emerald-50 to-cyan-50 hover:from-emerald-100 hover:to-cyan-100 border-emerald-200 hover:border-emerald-300 transition-all duration-300"
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
                  <div className="space-y-3 pt-4 border-t border-border">
                    {restReviews.length > 0 ? (
                      restReviews.map((rev) => (
                        <Card key={rev.pubkey.toBase58()} className="bg-background border-border">
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full relative overflow-hidden group">
                                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-600"></div>
                                  <div className="absolute inset-0 bg-gradient-to-tl from-green-300 via-emerald-400 to-cyan-500 opacity-70"></div>
                                  <div className="relative z-10 flex items-center justify-center text-white text-xs font-bold drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    {rev.reviewer.toBase58().slice(0, 2).toUpperCase()}
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      rev.reviewer.toBase58(),
                                      "reviewer-" + rev.pubkey.toBase58()
                                    )
                                  }
                                  className="text-primary hover:text-primary/80 font-mono text-xs"
                                >
                                  {rev.reviewer.toBase58().slice(0, 12)}...
                                </button>
                              </div>
                              {renderStars(rev.rating)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {rev.reviewCid}
                            </p>
                            <div className="flex gap-4 text-xs text-muted-foreground">
                              <span>Created: {new Date(rev.createdAt * 1000).toLocaleDateString()}</span>
                              <span>Updated: {new Date(rev.updatedAt * 1000).toLocaleDateString()}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-4">No reviews yet</p>
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
