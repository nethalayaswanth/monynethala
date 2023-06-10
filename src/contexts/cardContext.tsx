"use client";
import * as React from "react";

type State = { active: boolean; color: string };
type ProviderProps = {
  children: React.ReactNode;
  active: boolean;
  color: string;
};

const Context = React.createContext<State>({ active: false, color: "" });

function ActiveProvider({ children, active, color }: ProviderProps) {
  return (
    <Context.Provider
      value={React.useMemo(
        () => ({
          active,
          color,
        }),
        [active, color]
      )}
    >
      {children}
    </Context.Provider>
  );
}

function useActive() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error("useActive must be used within a ActiveProvider");
  }
  return context;
}

export { ActiveProvider, useActive };
