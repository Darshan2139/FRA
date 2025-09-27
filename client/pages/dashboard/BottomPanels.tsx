import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";

export const BottomPanels = () => {
  const nav = useNavigate();
  const { addHistory } = useApp();
  return (
    <div className="grid lg:grid-cols-2 gap-4 mt-4">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Analytics</CardTitle>
          <Button variant="outline" size="sm" onClick={()=> { toast({ title: "Export queued", description: "PDF/Excel export started." }); addHistory({ type: "export", title: "Analytics Export", description: "PDF/Excel export queued" }); }}>Export PDF/Excel</Button>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="font-medium">Claim Progress</div>
            <div className="mt-2 h-28 rounded-md border bg-[linear-gradient(to_top,_rgba(0,0,0,0.06),_rgba(0,0,0,0.0)),radial-gradient(circle_at_10%_90%,_hsl(var(--primary))_2px,_transparent_2px)] bg-[length:100%_100%,16px_16px]" aria-label="chart placeholder" />
          </div>
          <div>
            <div className="font-medium">Scheme Coverage</div>
            <div className="mt-2 h-28 rounded-md border bg-[conic-gradient(from_45deg,_hsl(var(--secondary))_0_90deg,_hsl(var(--accent))_90deg_180deg,_hsl(var(--primary))_180deg_270deg,_hsl(var(--muted-foreground))_270deg_360deg)]" aria-label="heatmap placeholder" />
          </div>
          <div>
            <div className="font-medium">Water Index</div>
            <div className="mt-2 h-28 rounded-md border bg-[repeating-linear-gradient(90deg,_hsl(var(--accent))_0_6px,_transparent_6px_12px)]" aria-label="distribution placeholder" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Tasks & Workflow</CardTitle>
          <Button variant="outline" size="sm" onClick={()=> nav("/queue")}>Open Queue</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patta</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Officer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[{p:"OD-PA-0012",s:"Pending",o:"R. Verma"},{p:"OD-RG-2341",s:"Review",o:"S. Nandi"},{p:"OD-MB-0913",s:"Approve",o:"A. Das"}].map((t,i)=> (
                <TableRow key={i}>
                  <TableCell>{t.p}</TableCell>
                  <TableCell>{t.s}</TableCell>
                  <TableCell>{t.o}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
