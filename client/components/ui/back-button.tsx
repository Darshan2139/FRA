import { Button } from "./button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BackButton: React.FC<{ label?: string }>=({ label = "Back" }) => {
  const nav = useNavigate();
  return (
    <Button variant="ghost" size="sm" onClick={()=> nav(-1)} aria-label={label} className="gap-1">
      <ArrowLeft className="h-4 w-4" /> {label}
    </Button>
  );
};
