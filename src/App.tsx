import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UtensilsCrossed } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import RegisterRestaurant from "./pages/RegisterRestaurant";
import AddReview from "./pages/AddReview";
import UpdateReview from "./pages/UpdateReview";
import DeleteReview from "./pages/DeleteReview";
import UpdateRestaurant from "./pages/UpdateRestaurant";
import NotFound from "./pages/NotFound";
import { ConnectWalletButton } from "./components/ConnectWalletButton";
import { Documentation } from "./components/Documentation";

import { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

// 🧩 Import all popular wallet adapters
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
  CoinbaseWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const queryClient = new QueryClient();

const App = () => {
    // 🌐 Select network (Devnet, Testnet, or Mainnet)
  const network = WalletAdapterNetwork.Devnet;

  // ⚡ RPC endpoint — you can replace with your own
  const endpoint = useMemo(() => "https://api.devnet.solana.com", [network]);

  // 💳 All supported wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter(),
      new CoinbaseWalletAdapter(),
    ],
    [network]
  );

  return (
            <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider defaultOpen={false}>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-14 items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <SidebarTrigger />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                        <UtensilsCrossed className="w-5 h-5 text-white" />
                      </div>
                      <h1 className="font-bold text-lg">RestaurantChain</h1>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ConnectWalletButton />
                  </div>
                </div>
              </header>
              <main className="flex-1 p-6 overflow-auto">
                <div className="max-w-[1200px] mx-auto">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/register" element={<RegisterRestaurant />} />
                  <Route path="/add-review" element={<AddReview />} />
                  <Route path="/update-review" element={<UpdateReview />} />
                  <Route path="/delete-review" element={<DeleteReview />} />
                  <Route path="/update-restaurant" element={<UpdateRestaurant />} />
                  <Route path="/documentation" element={<Documentation />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </WalletModalProvider>
  </WalletProvider>
  </ConnectionProvider>
)};

export default App;
