import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useEffect, useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const OcrUploadModal: React.FC<{ open: boolean; onOpenChange: (v: boolean) => void }>=({ open, onOpenChange }) => {
  const { addHistory, addNotification, addClaim, setOcrDraft } = useApp();
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [stored, setStored] = useState(false);
  const timerRef = useRef<number | null>(null);
  const [name, setName] = useState("Radha Majhi");
  const [village, setVillage] = useState("Badakua");
  const [coordinates, setCoordinates] = useState("18.813, 82.902");
  const [claimType, setClaimType] = useState("IFR");
  const [pattaId, setPattaId] = useState("OD-NEW-" + Date.now());
  const nav = useNavigate();

  useEffect(() => {
    if (!open) {
      if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
      setProgress(0);
      setUploading(false);
      setCompleted(false);
      setStored(false);
      setFiles([]);
      return;
    }
  }, [open]);

  const handleUpload = () => {
    if (files.length === 0) {
      toast({ title: "No file selected", description: "Please choose at least one document to upload." });
      return;
    }
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setProgress(0);
    setCompleted(false);
    setStored(false);
    setUploading(true);
    timerRef.current = window.setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 10);
        if (next === 100 && timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
          setCompleted(true);
          setTimeout(() => {
            setStored(true);
            addHistory({ type: "upload", title: "OCR Completed", description: `${pattaId} stored in Government Records` });
            addNotification({ title: "Document Processed", description: `${pattaId} stored securely` });
            toast({ title: "Processing complete", description: "Extracted data stored in Government Records." });
          }, 300);
        }
        return next;
      });
    }, 900); // 10 steps x 900ms = 9s
  };

  const actionsDisabled = !(completed && stored);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined} className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New Claim Upload (OCR)</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <label htmlFor="ocr-file" className="rounded-md border border-dashed p-6 text-center text-sm cursor-pointer">
            Drag & drop files here, or click to browse
            <input id="ocr-file" type="file" className="sr-only" multiple onChange={(e)=> { const f = Array.from(e.target.files ?? []); setFiles(f); if (f[0]) { const m = f[0].name.match(/[A-Z]{2}-[A-Z]{2}-\d{4}/i); if (m) setPattaId(m[0].toUpperCase()); } }} />
          </label>
          {files.length > 0 && (
            <div className="text-xs text-muted-foreground">
              Selected: {files.map(f=> f.name).join(", ")}
            </div>
          )}
          <div className="flex items-center justify-end">
            <Button onClick={handleUpload} disabled={files.length === 0 || (uploading && !completed)}>Upload</Button>
          </div>

          {uploading && (
            <div className="space-y-2">
              <Label>Processing</Label>
              <Progress value={progress} />
              <div className="flex gap-2 text-xs text-muted-foreground">
                <span className={progress < 33 ? "font-semibold text-foreground" : "text-foreground"}>Uploading</span>
                <span>•</span>
                <span className={progress < 66 ? "font-semibold text-foreground" : "text-foreground"}>OCR</span>
                <span>•</span>
                <span className={progress === 100 ? "font-semibold text-foreground" : "text-foreground"}>Extracted</span>
              </div>
            </div>
          )}

          {stored && (
            <Alert>
              <AlertDescription>
                Extracted data stored in Government Records. You can review and save the claim.
              </AlertDescription>
            </Alert>
          )}

          {completed && (
            <>
              <div className="text-sm font-semibold">Extracted Data</div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <Label>Name</Label>
                  <Input value={name} onChange={(e)=> setName(e.target.value)} />
                </div>
                <div className="grid gap-1">
                  <Label>Village</Label>
                  <Input value={village} onChange={(e)=> setVillage(e.target.value)} />
                </div>
                <div className="grid gap-1">
                  <Label>Coordinates</Label>
                  <Input value={coordinates} onChange={(e)=> setCoordinates(e.target.value)} />
                </div>
                <div className="grid gap-1">
                  <Label>Claim Type</Label>
                  <Input value={claimType} onChange={(e)=> setClaimType(e.target.value)} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <Label>Patta ID</Label>
                  <Input value={pattaId} onChange={(e)=> setPattaId(e.target.value)} />
                </div>
              </div>
            </>
          )}

          <div className="flex items-center justify-end gap-2">
            <Button variant="destructive" disabled={actionsDisabled} onClick={()=>{ toast({ title: "Claim rejected", description: "Marked as rejected." }); addHistory({ type: "status", title: "Claim Rejected", description: "Claim moved to Rejected." }); onOpenChange(false); }}>Reject</Button>
            <Button variant="outline" disabled={actionsDisabled} onClick={()=>{ setOcrDraft({ pattaId, name, village, coordinates, claimType, status: "Pending" }); nav("/patta"); onOpenChange(false); }}>Edit</Button>
            <Button disabled={actionsDisabled} onClick={()=>{ const id = crypto.randomUUID(); addClaim({ id, pattaId, name, village, coordinates, claimType, status: "Pending", createdAt: new Date().toISOString(), source: "ocr" }); toast({ title: "Claim saved", description: `Saved ${pattaId}` }); addHistory({ type: "upload", title: "OCR Accepted", description: `Saved: ${pattaId}` }); addNotification({ title: "New Claim Uploaded", description: `${pattaId} saved` }); onOpenChange(false); nav(`/patta?id=${id}`); }}>Accept</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
