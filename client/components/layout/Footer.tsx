import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-card">
      <div className="container py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-semibold text-lg">Partners</h3>
          <div className="mt-3 flex items-center gap-4 opacity-80">
            <img src="/placeholder.svg" alt="Partner 1" className="h-10 w-auto" />
            <img src="/placeholder.svg" alt="Partner 2" className="h-10 w-auto" />
            <img src="/placeholder.svg" alt="Partner 3" className="h-10 w-auto" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Contact</h3>
          <p className="mt-3 text-sm text-muted-foreground">Ministry of Tribal Affairs, Government of India</p>
          <p className="text-sm text-muted-foreground">Email: dss-support@gov.in</p>
          <p className="text-sm text-muted-foreground">Phone: +91-11-12345678</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Resources</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/about" className="hover:underline">About Project</Link></li>
            <li><a href="#" aria-disabled className="pointer-events-none text-muted-foreground">Privacy Policy</a></li>
            <li><a href="#" aria-disabled className="pointer-events-none text-muted-foreground">Terms of Use</a></li>
          </ul>
        </div>
      </div>
      <Separator />
      <div className="container py-6 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between">
        <p>© {new Date().getFullYear()} FRA Atlas & WebGIS DSS. All rights reserved.</p>
        <p>
          Built for accessibility: high contrast, keyboard navigation, and screen reader friendly.
        </p>
      </div>
    </footer>
  );
};
