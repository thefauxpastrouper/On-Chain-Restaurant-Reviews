import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <Card className="border-border bg-card max-w-md w-full">
        <CardContent className="text-center space-y-4 md:space-y-6 p-6 md:p-8">
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-bold gradient-primary bg-clip-text text-transparent">404</h1>
            <h2 className="text-xl md:text-2xl font-semibold">Page Not Found</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              asChild 
              variant="outline" 
              className="flex-1"
            >
              <Link to="/" className="flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Go Back</span>
              </Link>
            </Button>
            <Button 
              asChild 
              className="flex-1 gradient-primary hover:opacity-90"
            >
              <Link to="/" className="flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
