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
  Info
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
                .map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg border hover:bg-accent/5 transition-colors">
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

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
          <CardDescription>Built with modern web technologies and blockchain innovation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-center gap-2 p-3 rounded-lg border">
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
