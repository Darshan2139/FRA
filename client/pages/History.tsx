import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useApp } from "@/context/AppContext";
import { BackButton } from "@/components/ui/back-button";

export default function History() {
  const { notificationsList, history, markAllNotificationsRead } = useApp();
  return (
    <main className="container py-8 grid lg:grid-cols-2 gap-6">
      <div className="lg:col-span-2 -mt-2 mb-1"><BackButton /></div>
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Notifications</CardTitle>
          <Button size="sm" variant="outline" onClick={markAllNotificationsRead}>Mark all read</Button>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {notificationsList.map((n)=> (
            <div key={n.id} className="flex items-start justify-between">
              <div>
                <div className="font-medium">{n.title}</div>
                <div className="text-muted-foreground">{n.description}</div>
              </div>
              <Badge variant={n.read ? "outline" : "default"}>{new Date(n.ts).toLocaleString()}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audit Trail</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {history.map((h)=> (
            <div key={h.id}>
              <div className="flex items-center justify-between">
                <div className="font-medium">{h.title}</div>
                <Badge variant="outline">{new Date(h.ts).toLocaleString()}</Badge>
              </div>
              <div className="text-muted-foreground">{h.description}</div>
              <Separator className="my-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
