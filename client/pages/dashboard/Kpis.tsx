import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, ClipboardList, Clock, MapPin } from "lucide-react";
import React from "react";

interface KpiProps {
  loading?: boolean;
}

const Sparkline: React.FC<{ colorClass?: string }> = ({ colorClass = "stroke-primary" }) => (
  <svg className="w-full h-10" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden>
    <polyline fill="none" vectorEffect="non-scaling-stroke" strokeWidth="2" className={colorClass} points="0,20 10,18 20,22 30,15 40,17 50,12 60,14 70,10 80,13 90,9 100,12" />
  </svg>
);

export const Kpis: React.FC<KpiProps> = ({ loading }) => {
  const items = [
    { title: "Total Claims", value: "1,24,532", icon: ClipboardList },
    { title: "Granted Pattas", value: "62,410", icon: Award },
    { title: "Pending Verifications", value: "11,902", icon: Clock },
    { title: "Villages Analyzed", value: "8,412", icon: MapPin },
  ] as const;
  const filterPills = ["7d", "30d", "YTD"] as const;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, idx) => (
        <Card key={idx} className="overflow-hidden">
          <CardHeader className="pb-2 flex-row items-center justify-between bg-gradient-to-r from-background to-transparent">
            <div className="flex items-center gap-2">
              <it.icon className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">{it.title}</CardTitle>
            </div>
            <div className="flex gap-1">
              {filterPills.map((p) => (
                <Badge key={p} variant="outline" className="rounded-full px-2 py-0.5 text-[10px]">{p}</Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold tracking-tight">{loading ? "—" : it.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">vs last period</div>
            <div className="mt-2">
              <Sparkline colorClass={idx === 1 ? "stroke-[hsl(var(--status-granted))]" : idx === 2 ? "stroke-[hsl(var(--status-pending))]" : "stroke-primary"} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
