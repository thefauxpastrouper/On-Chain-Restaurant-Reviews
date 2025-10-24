import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  BookOpen, 
  UtensilsCrossed, 
  Star, 
  Edit, 
  Trash2, 
  Settings, 
  Wallet,
  Shield,
  Users,
  Globe,
  Zap,
  CheckCircle,
  Info,
  Code,
  Copy,
  Check
} from "lucide-react";

export const Documentation = () => {
  const features = [
    {
      icon: <UtensilsCrossed className="w-5 h-5" />,
      title: "Restaurant Registration",
      description: "Register your restaurant on the blockchain with name and description",
      category: "Core Features"
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Review System",
      description: "Add, update, and delete reviews with 1-5 star ratings",
      category: "Core Features"
    },
    {
      icon: <Edit className="w-5 h-5" />,
      title: "Review Management",
      description: "Update existing reviews or delete them completely",
      category: "Core Features"
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "Restaurant Updates",
      description: "Modify restaurant information after registration",
      category: "Core Features"
    },
    {
      icon: <Wallet className="w-5 h-5" />,
      title: "Wallet Integration",
      description: "Connect with Solana wallets (Phantom, Solflare, etc.)",
      category: "Blockchain"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "On-Chain Storage",
      description: "All data stored immutably on Solana blockchain",
      category: "Blockchain"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Decentralized Reviews",
      description: "No central authority controls the review system",
      category: "Blockchain"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Transparent System",
      description: "All transactions and data are publicly verifiable",
      category: "Blockchain"
    }
  ];

  const techStack = [
    { name: "React", description: "Frontend framework" },
    { name: "TypeScript", description: "Type-safe JavaScript" },
    { name: "Vite", description: "Build tool and dev server" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework" },
    { name: "shadcn/ui", description: "Component library" },
    { name: "Solana", description: "Blockchain platform" },
    { name: "Anchor", description: "Solana program framework" },
    { name: "React Query", description: "Data fetching and caching" }
  ];

  const categories = [...new Set(features.map(f => f.category))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-display font-bold">RestaurantChain Documentation</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A decentralized restaurant review platform built on Solana blockchain. 
          Discover, review, and manage restaurants with complete transparency and immutability.
        </p>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Start Guide
          </CardTitle>
          <CardDescription>Get started with RestaurantChain in 3 simple steps</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h3 className="font-semibold">Connect Wallet</h3>
                <p className="text-sm text-muted-foreground">Click the wallet button in the top right to connect your Solana wallet</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h3 className="font-semibold">Register Restaurant</h3>
                <p className="text-sm text-muted-foreground">Add your restaurant to the blockchain with name and description</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h3 className="font-semibold">Start Reviewing</h3>
                <p className="text-sm text-muted-foreground">Browse restaurants and add reviews to help the community</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features by Category */}
      {categories.map((category) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {category}
            </CardTitle>
            <CardDescription>Explore the features that make RestaurantChain unique</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {features
                .filter(feature => feature.category === category)
                .map((feature) => (
                  <div key={feature.title} className="flex items-start gap-3 p-4 rounded-lg border hover:bg-accent/5 transition-colors">
                    <div className="text-primary mt-1">{feature.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            How It Works
          </CardTitle>
          <CardDescription>Understanding the RestaurantChain ecosystem</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
              <div>
                <h3 className="font-semibold mb-2">Restaurant Registration</h3>
                <p className="text-muted-foreground">
                  Restaurant owners register their establishment on the Solana blockchain. 
                  Each restaurant gets a unique public key and is stored immutably.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
              <div>
                <h3 className="font-semibold mb-2">Review Submission</h3>
                <p className="text-muted-foreground">
                  Users can submit reviews with ratings (1-5 stars) and comments. 
                  Each review is linked to both the restaurant and the reviewer's wallet.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
              <div>
                <h3 className="font-semibold mb-2">Transparent Aggregation</h3>
                <p className="text-muted-foreground">
                  The system automatically calculates average ratings and review counts. 
                  All data is publicly verifiable on the blockchain.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
              <div>
                <h3 className="font-semibold mb-2">Decentralized Trust</h3>
                <p className="text-muted-foreground">
                  No central authority can manipulate reviews. The blockchain ensures 
                  data integrity and prevents censorship or fake reviews.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Contract */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Smart Contract
          </CardTitle>
          <CardDescription>
            The Solana program that powers RestaurantChain's decentralized functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm flex-shrink-0">📝</div>
              <div>
                <h3 className="font-semibold mb-2">Program Overview</h3>
                <p className="text-muted-foreground">
                  Built with Anchor framework, our smart contract handles restaurant registration, 
                  review management, and reputation tracking with complete transparency and security.
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Key Functions</h4>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="p-3 rounded-lg border bg-green-50">
                  <h5 className="font-medium text-green-800">register_restaurant</h5>
                  <p className="text-sm text-green-700">Create new restaurant entries on-chain</p>
                </div>
                <div className="p-3 rounded-lg border bg-blue-50">
                  <h5 className="font-medium text-blue-800">add_review</h5>
                  <p className="text-sm text-blue-700">Submit reviews with ratings and metadata</p>
                </div>
                <div className="p-3 rounded-lg border bg-orange-50">
                  <h5 className="font-medium text-orange-800">update_review</h5>
                  <p className="text-sm text-orange-700">Modify existing reviews (owner only)</p>
                </div>
                <div className="p-3 rounded-lg border bg-red-50">
                  <h5 className="font-medium text-red-800">delete_review</h5>
                  <p className="text-sm text-red-700">Remove reviews permanently (owner only)</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Security Features</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Owner-only access controls for restaurant updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Reviewer-only access for review modifications</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Rating validation (1-5 stars only)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Math overflow protection for aggregations</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Data Structures</h4>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="p-3 rounded-lg border">
                  <h5 className="font-medium">Restaurant</h5>
                  <p className="text-sm text-muted-foreground">Owner, name, category, metadata, ratings, timestamps</p>
                </div>
                <div className="p-3 rounded-lg border">
                  <h5 className="font-medium">Review</h5>
                  <p className="text-sm text-muted-foreground">Reviewer, restaurant, rating, content, timestamps</p>
                </div>
                <div className="p-3 rounded-lg border">
                  <h5 className="font-medium">Reputation</h5>
                  <p className="text-sm text-muted-foreground">User wallet, reputation score</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">Contract Source Code</h4>
              <Badge variant="outline" className="text-xs">Rust + Anchor</Badge>
            </div>
            
            <div className="relative">
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-gray-400">restaurant_reviews.rs</span>
                </div>
                <pre className="text-sm font-mono leading-relaxed">
{`#![allow(deprecated)]
use anchor_lang::prelude::*;

declare_id!("BJNDXDh57UnLvJgxaWM6u7Qer57DkpG2Aj4QWVNoSKBv");

#[program]
pub mod restaurant_reviews {
    use super::*;

    pub fn register_restaurant(
        ctx: Context<RegisterRestaurant>,
        name: String,
        category: String,
        metadata_cid: String,
    ) -> Result<()> {
        let restaurant = &mut ctx.accounts.restaurant;
        let clock = Clock::get()?;

        restaurant.owner = *ctx.accounts.owner.key;
        restaurant.name = name;
        restaurant.category = category;
        restaurant.metadata_cid = metadata_cid;
        restaurant.rating_sum = 0;
        restaurant.review_count = 0;
        restaurant.created_at = clock.unix_timestamp;

        emit!(RestaurantRegistered {
            restaurant: restaurant.key(),
            owner: restaurant.owner,
        });

        Ok(())
    }

    pub fn update_restaurant(
        ctx: Context<UpdateRestaurant>,
        name: Option<String>,
        category: Option<String>,
        metadata_cid: Option<String>,
    ) -> Result<()> {
        let restaurant = &mut ctx.accounts.restaurant;
        require!(restaurant.owner == *ctx.accounts.owner.key, ErrorCode::Unauthorized);

        if let Some(n) = name { restaurant.name = n; }
        if let Some(c) = category { restaurant.category = c; }
        if let Some(m) = metadata_cid { restaurant.metadata_cid = m; }

        emit!(RestaurantUpdated { restaurant: restaurant.key() });
        Ok(())
    }

    pub fn add_review(
        ctx: Context<AddReview>,
        rating: u8, // 1..=5
        review_cid: String,
    ) -> Result<()> {
        require!((1..=5).contains(&rating), ErrorCode::InvalidRating);

        let review = &mut ctx.accounts.review;
        let restaurant = &mut ctx.accounts.restaurant;
        let clock = Clock::get()?;

        review.reviewer = *ctx.accounts.reviewer.key;
        review.restaurant = restaurant.key();
        review.rating = rating;
        review.review_cid = review_cid;
        review.created_at = clock.unix_timestamp;
        review.updated_at = clock.unix_timestamp;

        // update aggregate rating
        restaurant.rating_sum = restaurant.rating_sum.checked_add(rating as u64).ok_or(ErrorCode::MathOverflow)?;
        restaurant.review_count = restaurant.review_count.checked_add(1).ok_or(ErrorCode::MathOverflow)?;

        // update reputation (simple increment)
        let rep = &mut ctx.accounts.reputation;
        rep.user = *ctx.accounts.reviewer.key;
        rep.score = rep.score.checked_add(1).unwrap_or(rep.score);

        emit!(ReviewAdded { review: review.key(), restaurant: restaurant.key(), reviewer: review.reviewer });
        Ok(())
    }

    pub fn update_review(
        ctx: Context<UpdateReview>,
        new_rating: Option<u8>,
        new_review_cid: Option<String>,
    ) -> Result<()> {
        let review = &mut ctx.accounts.review;
        let restaurant = &mut ctx.accounts.restaurant;
        let clock = Clock::get()?;

        require!(review.reviewer == *ctx.accounts.reviewer.key, ErrorCode::Unauthorized);

        if let Some(r) = new_rating {
            require!((1..=5).contains(&r), ErrorCode::InvalidRating);
            // adjust restaurant aggregates
            let old = review.rating as i64;
            let delta = (r as i64) - old;
            if delta > 0 {
                restaurant.rating_sum = restaurant.rating_sum.checked_add(delta as u64).ok_or(ErrorCode::MathOverflow)?;
            } else if delta < 0 {
                // safe subtract
                restaurant.rating_sum = restaurant.rating_sum.checked_sub((-delta) as u64).ok_or(ErrorCode::MathOverflow)?;
            }
            review.rating = r;
        }

        if let Some(cid) = new_review_cid { review.review_cid = cid; }

        review.updated_at = clock.unix_timestamp;
        emit!(ReviewUpdated { review: review.key(), reviewer: review.reviewer });
        Ok(())
    }

    pub fn delete_review(ctx: Context<DeleteReview>) -> Result<()> {
        let review = &mut ctx.accounts.review;
        let restaurant = &mut ctx.accounts.restaurant;

        require!(review.reviewer == *ctx.accounts.reviewer.key, ErrorCode::Unauthorized);

        // update aggregates
        restaurant.rating_sum = restaurant
            .rating_sum
            .checked_sub(review.rating as u64)
            .ok_or(ErrorCode::MathOverflow)?;
        restaurant.review_count = restaurant
            .review_count
            .checked_sub(1)
            .ok_or(ErrorCode::MathOverflow)?;

        // decrement reputation
        let rep = &mut ctx.accounts.reputation;
        rep.score = rep.score.checked_sub(1).unwrap_or(0);

        // Anchor automatically closes review account and refunds lamports to reviewer
        // thanks to: #[account(mut, has_one = reviewer, close = reviewer)]
        emit!(ReviewDeleted {
            review: review.key(),
            reviewer: review.reviewer
        });

        Ok(())
    }
}

// ------------------------- Accounts -------------------------

#[derive(Accounts)]
#[instruction(name: String, category: String, metadata_cid: String)]
pub struct RegisterRestaurant<'info> {
    #[account(
        init_if_needed,
        seeds = [b"restaurant", owner.key.as_ref(), name.as_bytes()],
        bump,
        payer = owner,
        space = 8 + 32 + 4 + 64 + 4 + 32 + 4 + 200 + 8 + 8 + 8,
    )]
    pub restaurant: Account<'info, Restaurant>,

    #[account(mut)]
    pub owner: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateRestaurant<'info> {
    #[account(mut, has_one = owner)]
    pub restaurant: Account<'info, Restaurant>,
    pub owner: Signer<'info>,
}

#[derive(Accounts)]
pub struct AddReview<'info> {
    #[account(mut)]
    pub restaurant: Account<'info, Restaurant>,

    #[account(
        init,
        seeds = [b"review", restaurant.key().as_ref(), reviewer.key.as_ref()],
        bump,
        payer = reviewer,
        space = 8 + 32 + 32 + 1 + 4 + 200 + 8 + 8,
    )]
    pub review: Account<'info, Review>,

    #[account(mut)]
    pub reviewer: Signer<'info>,

    #[account(
        init_if_needed,
        seeds = [b"reputation", reviewer.key.as_ref()],
        bump,
        payer = reviewer,
        space = 8 + 32 + 8,
    )]
    pub reputation: Account<'info, Reputation>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateReview<'info> {
    #[account(mut, has_one = reviewer)]
    pub review: Account<'info, Review>,
    #[account(mut)]
    pub restaurant: Account<'info, Restaurant>,
    pub reviewer: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteReview<'info> {
    #[account(mut, has_one = reviewer, close = reviewer)]
    pub review: Account<'info, Review>,
    #[account(mut)]
    pub restaurant: Account<'info, Restaurant>,
    #[account(mut)]
    pub reputation: Account<'info, Reputation>,
    pub reviewer: Signer<'info>,
}

// ------------------------- State -------------------------

#[account]
pub struct Restaurant {
    pub owner: Pubkey,
    pub name: String,
    pub category: String,
    pub metadata_cid: String,
    pub rating_sum: u64,
    pub review_count: u64,
    pub created_at: i64,
}

#[account]
pub struct Review {
    pub reviewer: Pubkey,
    pub restaurant: Pubkey,
    pub rating: u8,
    pub review_cid: String,
    pub created_at: i64,
    pub updated_at: i64,
}

#[account]
pub struct Reputation {
    pub user: Pubkey,
    pub score: u64,
}

// ------------------------- Events -------------------------

#[event]
pub struct RestaurantRegistered {
    pub restaurant: Pubkey,
    pub owner: Pubkey,
}

#[event]
pub struct RestaurantUpdated {
    pub restaurant: Pubkey,
}

#[event]
pub struct ReviewAdded {
    pub review: Pubkey,
    pub restaurant: Pubkey,
    pub reviewer: Pubkey,
}

#[event]
pub struct ReviewUpdated {
    pub review: Pubkey,
    pub reviewer: Pubkey,
}

#[event]
pub struct ReviewDeleted {
    pub review: Pubkey,
    pub reviewer: Pubkey,
}

// ------------------------- Errors -------------------------

#[error_code]
pub enum ErrorCode {
    #[msg("Unauthorized")]
    Unauthorized,
    #[msg("Rating must be between 1 and 5")]
    InvalidRating,
    #[msg("Math overflow")]
    MathOverflow,
}`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
          <CardDescription>Built with modern web technologies and blockchain innovation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {techStack.map((tech) => (
              <div key={tech.name} className="flex items-center gap-2 p-3 rounded-lg border">
                <Badge variant="secondary">{tech.name}</Badge>
                <span className="text-sm text-muted-foreground">{tech.description}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Why Choose RestaurantChain?</CardTitle>
          <CardDescription>Key advantages of our decentralized approach</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="font-semibold text-green-600">✓ Immutable Reviews</h3>
              <p className="text-sm text-muted-foreground">Once submitted, reviews cannot be altered or deleted by anyone, ensuring authenticity.</p>
              
              <h3 className="font-semibold text-green-600">✓ No Central Control</h3>
              <p className="text-sm text-muted-foreground">No single entity can manipulate the review system or censor content.</p>
              
              <h3 className="font-semibold text-green-600">✓ Transparent Operations</h3>
              <p className="text-sm text-muted-foreground">All transactions and data are publicly verifiable on the blockchain.</p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-green-600">✓ Censorship Resistant</h3>
              <p className="text-sm text-muted-foreground">Reviews cannot be removed or hidden by authorities or platform owners.</p>
              
              <h3 className="font-semibold text-green-600">✓ Global Access</h3>
              <p className="text-sm text-muted-foreground">Accessible worldwide without restrictions or regional limitations.</p>
              
              <h3 className="font-semibold text-green-600">✓ Cost Effective</h3>
              <p className="text-sm text-muted-foreground">Low transaction fees on Solana make it affordable for everyone.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-8 border-t">
        <p className="text-muted-foreground">
          Built with ❤️ on Solana • Powered by blockchain technology
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          RestaurantChain v1.0 • Decentralized Restaurant Reviews
        </p>
      </div>
    </div>
  );
};
