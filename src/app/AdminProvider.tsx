"use client";

import { createContext, useContext, useState } from "react";

type AdminContextValue = {
  isAdmin: boolean;
  password: string;
  login: (password: string) => void;
  logout: () => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  function login(pw: string) {
    setPassword(pw);
    setIsAdmin(true);
  }

  function logout() {
    setPassword("");
    setIsAdmin(false);
  }

  return (
    <AdminContext.Provider value={{ isAdmin, password, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
