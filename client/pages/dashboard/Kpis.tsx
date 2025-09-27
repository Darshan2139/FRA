import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, ClipboardList, Clock, MapPin } from "lucide-react";
import React from "react";

interface KpiProps {
  loading?: boolean;
}

type Period = "7d" | "30d" | "YTD";

const Sparkline: React.FC<{ colorClass?: string }> = ({ colorClass = "stroke-primary" }) => (
  <svg className="w-full h-10" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden>
    <polyline fill="none" vectorEffect="non-scaling-stroke" strokeWidth="2" className={colorClass} points="0,20 10,18 20,22 30,15 40,17 50,12 60,14 70,10 80,13 90,9 100,12" />
  </svg>
);

const numberFmt = new Intl.NumberFormat("en-IN");

export const Kpis: React.FC<KpiProps> = ({ loading }) => {
  const [period, setPeriod] = React.useState<Period>("7d");

  const items = [
    { key: "total", title: "Total Claims", icon: ClipboardList },
    { key: "granted", title: "Granted Pattas", icon: Award },
    { key: "pending", title: "Pending Verifications", icon: Clock },
    { key: "villages", title: "Villages Analyzed", icon: MapPin },
  ] as const;

  const datasets: Record<Period, Record<(typeof items)[number]["key"], { value: number; deltaPct: number }>> = {
    "7d": {
      total: { value: 124_532, deltaPct: 2.3 },
      granted: { value: 62_410, deltaPct: 1.1 },
      pending: { value: 11_902, deltaPct: -4.2 },
      villages: { value: 8_412, deltaPct: 0.6 },
    },
    "30d": {
      total: { value: 486_210, deltaPct: 5.9 },
      granted: { value: 249_870, deltaPct: 3.7 },
      pending: { value: 46_102, deltaPct: -6.5 },
      villages: { value: 32_018, deltaPct: 2.1 },
    },
    YTD: {
      total: { value: 2_914_380, deltaPct: 12.4 },
      granted: { value: 1_476_920, deltaPct: 9.2 },
      pending: { value: 109_340, deltaPct: -8.1 },
      villages: { value: 182_640, deltaPct: 6.8 },
    },
  };

  const filterPills: Period[] = ["7d", "30d", "YTD"];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, idx) => {
        const { value, deltaPct } = datasets[period][it.key];
        const isUp = deltaPct >= 0;
        return (
          <Card key={it.key} className="overflow-hidden">
            <CardHeader className="pb-2 flex-row items-center justify-between bg-gradient-to-r from-background to-transparent">
              <div className="flex items-center gap-2">
                <it.icon className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-sm font-medium">{it.title}</CardTitle>
              </div>
              <div className="flex gap-1">
                {filterPills.map((p) => (
                  <button key={p} onClick={() => setPeriod(p)}>
                    <Badge variant={p === period ? "default" : "outline"} className="rounded-full px-2 py-0.5 text-[10px]">
                      {p}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-extrabold tracking-tight">{loading ? "—" : numberFmt.format(value)}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {isUp ? <span className="text-[hsl(var(--status-granted))] font-medium">+{deltaPct.toFixed(1)}%</span> : <span className="text-[hsl(var(--status-rejected))] font-medium">{deltaPct.toFixed(1)}%</span>} <span className="ml-1">vs last period</span>
              </div>
              <div className="mt-2">
                <Sparkline colorClass={idx === 1 ? "stroke-[hsl(var(--status-granted))]" : idx === 2 ? "stroke-[hsl(var(--status-pending))]" : "stroke-primary"} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
