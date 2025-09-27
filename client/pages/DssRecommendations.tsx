import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";
import { toast } from "@/hooks/use-toast";
import { BackButton } from "@/components/ui/back-button";

const recos = [
  { scheme: "Jal Jeevan Mission", reason: "Low water index; >1.2km to source", priority: 91 },
  { scheme: "PM Awas Yojana", reason: "Kuccha houses > 40%", priority: 77 },
  { scheme: "MGNREGA Ponds", reason: "Agriland near forest edge", priority: 70 },
];

export default function DssRecommendations() {
  const { location, addHistory, addNotification } = useApp();
  const assign = (s: typeof recos[number]) => {
    toast({ title: "Assigned", description: `${s.scheme} assigned to officer` });
    addHistory({ type: "dss", title: "DSS Assigned", description: `${s.scheme} for ${location.village ?? "selected village"}` });
    addNotification({ title: "DSS Assigned", description: s.scheme });
  };
  return (
    <main className="container py-8">
      <div className="-mt-2 mb-2"><BackButton /></div>
      <Card>
        <CardHeader>
          <CardTitle>DSS Recommendations {location.village ? `– ${location.village}` : ""}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recos.map((r)=> (
            <div key={r.scheme} className="flex items-start justify-between">
              <div>
                <div className="font-semibold">{r.scheme} <Badge variant="secondary">Priority {r.priority}</Badge></div>
                <div className="text-sm text-muted-foreground">{r.reason}</div>
              </div>
              <div className="space-x-2">
                <Button variant="outline" onClick={()=> toast({ title: "Report exported", description: `${r.scheme} report generated` })}>Export</Button>
                <Button onClick={()=> assign(r)}>Assign</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
