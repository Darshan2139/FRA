import React, { createContext, useContext, useMemo, useState } from "react";

export type Role = "Ministry" | "District Officer" | "Forest Dept" | "NGO";
export type AtlasState = "Madhya Pradesh" | "Tripura" | "Odisha" | "Telangana";

export interface LocationPath {
  state?: AtlasState;
  district?: string;
  block?: string;
  village?: string;
}

<<<<<<< HEAD
export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  ts: string;
  read: boolean;
};
export type HistoryItem = {
  id: string;
  type: "upload" | "status" | "export" | "dss" | "login";
  title: string;
  description: string;
  ts: string;
};
export type ClaimStatus = "Pending" | "Review" | "Approved" | "Rejected";
export interface Claim {
  id: string;
  pattaId: string;
  name: string;
  village: string;
  coordinates: string;
  claimType: string;
  area?: string;
  status: ClaimStatus;
  createdAt: string;
  source: "ocr" | "manual";
  state?: AtlasState;
  tribe?: string;
}
export type WorkflowTask = { patta: string; claimant: string; status: "Pending" | "Review" | "Approved" | "Rejected"; officer?: string };
=======
export type NotificationItem = { id: string; title: string; description: string; ts: string; read: boolean };
export type HistoryItem = { id: string; type: "upload" | "status" | "export" | "dss" | "login"; title: string; description: string; ts: string };
export type ClaimStatus = "Pending" | "Review" | "Approved" | "Rejected";
export interface Claim { id: string; pattaId: string; name: string; village: string; coordinates: string; claimType: string; area?: string; status: ClaimStatus; createdAt: string; source: "ocr" | "manual"; }
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221

