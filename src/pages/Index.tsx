import { ViewRestaurants } from "@/components/ViewRestaurants";
import { Program } from "@coral-xyz/anchor";
import { IDL } from "@/anchor/constants";
import { getProvider } from "@/utils/getProvider";
import { useEffect, useState } from "react";

const Index = () => {
  const [program, setProgram] = useState<any>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    try {
      const provider = getProvider();
      const prog = new Program(IDL, provider);
      setProgram(prog);
    } catch (error) {
      console.error("Failed to initialize program:", error);
    }
  }, []);

  // Trigger refresh when component mounts (user navigates to this page)
  useEffect(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  if (!program) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Connecting to blockchain...</p>
        </div>
      </div>
    );
  }

  return <ViewRestaurants program={program} refreshTrigger={refreshTrigger} />;
};

export default Index;
