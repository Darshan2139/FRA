import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, MapPin, Search, ChevronDown, Shield } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
<<<<<<< HEAD
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
=======
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { AtlasState, Role, useApp } from "@/context/AppContext";
import React from "react";
import { toast } from "@/hooks/use-toast";

<<<<<<< HEAD
const states: AtlasState[] = [
  "Madhya Pradesh",
  "Tripura",
  "Odisha",
  "Telangana",
];
const roles: Role[] = ["Ministry", "District Officer", "Forest Dept", "NGO"];

export const Header: React.FC = () => {
  const {
    role,
    setRole,
    selectedState,
    setSelectedState,
    searchQuery,
    setSearchQuery,
    notifications,
    isAuthenticated,
    setAuthenticated,
  } = useApp();
=======
const states: AtlasState[] = ["Madhya Pradesh", "Tripura", "Odisha", "Telangana"];
const roles: Role[] = ["Ministry", "District Officer", "Forest Dept", "NGO"];

export const Header: React.FC = () => {
  const { role, setRole, selectedState, setSelectedState, searchQuery, setSearchQuery, notifications, isAuthenticated, setAuthenticated } = useApp();
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
  const nav = useNavigate();
  const location = useLocation();
  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.pathname.startsWith("/dashboard")) nav("/dashboard");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75">
      <div className="container flex items-center justify-between h-16">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3">
<<<<<<< HEAD
          <Link
            to="/"
            aria-label="FRA Atlas Home"
            className="flex items-center gap-2"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="text-primary"
              aria-hidden
            >
              <path
                fill="currentColor"
                d="M12 2l3.5 7.5L23 10l-5.5 4.5L19 22l-7-4-7 4 1.5-7.5L1 10l7.5-.5z"
              />
            </svg>
            <span className="font-extrabold tracking-tight text-xl">
              FRA Atlas
            </span>
=======
          <Link to="/" aria-label="FRA Atlas Home" className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 24 24" className="text-primary" aria-hidden>
              <path fill="currentColor" d="M12 2l3.5 7.5L23 10l-5.5 4.5L19 22l-7-4-7 4 1.5-7.5L1 10l7.5-.5z"/>
            </svg>
            <span className="font-extrabold tracking-tight text-xl">FRA Atlas</span>
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" aria-hidden />
            <span className="sr-only">Current State</span>
<<<<<<< HEAD
            <Select
              value={selectedState}
              onValueChange={(v) => setSelectedState(v as AtlasState)}
            >
=======
            <Select value={selectedState} onValueChange={(v) => setSelectedState(v as AtlasState)}>
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
              <SelectTrigger className="w-44 h-8 text-sm bg-background">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((s) => (
<<<<<<< HEAD
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
=======
                  <SelectItem key={s} value={s}>{s}</SelectItem>
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Center: Quick Search */}
        <form onSubmit={onSearchSubmit} className="flex-1 max-w-xl px-4">
          <div className="relative">
<<<<<<< HEAD
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              aria-hidden
            />
=======
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 rounded-md bg-background"
              placeholder="Search Patta ID / Claimant name"
              aria-label="Quick search"
            />
<<<<<<< HEAD
            <Button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3"
              aria-label="Search"
            >
=======
            <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3" aria-label="Search">
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
              Search
            </Button>
          </div>
        </form>

        {/* Right: Role + Avatar + Notifications */}
        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <div className="hidden sm:flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" aria-hidden />
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger className="w-44 h-8 text-sm bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
<<<<<<< HEAD
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
=======
                    <SelectItem key={r} value={r}>{r}</SelectItem>
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {isAuthenticated && (
<<<<<<< HEAD
            <Button
              variant="ghost"
              asChild
              aria-label="Notifications"
              className="relative"
            >
=======
            <Button variant="ghost" asChild aria-label="Notifications" className="relative">
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
              <Link to="/history">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 rounded-full bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">
                    {notifications}
                  </span>
                )}
              </Link>
            </Button>
          )}

          {!isAuthenticated && (
<<<<<<< HEAD
            <>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden md:inline-flex"
              >
                <Link to="/about">About</Link>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                asChild
                className="hidden md:inline-flex"
              >
                <Link to="/login">Gov Login</Link>
              </Button>
            </>
=======
            <Button variant="secondary" size="sm" asChild className="hidden md:inline-flex">
              <Link to="/login">Gov Login</Link>
            </Button>
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
          )}

          {isAuthenticated && (
            <>
              <div className="flex items-center gap-2">
<<<<<<< HEAD
                <Link to="/profile">
                  <Avatar>
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      AS
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Badge
                  variant="outline"
                  className={cn(
                    "hidden sm:inline-flex",
                    role === "Ministry" && "border-primary text-primary",
                  )}
                >
                  {role}
                </Badge>
                <ChevronDown
                  className="h-4 w-4 text-muted-foreground"
                  aria-hidden
                />
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link to="/profile">Profile</Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setAuthenticated(false);
                  toast({
                    title: "Logged out",
                    description: "Session cleared.",
                  });
                  nav("/login");
                }}
              >
                Logout
              </Button>
=======
                <Link to="/profile"><Avatar>
              <AvatarFallback className="bg-accent text-accent-foreground">AS</AvatarFallback>
            </Avatar></Link>
                <Badge variant="outline" className={cn("hidden sm:inline-flex", role === "Ministry" && "border-primary text-primary")}>{role}</Badge>
                <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden />
              </div>
              <Button asChild variant="ghost" size="sm"><Link to="/profile">Profile</Link></Button>
              <Button size="sm" variant="outline" onClick={()=>{ setAuthenticated(false); toast({ title: "Logged out", description: "Session cleared." }); nav("/login"); }}>Logout</Button>
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
            </>
          )}
        </div>
      </div>
    </header>
  );
};
