
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg text-brand-800">InviteSpark</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Streamline your event invitations with personalized AI-generated content 
              and automated follow-ups.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <h4 className="font-medium text-sm">Product</h4>
              <div className="flex flex-col gap-1">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
                <Link to="/upload" className="text-sm text-muted-foreground hover:text-foreground">
                  Upload
                </Link>
                <Link to="/template" className="text-sm text-muted-foreground hover:text-foreground">
                  Template
                </Link>
                <Link to="/analytics" className="text-sm text-muted-foreground hover:text-foreground">
                  Analytics
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <h4 className="font-medium text-sm">Resources</h4>
              <div className="flex flex-col gap-1">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Documentation
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Templates
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Help Center
                </a>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <h4 className="font-medium text-sm">Legal</h4>
              <div className="flex flex-col gap-1">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} InviteSpark. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
