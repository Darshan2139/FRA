import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useApp } from "@/context/AppContext";
import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/back-button";
import { toast } from "@/hooks/use-toast";

function useQuery() { const { search } = useLocation(); return useMemo(()=> new URLSearchParams(search), [search]); }

export default function DigitalPatta() {
  const { claims, addClaim, updateClaim, ocrDraft, setOcrDraft, addHistory, addNotification } = useApp();
  const q = useQuery();
  const id = q.get("id");
  const existing = claims.find(c => c.id === id);
  const nav = useNavigate();

  const [pattaId, setPattaId] = useState(existing?.pattaId || ocrDraft?.pattaId || "");
  const [name, setName] = useState(existing?.name || ocrDraft?.name || "");
  const [village, setVillage] = useState(existing?.village || ocrDraft?.village || "");
  const [coordinates, setCoordinates] = useState(existing?.coordinates || ocrDraft?.coordinates || "");
  const [claimType, setClaimType] = useState(existing?.claimType || ocrDraft?.claimType || "");
  const [area, setArea] = useState(existing?.area || "");
  const [status, setStatus] = useState(existing?.status || (ocrDraft?.status as any) || "Pending");

  useEffect(()=> { if (existing) setOcrDraft(null); }, [existing]);

  const save = () => {
    if (!pattaId || !name) { toast({ title: "Missing data", description: "Patta ID and Name are required" }); return; }
    if (existing) {
      const updated = { ...existing, pattaId, name, village, coordinates, claimType, area, status } as typeof existing;
      updateClaim(updated);
      addHistory({ type: "status", title: "Claim Updated", description: pattaId });
      toast({ title: "Updated", description: pattaId });
    } else {
      const newId = crypto.randomUUID();
      addClaim({ id: newId, pattaId, name, village, coordinates, claimType, area, status: status as any, createdAt: new Date().toISOString(), source: ocrDraft ? "ocr" : "manual" });
      addNotification({ title: "New Digital Patta", description: pattaId });
      addHistory({ type: "upload", title: "Digital Patta Saved", description: pattaId });
      setOcrDraft(null);
      nav(`/patta?id=${newId}`);
      toast({ title: "Saved", description: pattaId });
    }
  };

  return (
    <main className="container py-8 grid lg:grid-cols-[1fr_380px] gap-6">
      <div>
        <div className="-mt-2 mb-4 flex items-center justify-between">
          <BackButton />
          <Button variant="outline" onClick={()=> nav("/queue")}>Open Queue</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{existing ? "Digital Patta" : "New Digital Patta"}</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <div className="grid gap-1"><Label>Patta ID</Label><Input value={pattaId} onChange={(e)=> setPattaId(e.target.value)} /></div>
            <div className="grid gap-1"><Label>Name</Label><Input value={name} onChange={(e)=> setName(e.target.value)} /></div>
            <div className="grid gap-1"><Label>Village</Label><Input value={village} onChange={(e)=> setVillage(e.target.value)} /></div>
            <div className="grid gap-1"><Label>Coordinates</Label><Input value={coordinates} onChange={(e)=> setCoordinates(e.target.value)} /></div>
            <div className="grid gap-1"><Label>Claim Type</Label><Input value={claimType} onChange={(e)=> setClaimType(e.target.value)} /></div>
            <div className="grid gap-1"><Label>Area (ha)</Label><Input value={area} onChange={(e)=> setArea(e.target.value)} /></div>
            <div className="grid gap-1"><Label>Status</Label><Input value={status} onChange={(e)=> setStatus(e.target.value as any)} /></div>
            <div className="grid gap-1 sm:col-span-2"><Label>Attach Scans</Label><Input type="file" multiple /></div>
            <div className="sm:col-span-2 flex items-center justify-end gap-2"><Button variant="outline" onClick={()=> nav(-1)}>Cancel</Button><Button onClick={save}>Save</Button></div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patta</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((c)=> (
                <TableRow key={c.id} onClick={()=> nav(`/patta?id=${c.id}`)} className="cursor-pointer">
                  <TableCell>{c.pattaId}</TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
