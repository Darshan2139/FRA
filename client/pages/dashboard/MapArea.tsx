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

export interface MapAreaProps {
  onSelectVillage: (id: string) => void;
}

export const MapArea: React.FC<MapAreaProps> = ({ onSelectVillage }) => {
  return (
    <div className="relative w-full h-full min-h-[420px] sm:min-h-[480px] lg:min-h-[620px]">
      {/* Map placeholder */}
      <Card className="absolute inset-0 overflow-hidden shadow">
        <img
          src="/map-dashboard.svg"
          alt="Map background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--border))_1px,_transparent_0)] [background-size:16px_16px]"
          aria-hidden
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <div className="text-center">
            <MapIcon className="h-10 w-10 mx-auto text-muted-foreground" />
            <p className="text-muted-foreground">
              Interactive WebGIS Map (placeholder)
            </p>
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
