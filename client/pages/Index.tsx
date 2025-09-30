import {
  ArrowRight,
  Building2,
  FileText,
  Map,
  Shield,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role, useApp } from "@/context/AppContext";

export default function Index() {
  const nav = useNavigate();
  const { role, setRole, setAuthenticated, isAuthenticated } = useApp();
  return (
    <>
      <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-white">
        {/* Hero */}
        <section className="container grid lg:grid-cols-2 gap-8 items-center py-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> AI-powered FRA Atlas & WebGIS
              DSS
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              Digitize, Analyze, and Act on FRA Claims with Confidence
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-prose">
              A government-grade platform for secure digitization, AI asset
              mapping, and actionable decision support — designed for
              Ministries, District Officers, Forest Departments, and NGOs.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground"
              >
                <Link to="/login">Gov Login</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary"
              >
                <Link to="/about">Request Demo</Link>
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="text-muted-foreground">Quick role access:</span>
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger className="w-48 h-9">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {(
                    [
                      "Ministry",
                      "District Officer",
                      "Forest Dept",
                      "NGO",
                    ] as Role[]
                  ).map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {isAuthenticated && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    nav("/dashboard");
                  }}
                >
                  Go to Dashboard
                </Button>
              )}
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" /> Secure SSO/JWT
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" /> Govt-ready
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[16/10] rounded-xl border bg-muted/50 overflow-hidden shadow relative">
              {import.meta.env.VITE_MAPTILER_KEY ? (
                <iframe
                  title="WebGIS Map Preview"
                  className="absolute inset-0 w-full h-full"
                  src={`https://api.maptiler.com/maps/streets/?key=${import.meta.env.VITE_MAPTILER_KEY}#6.0/20.3000/85.8000`}
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                  Map preview unavailable — configure VITE_MAPTILER_KEY
                </div>
              )}
              <div className="absolute top-3 right-3 bg-card/90 backdrop-blur rounded-md border px-3 py-1.5 text-xs shadow">
                <div>
                  <span className="font-semibold">Lat:</span> 18.813°N
                </div>
                <div>
                  <span className="font-semibold">Lon:</span> 82.902°E
                </div>
                <div>
                  <span className="font-semibold">Alt:</span> 870 m
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 left-6 bg-white rounded-md shadow px-3 py-2 text-xs border">
              <span className="font-semibold">Map Controls:</span> zoom,
              basemap, measure, draw, export, layers
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="container py-8 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Digitization
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              OCR-based onboarding for Pattas and documents. Human-in-loop
              verification ensures accuracy.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-primary" /> FRA Atlas
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Unified view across State → District → Block → Village.
              Interactive WebGIS with layers.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> DSS
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Scheme recommendations based on rules like water index, land type
              and coverage thresholds.
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="container py-12">
          <div className="rounded-xl border bg-card p-8 grid lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold">See the Dashboard</h2>
              <p className="text-muted-foreground">
                Try the live wireframe with dummy data and interactions.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {isAuthenticated && (
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground"
                >
                  <Link to="/dashboard">
                    Open Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline">
                <a href="#partners">Partners & Contact</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section id="partners" className="mt-4">
          <Separator />
          <div className="container py-10 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg">Project States</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Madhya Pradesh, Tripura, Odisha, Telangana
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Download Brief</h3>
              <Button asChild size="sm" className="mt-2">
                <Link to="/project-brief">Project Brief (PDF)</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
