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
  const { claims, selectedState, selectedTribe, selectedLayers, location } = useApp();
  const [mapStyle, setMapStyle] = React.useState<string>("streets");
  const [zoom, setZoom] = React.useState<number>(6);
  const [centerState, setCenterState] = React.useState<{ lat: number; lon: number }>({ lat: 20.59, lon: 78.96 });
  const [isDrawing, setIsDrawing] = React.useState<boolean>(false);
  const [isMeasuring, setIsMeasuring] = React.useState<boolean>(false);
  const [measurePts, setMeasurePts] = React.useState<{ xPct: number; yPct: number }[]>([]);
  const [rectangles, setRectangles] = React.useState<{ id: string; x: number; y: number; w: number; h: number }[]>([]);
  const dragRef = React.useRef<{ startX: number; startY: number; active: boolean } | null>(null);

  const stateCenters: Record<string, { lat: number; lon: number; zoom: number }> = {
    "Madhya Pradesh": { lat: 23.5, lon: 78.5, zoom: 6.0 },
    Tripura: { lat: 23.8, lon: 91.6, zoom: 7.0 },
    Odisha: { lat: 20.3, lon: 85.8, zoom: 6.4 },
    Telangana: { lat: 18.1, lon: 79.0, zoom: 6.6 },
  };
  const districtCenters: Record<string, Record<string, { lat: number; lon: number }>> = {
    "Madhya Pradesh": {
      Bhopal: { lat: 23.2599, lon: 77.4126 },
      Indore: { lat: 22.7196, lon: 75.8577 },
    },
    Tripura: {
      WestTripura: { lat: 23.84, lon: 91.27 },
      Gomati: { lat: 23.5, lon: 91.6 },
    },
    Odisha: {
      Koraput: { lat: 18.811, lon: 82.72 },
      Rayagada: { lat: 19.17, lon: 83.41 },
      Mayurbhanj: { lat: 21.94, lon: 86.73 },
    },
    Telangana: {
      Hyderabad: { lat: 17.385, lon: 78.4867 },
      Warangal: { lat: 17.9689, lon: 79.5941 },
    },
  };
  const blockCenters: Record<string, Record<string, { lat: number; lon: number }>> = {
    Odisha: {
      Boriguma: { lat: 18.83, lon: 82.57 },
      Lamtaput: { lat: 18.30, lon: 82.20 },
      Kashipur: { lat: 19.25, lon: 83.26 },
      Gunupur: { lat: 19.08, lon: 83.81 },
      Baripada: { lat: 21.94, lon: 86.73 },
      Rairangpur: { lat: 22.42, lon: 86.82 },
    },
    "Madhya Pradesh": {
      Berasia: { lat: 23.63, lon: 77.43 },
      Phanda: { lat: 23.16, lon: 77.38 },
      Depalpur: { lat: 22.85, lon: 75.54 },
      Sanwer: { lat: 22.82, lon: 75.83 },
    },
    Tripura: {
      Mohanpur: { lat: 23.94, lon: 91.36 },
      Hezamara: { lat: 24.0, lon: 91.43 },
      Udaipur: { lat: 23.53, lon: 91.48 },
      Killa: { lat: 23.43, lon: 91.58 },
    },
    Telangana: {
      Shaikpet: { lat: 17.41, lon: 78.40 },
      Serilingampally: { lat: 17.47, lon: 78.34 },
      Parkal: { lat: 18.24, lon: 79.57 },
      Narsampet: { lat: 17.93, lon: 79.9 },
    },
  };

  const desiredCenter = React.useMemo(() => {
    // 1) If village selected and we have claims in that village, center to them (case-insensitive)
    if (location.village) {
      const vLc = location.village.toLowerCase();
      const villageClaims = claims.filter(
        (c) => (!c.state || c.state === selectedState) && c.village && c.village.toLowerCase() === vLc,
      );
      const coords = villageClaims
        .map((c) => {
          const m = /(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/.exec(c.coordinates || "");
          if (!m) return null;
          const lat = parseFloat(m[1]);
          const lon = parseFloat(m[2]);
          if (Number.isNaN(lat) || Number.isNaN(lon)) return null;
          return { lat, lon };
        })
        .filter(Boolean) as { lat: number; lon: number }[];
      if (coords.length > 0) {
        const lat = coords.reduce((a, b) => a + b.lat, 0) / coords.length;
        const lon = coords.reduce((a, b) => a + b.lon, 0) / coords.length;
        return { lat, lon, zoom: 9.0 };
      }
      // fallback to predefined village centers when no claim coords found
      const villageCenters: Record<string, Record<string, Record<string, Record<string, { lat: number; lon: number }>>>> = {
        Odisha: {
          Koraput: {
            Boriguma: {
              Badakua: { lat: 18.813, lon: 82.902 },
              Akkad: { lat: 18.86, lon: 82.87 },
              Duduki: { lat: 18.79, lon: 82.94 },
            },
            Lamtaput: {
              Pipili: { lat: 18.26, lon: 82.31 },
              Padua: { lat: 18.42, lon: 82.27 },
            },
          },
          Rayagada: {
            Kashipur: {
              Tikiri: { lat: 19.19, lon: 83.15 },
              Hadiguda: { lat: 19.28, lon: 83.37 },
            },
            Gunupur: {
              Sanjaguda: { lat: 19.08, lon: 83.77 },
              Ramagiri: { lat: 18.97, lon: 83.8 },
            },
          },
          Mayurbhanj: {
            Baripada: {
              Dantiamuhan: { lat: 21.91, lon: 86.78 },
              Kundahia: { lat: 21.94, lon: 86.69 },
            },
            Rairangpur: {
              Jashipur: { lat: 21.96, lon: 86.11 },
              Bamanghati: { lat: 22.22, lon: 86.31 },
            },
          },
        },
        "Madhya Pradesh": {
          Bhopal: {
            Berasia: {
              Dongarpur: { lat: 23.67, lon: 77.49 },
              Khajuri: { lat: 23.61, lon: 77.41 },
            },
            Phanda: {
              "Khajuri Sadak": { lat: 23.12, lon: 77.35 },
              Bilkisganj: { lat: 23.02, lon: 77.29 },
            },
          },
          Indore: {
            Depalpur: {
              Machal: { lat: 22.83, lon: 75.62 },
              Bardari: { lat: 22.68, lon: 75.79 },
            },
            Sanwer: {
              Paliya: { lat: 22.86, lon: 75.85 },
              Kalmer: { lat: 22.89, lon: 75.74 },
            },
          },
        },
        Tripura: {
          WestTripura: {
            Mohanpur: {
              SukantaPalli: { lat: 23.96, lon: 91.35 },
              Gakulnagar: { lat: 23.89, lon: 91.37 },
            },
            Hezamara: {
              Durganagar: { lat: 24.03, lon: 91.45 },
              Rowa: { lat: 24.06, lon: 91.49 },
            },
          },
          Gomati: {
            Udaipur: {
              Matabari: { lat: 23.53, lon: 91.49 },
              Gakulnagar: { lat: 23.57, lon: 91.48 },
            },
            Killa: {
              Gandhacherra: { lat: 23.47, lon: 91.59 },
              Bagma: { lat: 23.43, lon: 91.57 },
            },
          },
        },
        Telangana: {
          Hyderabad: {
            Shaikpet: {
              Hakeempet: { lat: 17.44, lon: 78.39 },
              Golconda: { lat: 17.38, lon: 78.4 },
            },
            Serilingampally: {
              Gopanpally: { lat: 17.46, lon: 78.32 },
              Kondapur: { lat: 17.47, lon: 78.36 },
            },
          },
          Warangal: {
            Parkal: {
              Gudur: { lat: 18.24, lon: 79.62 },
              Chityal: { lat: 18.2, lon: 79.48 },
            },
            Narsampet: {
              Khanapur: { lat: 17.98, lon: 79.86 },
              Chennaraopet: { lat: 18.01, lon: 79.78 },
            },
          },
        },
      };
      const s = villageCenters[selectedState as keyof typeof villageCenters];
      const d = s && location.district ? s[location.district] : undefined;
      const b = d && location.block ? d[location.block] : undefined;
      const v = b && location.village ? b[location.village] : undefined;
      if (v) return { ...v, zoom: 10.0 };
    }
    // 2) If block selected, use predefined block center
    if (location.block) {
      const b = blockCenters[selectedState]?.[location.block];
      if (b) return { ...b, zoom: 8.0 };
    }
    // 3) If district selected, use predefined district center
    if (location.district) {
      const d = districtCenters[selectedState]?.[location.district];
      if (d) return { ...d, zoom: 7.0 };
    }
    // 4) Fallback to state center
    return stateCenters[selectedState] || { lat: 20.59, lon: 78.96, zoom: 5.2 };
  }, [claims, location.block, location.district, location.village, selectedState]);

  // keep local zoom/center in sync with desired center
  React.useEffect(() => {
    setCenterState({ lat: desiredCenter.lat, lon: desiredCenter.lon });
    setZoom(desiredCenter.zoom);
  }, [desiredCenter.lat, desiredCenter.lon, desiredCenter.zoom]);

  const markers = React.useMemo(() => {
    const selectedVillageLc = location.village?.toLowerCase();
    return claims
      .filter((c) => (!c.state || c.state === selectedState)
        && (!selectedTribe || c.tribe === selectedTribe)
        && (!selectedVillageLc || (c.village && c.village.toLowerCase() === selectedVillageLc)))
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
  }, [claims, selectedState, selectedTribe, location.village]);

  return (
    <div className="relative w-full h-full min-h-[420px] sm:min-h-[480px] lg:min-h-[620px]">
      {/* Map placeholder */}
      <Card className="absolute inset-0 overflow-hidden shadow">
        <iframe
          title="Basemap"
          className="absolute inset-0 w-full h-full"
          src={`https://api.maptiler.com/maps/${mapStyle}/?key=${import.meta.env.VITE_MAPTILER_KEY}#${zoom.toFixed(1)}/${centerState.lat.toFixed(4)}/${centerState.lon.toFixed(4)}`}
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

        {/* Simple visual overlays standing in for layers */}
        {selectedLayers?.["Forest Cover"] && (
          <div
            aria-label="Forest Cover overlay"
            className="absolute left-[10%] top-[15%] w-[30%] h-[25%] bg-green-500/10 border border-green-500/50"
          />
        )}
        {selectedLayers?.["Water Bodies"] && (
          <div
            aria-label="Water Bodies overlay"
            className="absolute left-[48%] top-[12%] w-[22%] h-[18%] bg-blue-500/10 border border-blue-500/50"
          />
        )}
        {selectedLayers?.["Agricultural Land"] && (
          <div
            aria-label="Agricultural Land overlay"
            className="absolute left-[22%] top-[55%] w-[36%] h-[22%] bg-yellow-500/10 border border-yellow-500/50"
          />
        )}

        {/* Rights layers */}
        {selectedLayers?.["IFR"] && (
          <div
            aria-label="IFR overlay"
            className="absolute left-[12%] top-[38%] w-[28%] h-[18%] bg-emerald-500/10 border border-emerald-500/60 [clip-path:polygon(0_20%,15%_0,100%_10%,85%_100%,5%_85%)]"
          />
        )}
        {selectedLayers?.["CR"] && (
          <div
            aria-label="CR overlay"
            className="absolute left-[48%] top-[36%] w-[30%] h-[20%] bg-orange-500/10 border border-orange-500/60 [clip-path:polygon(5%_0,95%_10%,80%_100%,0_85%)]"
          />
        )}
        {selectedLayers?.["CFR"] && (
          <div
            aria-label="CFR overlay"
            className="absolute left-[35%] top-[20%] w-[22%] h-[16%] bg-fuchsia-500/10 border border-fuchsia-500/60 [clip-path:polygon(0_0,100%_0,100%_60%,50%_100%,0_60%)]"
          />
        )}

        {/* Homesteads as point-like clusters */}
        {selectedLayers?.["Homesteads"] && (
          <>
            <span className="absolute left-[28%] top-[42%] w-2 h-2 rounded-sm bg-stone-600/80 border border-white/60" aria-label="Homestead" />
            <span className="absolute left-[30%] top-[44%] w-2 h-2 rounded-sm bg-stone-600/80 border border-white/60" />
            <span className="absolute left-[32%] top-[41%] w-2 h-2 rounded-sm bg-stone-600/80 border border-white/60" />
            <span className="absolute left-[50%] top-[60%] w-2 h-2 rounded-sm bg-stone-600/80 border border-white/60" />
            <span className="absolute left-[52%] top-[62%] w-2 h-2 rounded-sm bg-stone-600/80 border border-white/60" />
          </>
        )}

        {/* Drawn rectangles (simple geometry) */}
        {rectangles.map((r) => (
          <div
            key={r.id}
            className="absolute border-2 border-primary/80 bg-primary/10"
            style={{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%` }}
          />
        ))}

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
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
        <div className="rounded-md border bg-card/95 backdrop-blur shadow">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Zoom in"
            title="Zoom in"
            className="rounded-none"
            onClick={() => setZoom((z) => Math.min(14, z + 0.5))}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Separator />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Zoom out"
            title="Zoom out"
            className="rounded-none"
            onClick={() => setZoom((z) => Math.max(3, z - 0.5))}
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
            title={`Change basemap (current: ${mapStyle})`}
            className={cn(mapStyle !== "streets" && "bg-primary/10 text-primary")}
            aria-pressed={mapStyle !== "streets"}
            onClick={() => setMapStyle((s) => (s === "streets" ? "satellite" : s === "satellite" ? "outdoor" : "streets"))}
          >
            <Sun className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Measure"
            title="Measure distance (click two points)"
            className={cn(isMeasuring && "bg-primary/10 text-primary ring-1 ring-primary")}
            aria-pressed={isMeasuring}
            onClick={() => { setIsMeasuring((m) => !m); setIsDrawing(false); setMeasurePts([]); }}
          >
            <Ruler className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Draw Geometry"
            title="Draw rectangle"
            className={cn(isDrawing && "bg-primary/10 text-primary ring-1 ring-primary")}
            aria-pressed={isDrawing}
            onClick={() => { setIsDrawing((d) => !d); setIsMeasuring(false); setMeasurePts([]); setRectangles((prev) => prev.map((p) => (p.id === "temp" ? { ...p, id: crypto.randomUUID() } : p))); }}
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Export Geometry"
            title="Export drawn shapes (GeoJSON)"
            onClick={() => {
              // export rectangles as GeoJSON in approximate lat/lon using India bbox
              const LAT_MIN = 7.0, LAT_MAX = 37.0, LON_MIN = 68.0, LON_MAX = 97.0;
              const toLat = (yPct: number) => LAT_MAX - (yPct / 100) * (LAT_MAX - LAT_MIN);
              const toLon = (xPct: number) => LON_MIN + (xPct / 100) * (LON_MAX - LON_MIN);
              const shapes = rectangles.filter((r) => r.id !== "temp");
              if (shapes.length === 0) { toast({ title: "Nothing to export", description: "Draw a rectangle first." }); return; }
              const features = shapes.map((r) => {
                const x1 = r.x, y1 = r.y, x2 = r.x + r.w, y2 = r.y + r.h;
                const ring = [
                  [toLon(x1), toLat(y1)],
                  [toLon(x2), toLat(y1)],
                  [toLon(x2), toLat(y2)],
                  [toLon(x1), toLat(y2)],
                  [toLon(x1), toLat(y1)],
                ];
                return { type: "Feature", properties: { id: r.id, kind: "rectangle" }, geometry: { type: "Polygon", coordinates: [ring] } };
              });
              const geojson = { type: "FeatureCollection", features } as const;
              const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: "application/geo+json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url; a.download = "drawn-geometries.geojson"; a.click();
              URL.revokeObjectURL(url);
            }}
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
          title="Open layers"
          onClick={() =>
            toast({ title: "Layers", description: "Open layers panel." })
          }
        >
          <Layers className="h-4 w-4" /> Layers
        </Button>
      </div>

      {markers.map((m) => (
        <button
          key={m.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-primary ring-2 ring-white shadow"
          style={{ left: `${m.xPct}%`, top: `${m.yPct}%` }}
          aria-label={`Claim ${m.pattaId} — ${m.name}`}
          onClick={() => toast({ title: m.pattaId, description: m.name })}
        />
      ))}

      {/* Interaction overlay for draw/measure */}
      <div
        className={cn("absolute inset-0", !(isDrawing || isMeasuring) && "pointer-events-none", isDrawing && "cursor-crosshair", isMeasuring && "cursor-crosshair")}
        onMouseDown={(e) => {
          if (!isDrawing) return;
          const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          const startX = ((e.clientX - rect.left) / rect.width) * 100;
          const startY = ((e.clientY - rect.top) / rect.height) * 100;
          dragRef.current = { startX, startY, active: true };
        }}
        onMouseMove={(e) => {
          if (!isDrawing || !dragRef.current?.active) return;
          const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          const curX = ((e.clientX - rect.left) / rect.width) * 100;
          const curY = ((e.clientY - rect.top) / rect.height) * 100;
          const x = Math.min(dragRef.current.startX, curX);
          const y = Math.min(dragRef.current.startY, curY);
          const w = Math.abs(curX - dragRef.current.startX);
          const h = Math.abs(curY - dragRef.current.startY);
          // render a temp rectangle as the last item with id temp
          setRectangles((prev) => {
            const others = prev.filter((p) => p.id !== "temp");
            return [...others, { id: "temp", x, y, w, h }];
          });
        }}
        onMouseUp={() => {
          if (!isDrawing || !dragRef.current?.active) return;
          dragRef.current.active = false;
          setRectangles((prev) => prev.map((p) => (p.id === "temp" ? { ...p, id: crypto.randomUUID() } : p)));
        }}
        onMouseLeave={() => {
          if (!isDrawing) return;
          setRectangles((prev) => prev.map((p) => (p.id === "temp" ? { ...p, id: crypto.randomUUID() } : p)));
          if (dragRef.current) dragRef.current.active = false;
        }}
        onClick={(e) => {
          if (!isMeasuring) return;
          const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          const xPct = ((e.clientX - rect.left) / rect.width) * 100;
          const yPct = ((e.clientY - rect.top) / rect.height) * 100;
          setMeasurePts((pts) => {
            const next = [...pts, { xPct, yPct }];
            if (next.length === 2) {
              const LAT_MIN = 7.0, LAT_MAX = 37.0, LON_MIN = 68.0, LON_MAX = 97.0;
              const toLat = (yy: number) => LAT_MAX - (yy / 100) * (LAT_MAX - LAT_MIN);
              const toLon = (xx: number) => LON_MIN + (xx / 100) * (LON_MAX - LON_MIN);
              const A = { lat: toLat(next[0].yPct), lon: toLon(next[0].xPct) };
              const B = { lat: toLat(next[1].yPct), lon: toLon(next[1].xPct) };
              const R = 6371;
              const toRad = (d: number) => (d * Math.PI) / 180;
              const dLat = toRad(B.lat - A.lat), dLon = toRad(B.lon - A.lon);
              const a = Math.sin(dLat/2)**2 + Math.cos(toRad(A.lat))*Math.cos(toRad(B.lat))*Math.sin(dLon/2)**2;
              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
              const dist = R * c;
              toast({ title: "Distance", description: `${dist.toFixed(2)} km` });
              return [];
            }
            return next;
          });
        }}
      />

      {/* Small status chips to show active tool and basemap */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md border bg-card/95 backdrop-blur shadow px-3 py-1.5 text-xs">
        <span className={cn("px-1.5 py-0.5 rounded", isDrawing ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>Draw: {isDrawing ? "On" : "Off"}</span>
        <span className={cn("px-1.5 py-0.5 rounded", isMeasuring ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>Measure: {isMeasuring ? "On" : "Off"}</span>
        <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">Basemap: {mapStyle}</span>
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
