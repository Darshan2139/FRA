import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Loader2, Sparkles, Table, Upload } from "lucide-react";
import React from "react";
import { toast } from "@/hooks/use-toast";

export interface DrawerProps {
  open: boolean;
  village?: string;
  onClose: () => void;
  onOpenUpload: () => void;
  onOpenDss: () => void;
}

export const RightDrawer: React.FC<DrawerProps> = ({ open, village, onClose, onOpenUpload, onOpenDss }) => {
  if (!open) return null;

  return (
    <aside className="h-full border-l bg-card w-full md:w-[360px]">
      <div className="flex items-center justify-between p-3 border-b">
        <div>
          <p className="text-xs text-muted-foreground">Village</p>
          <h3 className="font-semibold text-lg">{village ? village[0].toUpperCase() + village.slice(1) : "—"}</h3>
        </div>
        <Button variant="ghost" onClick={onClose} aria-label="Close details">Close</Button>
      </div>
      <ScrollArea className="h-[calc(100%-3rem)]">
        <Tabs defaultValue="overview" className="p-3">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="dss">DSS</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Demographics</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>Households: 248</p>
                <p>Tribes: Gond, Santal</p>
                <p>Coordinates: 18.813°N, 82.902°E</p>
              </CardContent>
            </Card>
            <Card className="mt-3">
              <CardHeader>
                <CardTitle className="text-sm">Patta Stats</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>Claims: 412</p>
                <p>Granted: 246</p>
                <p>Pending: 116</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assets" className="mt-3">
            <div className="space-y-2">
              {[{name:"Handpump",conf:0.94},{name:"Irrigation Canal",conf:0.82},{name:"School",conf:0.76}].map((a,i) => (
                <Card key={i}>
                  <CardContent className="py-3 flex items-center justify-between">
                    <div className="font-medium">{a.name}</div>
                    <Badge variant="outline">Confidence {Math.round(a.conf*100)}%</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Uploaded Files</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {["Patta_1234.pdf","Patta_5678.jpg"].map((d,i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /> {d}</div>
                    <Button variant="outline" size="sm" onClick={onOpenUpload}><Upload className="h-3.5 w-3.5 mr-1" /> OCR Preview</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dss" className="mt-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[{t:"Jal Jeevan",r:"Low water index",p:0.91},{t:"PM Awas",r:"Kuccha houses > 40%",p:0.77},{t:"MGNREGA Ponds",r:"Agriland near forest edge",p:0.7}].map((d,i)=> (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{d.t}</div>
                      <div className="text-xs text-muted-foreground">{d.r}</div>
                    </div>
                    <Button size="sm" onClick={onOpenDss}><Sparkles className="h-3.5 w-3.5 mr-1" /> Apply ({Math.round(d.p*100)})</Button>
                  </div>
                ))}
                <div className="pt-2">
                  <Button asChild variant="outline" size="sm"><a href="/dss">View all recommendations</a></Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="mt-3">
            <div className="grid gap-2">
              <Button variant="secondary" onClick={()=> toast({ title: "Report generated", description: "Village report created." })}>Generate Report</Button>
              <Button variant="outline" onClick={()=> toast({ title: "Shapefile export", description: "Export started." })}>Export Shapefile</Button>
              <Button onClick={()=> toast({ title: "Marked verified", description: "Verification status updated." })}>Mark Verified</Button>
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </aside>
  );
};
