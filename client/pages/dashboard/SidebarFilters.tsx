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
  const { selectedState, setSelectedState, location, setLocation, role, selectedTribe, setSelectedTribe, selectedLayers, setSelectedLayers } = useApp();

  // Simple static admin hierarchy for the 4 states
  const admin: Record<string, Record<string, Record<string, string[]>>> = {
    "Madhya Pradesh": {
      Bhopal: {
        Berasia: ["Dongarpur", "Khajuri"],
        Phanda: ["Khajuri Sadak", "Bilkisganj"],
      },
      Indore: {
        Depalpur: ["Machal", "Bardari"],
        Sanwer: ["Paliya", "Kalmer"],
      },
    },
    Tripura: {
      WestTripura: {
        Mohanpur: ["SukantaPalli", "Gakulnagar"],
        Hezamara: ["Durganagar", "Rowa"],
      },
      Gomati: {
        Udaipur: ["Matabari", "Gakulnagar"],
        Killa: ["Gandhacherra", "Bagma"],
      },
    },
    Odisha: {
      Koraput: {
        Boriguma: ["Badakua", "Akkad", "Duduki"],
        Lamtaput: ["Pipili", "Padua"],
      },
      Rayagada: {
        Kashipur: ["Tikiri", "Hadiguda"],
        Gunupur: ["Sanjaguda", "Ramagiri"],
      },
      Mayurbhanj: {
        Baripada: ["Dantiamuhan", "Kundahia"],
        Rairangpur: ["Jashipur", "Bamanghati"],
      },
    },
    Telangana: {
      Hyderabad: {
        Shaikpet: ["Hakeempet", "Golconda"],
        Serilingampally: ["Gopanpally", "Kondapur"],
      },
      Warangal: {
        Parkal: ["Gudur", "Chityal"],
        Narsampet: ["Khanapur", "Chennaraopet"],
      },
    },
  };

  const stateKey = (location.state ?? selectedState) as keyof typeof admin;
  const districtOptions = Object.keys(admin[stateKey] || {});
  const blockOptions = location.district ? Object.keys(admin[stateKey]?.[location.district] || {}) : [];
  const villageOptions = location.district && location.block ? (admin[stateKey]?.[location.district]?.[location.block] || []) : [];

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
              <Select value={location.state ?? selectedState} onValueChange={(v) => {
                // change state and reset dependent fields
                setSelectedState(v as any);
                setLocation({ state: v as any, district: undefined, block: undefined, village: undefined });
                onChange();
              }}>
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
              <Select value={location.district} onValueChange={(v) => {
                // change district and reset block/village
                setLocation({ ...location, district: v, block: undefined, village: undefined });
                onChange();
              }}>
                <SelectTrigger><SelectValue placeholder="District" /></SelectTrigger>
                <SelectContent>
                  {districtOptions.map(d => (<SelectItem key={d} value={d}>{d}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1">
              <Label>Block</Label>
              <Select value={location.block} onValueChange={(v) => {
                // change block and reset village
                setLocation({ ...location, block: v, village: undefined });
                onChange();
              }}>
                <SelectTrigger><SelectValue placeholder="Block" /></SelectTrigger>
                <SelectContent>
                  {blockOptions.map(b => (<SelectItem key={b} value={b}>{b}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1">
              <Label>Village</Label>
              <Select value={location.village} onValueChange={(v) => { setLocation({ ...location, village: v }); onChange(); }}>
                <SelectTrigger><SelectValue placeholder="Village" /></SelectTrigger>
                <SelectContent>
                  {villageOptions.map(v => (<SelectItem key={v} value={v}>{v}</SelectItem>))}
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
                <Switch checked={!!selectedLayers[l]} onCheckedChange={(v) => { setSelectedLayers((prev)=> ({ ...prev, [l]: v })); onChange(); }} aria-label={`Toggle ${l}`} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-sm">Tribe Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedTribe} onValueChange={(v) => { setSelectedTribe(v); onChange(); }}>
              <SelectTrigger><SelectValue placeholder="Select Tribe" /></SelectTrigger>
              <SelectContent>
                {["Santal","Gond","Oraon","Munda"].map(t => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
              </SelectContent>
            </Select>
            <div className="mt-2">
              <Button variant="ghost" size="sm" onClick={() => { setSelectedTribe(undefined); onChange(); }}>Clear Tribe</Button>
            </div>
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
