import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useApp } from "@/context/AppContext";
import { toast } from "@/hooks/use-toast";
import { BackButton } from "@/components/ui/back-button";

export default function Queue() {
  const { addHistory, addNotification } = useApp();
  const rows = [
    { patta: "OD-PA-0012", claimant: "Radha Majhi", status: "Pending" },
    { patta: "OD-RG-2341", claimant: "B. Soren", status: "Review" },
    { patta: "OD-MB-0913", claimant: "A. Das", status: "Approve" },
  ];
  const onAction = (action: "Approve" | "Reject", r: typeof rows[number]) => {
    toast({ title: `${action}d`, description: `${r.patta} ${action.toLowerCase()}ed` });
    addHistory({ type: "status", title: `Claim ${action}d`, description: `${r.patta} - ${r.claimant}` });
    addNotification({ title: `Claim ${action}d`, description: `${r.patta} updated` });
  };
  return (
    <main className="container py-8">
      <div className="-mt-2 mb-2"><BackButton /></div>
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Verification Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patta</TableHead>
                <TableHead>Claimant</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r)=> (
                <TableRow key={r.patta}>
                  <TableCell>{r.patta}</TableCell>
                  <TableCell>{r.claimant}</TableCell>
                  <TableCell>{r.status}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={()=> onAction("Approve", r)}>Approve</Button>
                    <Button size="sm" variant="destructive" onClick={()=> onAction("Reject", r)}>Reject</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
