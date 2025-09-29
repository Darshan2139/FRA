import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const partners: { name: string; acronym: string; color: string }[] = [
  { name: "National Informatics Centre", acronym: "NIC", color: "#0B5ED7" },
  { name: "Ministry of Electronics & IT", acronym: "MeitY", color: "#0A9396" },
  { name: "Digital India", acronym: "DI", color: "#E36414" },
  { name: "ISRO NRSC", acronym: "ISRO", color: "#F3722C" },
  { name: "C-DAC", acronym: "C-DAC", color: "#3A86FF" },
  { name: "UIDAI", acronym: "UIDAI", color: "#6A4C93" },
];

export const Footer = () => {
  return (
    <footer className="mt-16 border-t bg-card">
      <div className="container py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-semibold text-lg">Partners</h3>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {partners.map((p) => (
              <li key={p.name} className="flex items-center gap-2">
                <svg
                  className="h-10 w-10 flex-none"
                  viewBox="0 0 40 40"
                  role="img"
                  aria-label={`${p.acronym} logo`}
                >
                  <circle cx="20" cy="20" r="19" fill={p.color} opacity="0.9" />
                  <text
                    x="20"
                    y="24"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill="#fff"
                  >
                    {p.acronym}
                  </text>
                </svg>
                <span className="text-sm">{p.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Contact</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Ministry of Tribal Affairs, Government of India
          </p>
          <p className="text-sm text-muted-foreground">
            Email: dss-support@gov.in
          </p>
          <p className="text-sm text-muted-foreground">
            Phone: +91-11-12345678
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Resources</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:underline">
                About Project
              </Link>
            </li>
            <li>
              <a
                href="#"
                aria-disabled
                className="pointer-events-none text-muted-foreground"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-disabled
                className="pointer-events-none text-muted-foreground"
              >
                Terms of Use
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Separator />
      <div className="container py-6 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between">
        <p>
          © {new Date().getFullYear()} FRA Atlas & WebGIS DSS. All rights
          reserved.
        </p>
        <p>
          Built for accessibility: high contrast, keyboard navigation, and
          screen reader friendly.
        </p>
      </div>
    </footer>
  );
};
