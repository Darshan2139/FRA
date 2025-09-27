import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Lock, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Role, useApp } from "@/context/AppContext";
import { toast } from "@/hooks/use-toast";

export default function Login() {
  const nav = useNavigate();
  const { role, setRole, setAuthenticated } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Logged in", description: `Logged in as ${role}` });
    setAuthenticated(true);
    nav("/dashboard");
  };

  return (
    <main className="container py-12 grid lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Lock className="h-5 w-5 text-primary" /> Government Login</CardTitle>
          <CardDescription>Secure access for authorized roles. Supports SSO/JWT.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4" aria-label="Government Login Form">
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger id="role"><SelectValue placeholder="Select role" /></SelectTrigger>
                <SelectContent>
                  {(["Ministry","District Officer","Forest Dept","NGO"] as Role[]).map(r => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="name@department.gov.in" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="flex items-center justify-between text-sm">
              <a href="#" className="text-accent" onClick={(e)=>{e.preventDefault(); toast({ title: "Password reset", description: "A reset link has been emailed." });}}>Forgot password</a>
              <a href="#" className="text-accent" onClick={(e)=>{e.preventDefault(); toast({ title: "Access request", description: "Your request has been submitted." });}}>Request access</a>
            </div>
            <Button type="submit" className="h-11">Login</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>Gov Landing</CardTitle>
          <CardDescription>Permitted roles and access levels</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-foreground">Ministry</p>
              <p>All states and exports</p>
            </div>
            <Badge>Full</Badge>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-foreground">District Officer</p>
              <p>Restricted to assigned state/district</p>
            </div>
            <Badge variant="outline">Limited</Badge>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-foreground">Forest Dept</p>
              <p>Layer toggles and verification</p>
            </div>
            <Badge variant="outline">Limited</Badge>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-foreground">NGO</p>
              <p>View-only with analytics</p>
            </div>
            <Badge variant="outline">View</Badge>
          </div>
          <div className="pt-2 flex items-center gap-2 text-foreground">
            <ShieldCheck className="h-4 w-4 text-secondary" />
            <span>All access is audited and logged</span>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
