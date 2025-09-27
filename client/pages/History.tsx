import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/context/AppContext";
import { BackButton } from "@/components/ui/back-button";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function History() {
  const {
    notificationsList,
    history,
    markAllNotificationsRead,
    removeHistory,
  } = useApp();
  const nav = useNavigate();
  const loc = useLocation();
  const params = React.useMemo(
    () => new URLSearchParams(loc.search),
    [loc.search],
  );
  const initialFilter =
    (params.get("type") as "all" | "export" | "rejected") || "all";
  const [filter, setFilter] = React.useState<"all" | "export" | "rejected">(
    initialFilter,
  );

  const filtered = history.filter((h) => {
    if (filter === "all") return true;
    if (filter === "export") return h.type === "export";
    if (filter === "rejected")
      return /rejected/i.test(h.title) || /rejected/i.test(h.description);
    return true;
  });

  const setAndSyncFilter = (f: typeof filter) => {
    setFilter(f);
    const p = new URLSearchParams(loc.search);
    if (f === "all") p.delete("type");
    else p.set("type", f);
    nav({ search: p.toString() }, { replace: true });
  };

  return (
    <main className="container py-8 grid lg:grid-cols-2 gap-6">
      <div className="lg:col-span-2 -mt-2 mb-1 flex items-center justify-between">
        <BackButton />
        <div className="flex items-center gap-2 text-sm">
          <Button
            size="sm"
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setAndSyncFilter("all")}
          >
            All
          </Button>
          <Button
            size="sm"
            variant={filter === "export" ? "default" : "outline"}
            onClick={() => setAndSyncFilter("export")}
          >
            Exports
          </Button>
          <Button
            size="sm"
            variant={filter === "rejected" ? "default" : "outline"}
            onClick={() => setAndSyncFilter("rejected")}
          >
            Rejected
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Notifications</CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={markAllNotificationsRead}
          >
            Mark all read
          </Button>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {notificationsList.map((n) => (
            <div key={n.id} className="flex items-start justify-between">
              <div>
                <div className="font-medium">{n.title}</div>
                <div className="text-muted-foreground">{n.description}</div>
              </div>
              <Badge variant={n.read ? "outline" : "default"}>
                {new Date(n.ts).toLocaleString()}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audit Trail</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {filtered.map((h) => (
            <div key={h.id}>
              <div className="flex items-center justify-between">
                <div className="font-medium">{h.title}</div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {new Date(h.ts).toLocaleString()}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeHistory(h.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <div className="text-muted-foreground">{h.description}</div>
              <Separator className="my-2" />
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-muted-foreground">No entries.</div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
