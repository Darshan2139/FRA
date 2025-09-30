import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";
import { toast } from "@/hooks/use-toast";
import { BackButton } from "@/components/ui/back-button";
<<<<<<< HEAD
import React from "react";
import { useNavigate } from "react-router-dom";

const recos = [
  {
    scheme: "Jal Jeevan Mission",
    reason: "Low water index; >1.2km to source",
    priority: 91,
  },
  { scheme: "PM Awas Yojana", reason: "Kuccha houses > 40%", priority: 77 },
  {
    scheme: "MGNREGA Ponds",
    reason: "Agriland near forest edge",
    priority: 70,
  },
=======

const recos = [
  { scheme: "Jal Jeevan Mission", reason: "Low water index; >1.2km to source", priority: 91 },
  { scheme: "PM Awas Yojana", reason: "Kuccha houses > 40%", priority: 77 },
  { scheme: "MGNREGA Ponds", reason: "Agriland near forest edge", priority: 70 },
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
];

export default function DssRecommendations() {
  const { location, addHistory, addNotification } = useApp();
<<<<<<< HEAD
  const nav = useNavigate();
  const [assigned, setAssigned] = React.useState<Record<string, boolean>>({});

  const assign = (s: (typeof recos)[number]) => {
    toast({
      title: "Assigned",
      description: `${s.scheme} assigned to officer`,
    });
    addHistory({
      type: "dss",
      title: "DSS Assigned",
      description: `${s.scheme} for ${location.village ?? "selected village"}`,
    });
    addNotification({ title: "DSS Assigned", description: s.scheme });
    setAssigned((prev) => ({ ...prev, [s.scheme]: true }));
  };

  const exportReport = (s: (typeof recos)[number]) => {
    toast({
      title: "Report exported",
      description: `${s.scheme} report generated`,
    });
    addHistory({
      type: "export",
      title: `${s.scheme} Export`,
      description: `Report generated for ${location.village ?? "selected village"}`,
    });
    nav("/history?type=export");
  };

  return (
    <main className="container py-8">
      <div className="-mt-2 mb-2">
        <BackButton />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            DSS Recommendations{" "}
            {location.village ? `– ${location.village}` : ""}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recos.map((r) => (
            <div key={r.scheme} className="flex items-start justify-between">
              <div>
                <div className="font-semibold">
                  {r.scheme}{" "}
                  <Badge variant="secondary">Priority {r.priority}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">{r.reason}</div>
              </div>
              <div className="space-x-2">
                <Button variant="outline" onClick={() => exportReport(r)}>
                  Export
                </Button>
                <Button
                  onClick={() => assign(r)}
                  disabled={!!assigned[r.scheme]}
                >
                  {assigned[r.scheme] ? "Assigned" : "Assign"}
                </Button>
=======
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
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
