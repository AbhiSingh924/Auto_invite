
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-border bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex flex-col items-start">
              <span className="font-bold text-2xl text-brand-800">InviteSpark</span>
              <span className="text-xs text-muted-foreground">Event Invitation Manager</span>
            </div>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            Dashboard
          </Link>
          <Link to="/upload" className="text-sm font-medium hover:text-primary">
            Upload
          </Link>
          <Link to="/template" className="text-sm font-medium hover:text-primary">
            Template
          </Link>
          <Link to="/analytics" className="text-sm font-medium hover:text-primary">
            Analytics
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="default" size="sm">
            Connect Email
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
