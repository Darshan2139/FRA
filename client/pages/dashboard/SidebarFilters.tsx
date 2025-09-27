import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const SidebarFilters: React.FC<{ onOpenUpload: () => void; onChange: () => void } > = ({ onOpenUpload, onChange }) => {
  const { selectedState, setSelectedState, location, setLocation, role } = useApp();

  const districts = ["Koraput", "Rayagada", "Mayurbhanj"];
  const blocks = ["Boriguma", "Laxmipur", "Kashipur"];
  const villages = ["Badakua", "Akkad", "Duduki"];

  const disabledByRole = role === "District Officer";

  return (
    <aside className="h-full">
      <ScrollArea className="h-full pr-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Location Filters</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="grid gap-1">
              <Label>State</Label>
              <Select value={location.state ?? selectedState} onValueChange={(v) => { setSelectedState(v as any); setLocation({ ...location, state: v as any }); onChange(); }}>
                <SelectTrigger disabled={disabledByRole}><SelectValue placeholder="State" /></SelectTrigger>
                <SelectContent>
                  {["Madhya Pradesh","Tripura","Odisha","Telangana"].map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1">
              <Label>District</Label>
              <Select value={location.district} onValueChange={(v) => { setLocation({ ...location, district: v }); onChange(); }}>
                <SelectTrigger><SelectValue placeholder="District" /></SelectTrigger>
                <SelectContent>
                  {districts.map(d => (<SelectItem key={d} value={d}>{d}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1">
              <Label>Block</Label>
              <Select value={location.block} onValueChange={(v) => { setLocation({ ...location, block: v }); onChange(); }}>
                <SelectTrigger><SelectValue placeholder="Block" /></SelectTrigger>
                <SelectContent>
                  {blocks.map(b => (<SelectItem key={b} value={b}>{b}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1">
              <Label>Village</Label>
              <Select value={location.village} onValueChange={(v) => { setLocation({ ...location, village: v }); onChange(); }}>
                <SelectTrigger><SelectValue placeholder="Village" /></SelectTrigger>
                <SelectContent>
                  {villages.map(v => (<SelectItem key={v} value={v}>{v}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-sm">Layer Toggles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {["IFR","CR","CFR","Agricultural Land","Forest Cover","Water Bodies","Homesteads"].map(l => (
              <div key={l} className="flex items-center justify-between">
                <Label className="text-sm">{l}</Label>
                <Switch onCheckedChange={onChange} aria-label={`Toggle ${l}`} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-sm">Tribe Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={onChange as any}>
              <SelectTrigger><SelectValue placeholder="Select Tribe" /></SelectTrigger>
              <SelectContent>
                {["Santal","Gond","Oraon","Munda"].map(t => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-sm">Status Legend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-2"><span className="h-3 w-5 rounded-sm bg-[hsl(var(--status-pending))]" aria-hidden /><span>Pending</span></div>
            <div className="flex items-center gap-2"><span className="h-3 w-5 rounded-sm bg-[hsl(var(--status-granted))]" aria-hidden /><span>Granted</span></div>
            <div className="flex items-center gap-2"><span className="h-3 w-5 rounded-sm bg-[hsl(var(--status-rejected))]" aria-hidden /><span>Rejected</span></div>
            <Separator />
            <Button className="w-full" onClick={onOpenUpload}><Upload className="h-4 w-4 mr-2" /> Upload Document (OCR)</Button>
          </CardContent>
        </Card>
      </ScrollArea>
    </aside>
  );
};