interface AppContextType {
  role: Role;
  setRole: (r: Role) => void;
  selectedState: AtlasState;
  setSelectedState: (s: AtlasState) => void;
<<<<<<< HEAD
  selectedTribe?: string;
  setSelectedTribe: (t: string | undefined) => void;
  selectedLayers: Record<string, boolean>;
  setSelectedLayers: (updater: (prev: Record<string, boolean>) => Record<string, boolean>) => void;
=======
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  notifications: number;
  setNotifications: (n: number) => void;
  notificationsList: NotificationItem[];
  setNotificationsList: (n: NotificationItem[]) => void;
<<<<<<< HEAD
  addNotification: (
    n: Omit<NotificationItem, "id" | "ts" | "read"> &
      Partial<Pick<NotificationItem, "read" | "ts">>,
  ) => void;
  history: HistoryItem[];
  addHistory: (
    h: Omit<HistoryItem, "id" | "ts"> & Partial<Pick<HistoryItem, "ts">>,
  ) => void;
  removeHistory: (id: string) => void;
  markAllNotificationsRead: () => void;
  location: LocationPath;
  setLocation: (l: LocationPath) => void;
  workflowTasks: WorkflowTask[];
  addWorkflowTask: (t: WorkflowTask) => void;
  updateWorkflowTask: (patta: string, patch: Partial<WorkflowTask>) => void;
  removeWorkflowTask: (patta: string) => void;
=======
  addNotification: (n: Omit<NotificationItem, "id" | "ts" | "read"> & Partial<Pick<NotificationItem, "read" | "ts">>) => void;
  history: HistoryItem[];
  addHistory: (h: Omit<HistoryItem, "id" | "ts"> & Partial<Pick<HistoryItem, "ts">>) => void;
  markAllNotificationsRead: () => void;
  location: LocationPath;
  setLocation: (l: LocationPath) => void;
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
  claims: Claim[];
  addClaim: (c: Claim) => void;
  updateClaim: (c: Claim) => void;
  removeClaim: (id: string) => void;
  ocrDraft: Partial<Claim> | null;
  setOcrDraft: (d: Partial<Claim> | null) => void;
  isAuthenticated: boolean;
  setAuthenticated: (v: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

<<<<<<< HEAD
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [role, setRole] = useState<Role>("Ministry");
  const [selectedState, setSelectedState] = useState<AtlasState>(() => {
    try {
      return (localStorage.getItem("fra_state") as AtlasState) || "Odisha";
    } catch {
      return "Odisha";
    }
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTribe, setSelectedTribe] = useState<string | undefined>(() => {
    try {
      return localStorage.getItem("fra_selected_tribe") || undefined;
    } catch {
      return undefined;
    }
  });
  const [selectedLayersState, setSelectedLayersState] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem("fra_selected_layers");
      return raw ? JSON.parse(raw) : {
        IFR: false,
        CR: false,
        CFR: false,
        "Agricultural Land": false,
        "Forest Cover": false,
        "Water Bodies": false,
        Homesteads: false,
      };
    } catch {
      return {
        IFR: false,
        CR: false,
        CFR: false,
        "Agricultural Land": false,
        "Forest Cover": false,
        "Water Bodies": false,
        Homesteads: false,
      };
    }
  });
  const [notifications, setNotifications] = useState(0);
  const [notificationsList, setNotificationsList] = useState<
    NotificationItem[]
  >(() => {
    const seed: NotificationItem[] = [
      {
        id: crypto.randomUUID(),
        title: "New OCR Upload",
        description: "Patta OD-PA-0012 uploaded for Badakua",
        ts: new Date().toISOString(),
        read: false,
      },
      {
        id: crypto.randomUUID(),
        title: "DSS Ready",
        description: "Jal Jeevan recommended for Akkad (priority 91)",
        ts: new Date(Date.now() - 3600_000).toISOString(),
        read: false,
      },
      {
        id: crypto.randomUUID(),
        title: "Queue Updated",
        description: "3 claims pending verification in Koraput",
        ts: new Date(Date.now() - 7200_000).toISOString(),
        read: true,
      },
=======
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>("Ministry");
  const [selectedState, setSelectedState] = useState<AtlasState>(() => {
    try { return (localStorage.getItem("fra_state") as AtlasState) || "Odisha"; } catch { return "Odisha"; }
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(0);
  const [notificationsList, setNotificationsList] = useState<NotificationItem[]>(() => {
    const seed: NotificationItem[] = [
      { id: crypto.randomUUID(), title: "New OCR Upload", description: "Patta OD-PA-0012 uploaded for Badakua", ts: new Date().toISOString(), read: false },
      { id: crypto.randomUUID(), title: "DSS Ready", description: "Jal Jeevan recommended for Akkad (priority 91)", ts: new Date(Date.now()-3600_000).toISOString(), read: false },
      { id: crypto.randomUUID(), title: "Queue Updated", description: "3 claims pending verification in Koraput", ts: new Date(Date.now()-7200_000).toISOString(), read: true },
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
    ];
    return seed;
  });
  const [history, setHistory] = useState<HistoryItem[]>(() => [
<<<<<<< HEAD
    {
      id: crypto.randomUUID(),
      type: "login",
      title: "Login",
      description: "User signed in",
      ts: new Date(Date.now() - 10800_000).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      type: "dss",
      title: "DSS Generated",
      description: "Schemes proposed for Akkad",
      ts: new Date(Date.now() - 5400_000).toISOString(),
    },
=======
    { id: crypto.randomUUID(), type: "login", title: "Login", description: "User signed in", ts: new Date(Date.now()-10800_000).toISOString() },
    { id: crypto.randomUUID(), type: "dss", title: "DSS Generated", description: "Schemes proposed for Akkad", ts: new Date(Date.now()-5400_000).toISOString() },
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
  ]);
  const [location, setLocation] = useState<LocationPath>(() => {
    try {
      const raw = localStorage.getItem("fra_location");
      return raw ? JSON.parse(raw) : { state: "Odisha" };
<<<<<<< HEAD
    } catch {
      return { state: "Odisha" };
    }
  });
  const [workflowTasks, setWorkflowTasks] = useState<WorkflowTask[]>(() => {
    try {
      const raw = localStorage.getItem("fra_tasks");
      return raw ? JSON.parse(raw) : [
        { patta: "OD-PA-0012", claimant: "Radha Majhi", status: "Pending", officer: "R. Verma" },
        { patta: "OD-RG-2341", claimant: "B. Soren", status: "Review", officer: "S. Nandi" },
        { patta: "OD-MB-0913", claimant: "A. Das", status: "Approved", officer: "A. Das" },
      ];
    } catch {
      return [
        { patta: "OD-PA-0012", claimant: "Radha Majhi", status: "Pending", officer: "R. Verma" },
        { patta: "OD-RG-2341", claimant: "B. Soren", status: "Review", officer: "S. Nandi" },
        { patta: "OD-MB-0913", claimant: "A. Das", status: "Approved", officer: "A. Das" },
      ];
    }
  });
  const [claims, setClaims] = useState<Claim[]>(() => {
    try {
      const raw = localStorage.getItem("fra_claims");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [ocrDraft, setOcrDraft] = useState<Partial<Claim> | null>(null);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState<boolean>(
    () => {
      try {
        return localStorage.getItem("fra_authed") === "1";
      } catch {
        return false;
      }
    },
  );
=======
    } catch { return { state: "Odisha" }; }
  });
  const [claims, setClaims] = useState<Claim[]>(() => {
    try { const raw = localStorage.getItem("fra_claims"); return raw ? JSON.parse(raw) : []; } catch { return []; }
  });
  const [ocrDraft, setOcrDraft] = useState<Partial<Claim> | null>(null);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState<boolean>(() => {
    try { return localStorage.getItem("fra_authed") === "1"; } catch { return false; }
  });
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
  const setAuthenticated = (v: boolean) => {
    setIsAuthenticatedState(v);
    try {
      if (v) localStorage.setItem("fra_authed", "1");
      else localStorage.removeItem("fra_authed");
    } catch {}
  };

  // persist state & location
<<<<<<< HEAD
  React.useEffect(() => {
    try {
      localStorage.setItem("fra_state", selectedState);
    } catch {}
  }, [selectedState]);
  React.useEffect(() => {
    try {
      if (selectedTribe) localStorage.setItem("fra_selected_tribe", selectedTribe);
      else localStorage.removeItem("fra_selected_tribe");
    } catch {}
  }, [selectedTribe]);
  React.useEffect(() => {
    try {
      localStorage.setItem("fra_selected_layers", JSON.stringify(selectedLayersState));
    } catch {}
  }, [selectedLayersState]);
  React.useEffect(() => {
    try {
      localStorage.setItem("fra_location", JSON.stringify(location));
    } catch {}
  }, [location]);
  React.useEffect(() => {
    try {
      localStorage.setItem("fra_tasks", JSON.stringify(workflowTasks));
    } catch {}
  }, [workflowTasks]);
  React.useEffect(() => {
    try {
      localStorage.setItem("fra_claims", JSON.stringify(claims));
    } catch {}
  }, [claims]);
  React.useEffect(() => {
    const unread = notificationsList.filter((n) => !n.read).length;
=======
  React.useEffect(() => { try { localStorage.setItem("fra_state", selectedState); } catch {} }, [selectedState]);
  React.useEffect(() => { try { localStorage.setItem("fra_location", JSON.stringify(location)); } catch {} }, [location]);
  React.useEffect(() => { try { localStorage.setItem("fra_claims", JSON.stringify(claims)); } catch {} }, [claims]);
  React.useEffect(() => {
    const unread = notificationsList.filter(n => !n.read).length;
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
    setNotifications(unread);
  }, [notificationsList]);

  const addNotification: AppContextType["addNotification"] = (n) => {
    const item: NotificationItem = {
      id: crypto.randomUUID(),
      title: n.title,
      description: n.description,
      ts: n.ts ?? new Date().toISOString(),
      read: n.read ?? false,
    };
    setNotificationsList((prev) => [item, ...prev]);
  };
  const markAllNotificationsRead = () => {
<<<<<<< HEAD
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })));
=======
    setNotificationsList((prev) => prev.map(n => ({ ...n, read: true })));
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
  };
  const addHistory: AppContextType["addHistory"] = (h) => {
    const item: HistoryItem = {
      id: crypto.randomUUID(),
      type: h.type,
      title: h.title,
      description: h.description,
      ts: h.ts ?? new Date().toISOString(),
    };
    setHistory((prev) => [item, ...prev]);
  };
<<<<<<< HEAD
  const removeHistory: AppContextType["removeHistory"] = (id) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  };

  const addWorkflowTask: AppContextType["addWorkflowTask"] = (t) =>
    setWorkflowTasks((prev) => [t, ...prev]);
  const updateWorkflowTask: AppContextType["updateWorkflowTask"] = (patta, patch) =>
    setWorkflowTasks((prev) => prev.map((t) => (t.patta === patta ? { ...t, ...patch } : t)));
  const removeWorkflowTask: AppContextType["removeWorkflowTask"] = (patta) =>
    setWorkflowTasks((prev) => prev.filter((t) => t.patta !== patta));

  const addClaim: AppContextType["addClaim"] = (c) =>
    setClaims((prev) => [c, ...prev]);
  const updateClaim: AppContextType["updateClaim"] = (c) =>
    setClaims((prev) => prev.map((i) => (i.id === c.id ? c : i)));
  const removeClaim: AppContextType["removeClaim"] = (id) =>
    setClaims((prev) => prev.filter((i) => i.id !== id));

  const value = useMemo(
    () => ({
      role,
      setRole,
      selectedState,
      setSelectedState,
      selectedTribe,
      setSelectedTribe,
      selectedLayers: selectedLayersState,
      setSelectedLayers: (updater: (prev: Record<string, boolean>) => Record<string, boolean>) =>
        setSelectedLayersState((prev) => updater(prev)),
      searchQuery,
      setSearchQuery,
      notifications,
      setNotifications,
      notificationsList,
      setNotificationsList,
      addNotification,
      history,
      addHistory,
      removeHistory,
      markAllNotificationsRead,
      location,
      setLocation,
      workflowTasks,
      addWorkflowTask,
      updateWorkflowTask,
      removeWorkflowTask,
      claims,
      addClaim,
      updateClaim,
      removeClaim,
      ocrDraft,
      setOcrDraft,
      isAuthenticated: isAuthenticatedState,
      setAuthenticated,
    }),
    [
      role,
      selectedState,
      selectedTribe,
      selectedLayersState,
      searchQuery,
      notifications,
      notificationsList,
      history,
      location,
      workflowTasks,
      claims,
      ocrDraft,
      isAuthenticatedState,
    ],
=======

  const addClaim: AppContextType["addClaim"] = (c) => setClaims((prev) => [c, ...prev]);
  const updateClaim: AppContextType["updateClaim"] = (c) => setClaims((prev) => prev.map((i) => (i.id === c.id ? c : i)));
  const removeClaim: AppContextType["removeClaim"] = (id) => setClaims((prev) => prev.filter((i) => i.id !== id));

  const value = useMemo(
    () => ({ role, setRole, selectedState, setSelectedState, searchQuery, setSearchQuery, notifications, setNotifications, notificationsList, setNotificationsList, addNotification, history, addHistory, markAllNotificationsRead, location, setLocation, claims, addClaim, updateClaim, removeClaim, ocrDraft, setOcrDraft, isAuthenticated: isAuthenticatedState, setAuthenticated }),
    [role, selectedState, searchQuery, notifications, notificationsList, history, location, claims, ocrDraft, isAuthenticatedState]
>>>>>>> 6548e770c42125b862edafd3fcf9a3601e227221
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
