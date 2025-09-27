import React, { createContext, useContext, useMemo, useState } from "react";

export type Role = "Ministry" | "District Officer" | "Forest Dept" | "NGO";
export type AtlasState = "Madhya Pradesh" | "Tripura" | "Odisha" | "Telangana";

export interface LocationPath {
  state?: AtlasState;
  district?: string;
  block?: string;
  village?: string;
}

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
}

interface AppContextType {
  role: Role;
  setRole: (r: Role) => void;
  selectedState: AtlasState;
  setSelectedState: (s: AtlasState) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  notifications: number;
  setNotifications: (n: number) => void;
  notificationsList: NotificationItem[];
  setNotificationsList: (n: NotificationItem[]) => void;
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
    ];
    return seed;
  });
  const [history, setHistory] = useState<HistoryItem[]>(() => [
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
  ]);
  const [location, setLocation] = useState<LocationPath>(() => {
    try {
      const raw = localStorage.getItem("fra_location");
      return raw ? JSON.parse(raw) : { state: "Odisha" };
    } catch {
      return { state: "Odisha" };
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
  const setAuthenticated = (v: boolean) => {
    setIsAuthenticatedState(v);
    try {
      if (v) localStorage.setItem("fra_authed", "1");
      else localStorage.removeItem("fra_authed");
    } catch {}
  };

  // persist state & location
  React.useEffect(() => {
    try {
      localStorage.setItem("fra_state", selectedState);
    } catch {}
  }, [selectedState]);
  React.useEffect(() => {
    try {
      localStorage.setItem("fra_location", JSON.stringify(location));
    } catch {}
  }, [location]);
  React.useEffect(() => {
    try {
      localStorage.setItem("fra_claims", JSON.stringify(claims));
    } catch {}
  }, [claims]);
  React.useEffect(() => {
    const unread = notificationsList.filter((n) => !n.read).length;
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
    setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })));
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
  const removeHistory: AppContextType["removeHistory"] = (id) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  };

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
      searchQuery,
      notifications,
      notificationsList,
      history,
      location,
      claims,
      ocrDraft,
      isAuthenticatedState,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
