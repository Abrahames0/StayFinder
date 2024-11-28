import React, { createContext, useContext, useState, ReactNode } from "react";
import { LazyUsuario } from "@/src/models";

type UserContextType = {
  user: LazyUsuario | null;
  setUser: (user: LazyUsuario | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LazyUsuario | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
