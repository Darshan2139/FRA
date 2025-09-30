import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

export const DssModal: React.FC<{ open: boolean; onOpenChange: (v: boolean) => void }>=({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>DSS Recommendation Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <p><span className="font-medium">Scheme:</span> Jal Jeevan Mission</p>
          <p><span className="font-medium">Reason:</span> Low water index in 63% of hamlets; distance to nearest source &gt; 1.2km</p>
          <p><span className="font-medium">Priority Score:</span> 91</p>
          <Separator />
          <p className="text-muted-foreground">This is exportable as part of the decision report.</p>
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" onClick={()=> toast({ title: "Report exported", description: "DSS report generated." })}>Export Report</Button>
            <Button onClick={()=> { toast({ title: "Assigned", description: "Recommendation assigned to officer." }); onOpenChange(false); }}>Assign</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
