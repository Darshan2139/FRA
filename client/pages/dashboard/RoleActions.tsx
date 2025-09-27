import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { ClipboardPlus, History as HistoryIcon, Layers, ListChecks, Sparkles, User } from "lucide-react";

export const RoleActions: React.FC<{ onOpenUpload: () => void }> = ({ onOpenUpload }) => {
  const { role } = useApp();
  const nav = useNavigate();

  const items: { key: string; title: string; desc: string; icon: React.ElementType; onClick: () => void; roles: typeof role[] }[] = [
    { key: "queue", title: "Verification Queue", desc: "Process pending claims", icon: ListChecks, onClick: () => nav("/queue"), roles: ["Ministry","District Officer","Forest Dept"] },
    { key: "dss", title: "DSS Recommendations", desc: "See scheme suggestions", icon: Sparkles, onClick: () => nav("/dss"), roles: ["Ministry","District Officer","Forest Dept","NGO"] },
    { key: "upload", title: "New Claim Upload (OCR)", desc: "Scan & extract fields", icon: ClipboardPlus, onClick: onOpenUpload, roles: ["Ministry","District Officer","Forest Dept"] },
    { key: "patta", title: "Digital Patta", desc: "Create or edit digital record", icon: Layers, onClick: () => nav("/patta"), roles: ["Ministry","District Officer"] },
    { key: "history", title: "Notifications & Audit", desc: "All system activity", icon: HistoryIcon, onClick: () => nav("/history"), roles: ["Ministry","District Officer","Forest Dept","NGO"] },
    { key: "profile", title: "Profile", desc: "Role & contact details", icon: User, onClick: () => nav("/profile"), roles: ["Ministry","District Officer","Forest Dept","NGO"] },
  ];

  const visible = items.filter(i => i.roles.includes(role));

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Role Shortcuts</CardTitle>
        <Badge variant="outline">{role}</Badge>
      </CardHeader>
      <CardContent className="grid sm:grid-cols-3 gap-3">
        {visible.map((i) => (
          <button key={i.key} onClick={i.onClick} className="text-left rounded-md border hover:bg-muted/50 transition focus:outline-none focus:ring-2 focus:ring-primary">
            <div className="p-3">
              <div className="flex items-center gap-2 font-medium"><i.icon className="h-4 w-4 text-muted-foreground" /> {i.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{i.desc}</div>
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
