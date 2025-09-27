import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";
import { BackButton } from "@/components/ui/back-button";

export default function Profile() {
  const { role, selectedState, location } = useApp();
  const emailByRole: Record<string,string> = {
    "Ministry": "ministry@fra.gov.in",
    "District Officer": "officer.koraput@odisha.gov.in",
    "Forest Dept": "ranger@forest.gov.in",
    "NGO": "outreach@ngo.org",
  };
  return (
    <main className="container py-8">
      <div className="-mt-2 mb-2"><BackButton /></div>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <div className="grid gap-1">
            <Label>Role</Label>
            <Input value={role} readOnly />
          </div>
          <div className="grid gap-1">
            <Label>Email</Label>
            <Input value={emailByRole[role]} readOnly />
          </div>
          <div className="grid gap-1">
            <Label>Selected State</Label>
            <Input value={selectedState} readOnly />
          </div>
          <div className="grid gap-1">
            <Label>Location</Label>
            <Input value={[location.state, location.district, location.block, location.village].filter(Boolean).join(" / ") || "Not set"} readOnly />
          </div>
          <div className="col-span-full">
            <Badge variant="outline">All actions are audited</Badge>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
