import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApp } from "@/context/AppContext";
import { toast } from "@/hooks/use-toast";
import { BackButton } from "@/components/ui/back-button";
import React from "react";

type Row = { patta: string; claimant: string; status: string };

export default function Queue() {
  const { addHistory, addNotification, removeWorkflowTask } = useApp();
  const [rows, setRows] = React.useState<Row[]>([
    { patta: "OD-PA-0012", claimant: "Radha Majhi", status: "Pending" },
    { patta: "OD-RG-2341", claimant: "B. Soren", status: "Review" },
    { patta: "OD-MB-0913", claimant: "A. Das", status: "Approve" },
  ]);

  const onAction = (action: "Approve" | "Reject", r: Row) => {
    const pastTense = action === "Approve" ? "Approved" : "Rejected";
    toast({
      title: pastTense,
      description: `${r.patta} ${pastTense.toLowerCase()}`,
    });
    addHistory({
      type: "status",
      title: `Claim ${pastTense}`,
      description: `${r.patta} - ${r.claimant}`,
    });
    addNotification({
      title: `Claim ${pastTense}`,
      description: `${r.patta} updated`,
    });
    if (action === "Reject") removeWorkflowTask(r.patta);
    setRows((prev) => prev.filter((i) => i.patta !== r.patta));
  };

  return (
    <main className="container py-8">
      <div className="-mt-2 mb-2">
        <BackButton />
      </div>
=======
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
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
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
<<<<<<< HEAD
              {rows.map((r) => (
=======
              {rows.map((r)=> (
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
                <TableRow key={r.patta}>
                  <TableCell>{r.patta}</TableCell>
                  <TableCell>{r.claimant}</TableCell>
                  <TableCell>{r.status}</TableCell>
                  <TableCell className="text-right space-x-2">
<<<<<<< HEAD
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onAction("Approve", r)}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onAction("Reject", r)}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-sm text-muted-foreground py-6"
                  >
                    No items in queue
                  </TableCell>
                </TableRow>
              )}
=======
                    <Button size="sm" variant="outline" onClick={()=> onAction("Approve", r)}>Approve</Button>
                    <Button size="sm" variant="destructive" onClick={()=> onAction("Reject", r)}>Reject</Button>
                  </TableCell>
                </TableRow>
              ))}
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
