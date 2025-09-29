import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BreadcrumbBar } from "@/components/layout/BreadcrumbBar";
import { Kpis } from "./dashboard/Kpis";
import { SidebarFilters } from "./dashboard/SidebarFilters";
import { MapArea } from "./dashboard/MapArea";
import { RightDrawer } from "./dashboard/RightDrawer";
import { BottomPanels } from "./dashboard/BottomPanels";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DssModal } from "./dashboard/DssModal";
import { OcrUploadModal } from "./dashboard/OcrUploadModal";
import { RoleActions } from "./dashboard/RoleActions";
import { useApp } from "@/context/AppContext";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedVillage, setSelectedVillage] = useState<string | undefined>();
  const [ocrOpen, setOcrOpen] = useState(false);
  const [dssOpen, setDssOpen] = useState(false);
  const { role, isAuthenticated } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, [loading]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated]);

  // Sync UI with URL params for shareable states
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const v = params.get("village") || undefined;
    const o = params.get("ocr") === "1";
    const d = params.get("dss") === "1";
    if (v) {
      setSelectedVillage(v);
      setDrawerOpen(true);
    }
    setOcrOpen(o);
    setDssOpen(d);
  }, [location.search]);

  const simulateChange = () => setLoading(true);

  const DssMiniPanel = () => (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">DSS: Top Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="flex items-start justify-between gap-3">
        <div className="text-sm">
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Jal Jeevan —{" "}
              <span className="text-xs text-muted-foreground">
                Low water index
              </span>
            </li>
            <li>
              PM Awas —{" "}
              <span className="text-xs text-muted-foreground">
                Kuccha houses
              </span>
            </li>
            <li>
              MGNREGA Ponds —{" "}
              <span className="text-xs text-muted-foreground">
                Forest edge proximity
              </span>
            </li>
          </ul>
        </div>
        <Button size="sm" onClick={() => navigate("/dss")}>
          View
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <BreadcrumbBar />

      <main className="container py-4">
        <div className="mb-3 rounded-lg border bg-gradient-to-r from-primary/10 to-accent/10 p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold">Dashboard</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Badge variant="outline">Role: {role}</Badge>
            <a id="notifications" href="/history" className="text-accent">
              Notifications & Audit trail
            </a>
          </div>
        </div>

        <Kpis loading={loading} />

        <div className="mt-4">
          <RoleActions onOpenUpload={() => setOcrOpen(true)} />
        </div>

        {/* DSS mini panel on mobile/tablet */}
        <div className="mt-4 lg:hidden">
          <DssMiniPanel />
        </div>

        <div className="mt-4 grid grid-rows-[auto_1fr] lg:grid-rows-1 grid-cols-1 lg:grid-cols-[300px_1fr_360px] gap-4 min-h-[520px]">
          {/* Sidebar */}
          <div className="row-span-1">
            <SidebarFilters
              onOpenUpload={() => setOcrOpen(true)}
              onChange={simulateChange}
            />
          </div>

          {/* Map area */}
          <div className="row-span-1">
            <MapArea
              onSelectVillage={(id) => {
                setSelectedVillage(id);
                setDrawerOpen(true);
                const p = new URLSearchParams(location.search);
                p.set("village", id);
                navigate({ search: p.toString() }, { replace: true });
              }}
            />
          </div>

          {/* Right column with DSS mini panel and drawer */}
          <div className="hidden lg:flex flex-col gap-4">
            <DssMiniPanel />
            <RightDrawer
              open={drawerOpen}
              village={selectedVillage}
              onClose={() => {
                setDrawerOpen(false);
                const p = new URLSearchParams(location.search);
                p.delete("village");
                navigate({ search: p.toString() }, { replace: true });
              }}
              onOpenUpload={() => {
                setOcrOpen(true);
                const p = new URLSearchParams(location.search);
                p.set("ocr", "1");
                navigate({ search: p.toString() }, { replace: true });
              }}
              onOpenDss={() => {
                setDssOpen(true);
                const p = new URLSearchParams(location.search);
                p.set("dss", "1");
                navigate({ search: p.toString() }, { replace: true });
              }}
            />
          </div>
        </div>

        <BottomPanels />

        {/* Floating Action */}
        <Button
          className="fixed bottom-6 right-6 shadow-lg h-12 px-5"
          onClick={() => {
            setOcrOpen(true);
            const p = new URLSearchParams(location.search);
            p.set("ocr", "1");
            navigate({ search: p.toString() }, { replace: true });
          }}
        >
          New Claim Upload
        </Button>
      </main>

      <OcrUploadModal
        open={ocrOpen}
        onOpenChange={(v) => {
          setOcrOpen(v);
          const p = new URLSearchParams(location.search);
          if (!v) {
            p.delete("ocr");
          } else {
            p.set("ocr", "1");
          }
          navigate({ search: p.toString() }, { replace: true });
        }}
      />
      <DssModal
        open={dssOpen}
        onOpenChange={(v) => {
          setDssOpen(v);
          const p = new URLSearchParams(location.search);
          if (!v) {
            p.delete("dss");
          } else {
            p.set("dss", "1");
          }
          navigate({ search: p.toString() }, { replace: true });
        }}
      />
    </div>
  );
}
