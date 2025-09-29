import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Download,
  Layers,
  Map as MapIcon,
  Maximize2,
  Minus,
  Move,
  Plus,
  Ruler,
  Square,
  Sun,
} from "lucide-react";
import React from "react";
import { toast } from "@/hooks/use-toast";
import { useApp } from "@/context/AppContext";

export interface MapAreaProps {
  onSelectVillage: (id: string) => void;
}

function latLonToPercent(lat: number, lon: number) {
  const LAT_MIN = 7.0;
  const LAT_MAX = 37.0;
  const LON_MIN = 68.0;
  const LON_MAX = 97.0;
  const xPct = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * 100;
  const yPct = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 100;
  return { xPct: Math.min(100, Math.max(0, xPct)), yPct: Math.min(100, Math.max(0, yPct)) };
}

export const MapArea: React.FC<MapAreaProps> = ({ onSelectVillage }) => {
  const { claims, selectedState } = useApp();

  const markers = React.useMemo(() => {
    return claims
      .filter((c) => !c.state || c.state === selectedState)
      .map((c) => {
        const m = /(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/.exec(c.coordinates || "");
        if (!m) return null;
        const lat = parseFloat(m[1]);
        const lon = parseFloat(m[2]);
        if (Number.isNaN(lat) || Number.isNaN(lon)) return null;
        const { xPct, yPct } = latLonToPercent(lat, lon);
        return { id: c.id, pattaId: c.pattaId, name: c.name, xPct, yPct };
      })
      .filter(Boolean) as { id: string; pattaId: string; name: string; xPct: number; yPct: number }[];
  }, [claims, selectedState]);

  return (
    <div className="relative w-full h-full min-h-[420px] sm:min-h-[480px] lg:min-h-[620px]">
      {/* Map placeholder */}
      <Card className="absolute inset-0 overflow-hidden shadow">
        <iframe
          title="Basemap"
          className="absolute inset-0 w-full h-full"
          src={`https://api.maptiler.com/maps/streets/?key=${import.meta.env.VITE_MAPTILER_KEY}#5.2/20.59/78.96`}
          loading="lazy"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--border))_1px,_transparent_0)] [background-size:16px_16px]"
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <div className="text-center">
            <MapIcon className="h-10 w-10 mx-auto text-muted-foreground" />
            <p className="text-muted-foreground">Interactive WebGIS Map</p>
          </div>
        </div>

        {/* Fake polygons */}
        <button
          aria-label="Village Badakua"
          className={cn(
            "absolute left-[20%] top-[30%] w-40 h-28",
            "[clip-path:polygon(0%_20%,20%_0,100%_10%,90%_80%,10%_100%)] bg-primary/30 border border-primary/60 hover:bg-primary/40 transition",
          )}
          onClick={() => onSelectVillage("badakua")}
        />
        <button
          aria-label="Village Akkad"
          className={cn(
            "absolute left-[50%] top-[50%] w-48 h-36",
            "[clip-path:polygon(10%_0,100%_15%,80%_100%,0_90%)] bg-[hsl(var(--status-granted))]/30 border border-[hsl(var(--status-granted))]/60 hover:opacity-90 transition",
          )}
          onClick={() => onSelectVillage("akkad")}
        />
        <button
          aria-label="Village Duduki"
          className={cn(
            "absolute left-[65%] top-[20%] w-40 h-28",
            "[clip-path:polygon(0_0,100%_0,100%_70%,50%_100%,0_70%)] bg-[hsl(var(--status-pending))]/30 border border-[hsl(var(--status-pending))]/60 hover:opacity-90 transition",
          )}
          onClick={() => onSelectVillage("duduki")}
        />
      </Card>

      {/* Controls */}
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        <div className="rounded-md border bg-card/95 backdrop-blur shadow">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Zoom in"
            className="rounded-none"
            onClick={() =>
              toast({ title: "Zoom in", description: "Zoomed in." })
            }
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Separator />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Zoom out"
            className="rounded-none"
            onClick={() =>
              toast({ title: "Zoom out", description: "Zoomed out." })
            }
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
        <div
          className="rounded-md border bg-card/95 backdrop-blur shadow p-1 flex flex-col gap-1"
          aria-label="Map tools"
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="Basemap"
            onClick={() =>
              toast({ title: "Basemap", description: "Basemap switched." })
            }
          >
            <Sun className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Measure"
            onClick={() =>
              toast({ title: "Measure", description: "Measurement started." })
            }
          >
            <Ruler className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Draw Geometry"
            onClick={() =>
              toast({ title: "Draw", description: "Draw mode enabled." })
            }
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Export Geometry"
            onClick={() =>
              toast({ title: "Export", description: "Geometry export queued." })
            }
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        className="absolute top-3 right-3 rounded-md border bg-card/95 backdrop-blur shadow p-1"
        aria-label="Layers"
      >
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={() =>
            toast({ title: "Layers", description: "Open layers panel." })
          }
        >
          <Layers className="h-4 w-4" /> Layers
        </Button>
      </div>
      <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md border bg-card/95 backdrop-blur shadow px-3 py-1.5 text-xs">
        <span className="font-semibold">Lat:</span> 18.813°N{" "}
        <span className="mx-1">|</span>{" "}
        <span className="font-semibold">Lon:</span> 82.902°E{" "}
        <span className="mx-1">|</span>{" "}
        <span className="font-semibold">Alt:</span> 870 m
      </div>
      <div className="absolute bottom-3 right-3 hidden md:flex items-center gap-2 rounded-md border bg-card/95 backdrop-blur shadow px-3 py-1.5 text-xs text-muted-foreground">
        <Move className="h-3.5 w-3.5" /> Drag, zoom, and click polygons to open
        details
      </div>
    </div>
  );
};
