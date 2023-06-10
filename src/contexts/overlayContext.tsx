"use client";
import * as React from "react";

type State = { opened: boolean; path: string | null; mount: boolean };

type ProviderProps = { children: React.ReactNode };

const initialState = {
  opened: false,
  path: null,
  mount: false,
};

const StateContext = React.createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: (x: any) => null });

const DispatchContext = React.createContext<React.Dispatch<any>>(
  (x: any) => null
);

function reducer(state: State, action: any) {
  switch (action.type) {
    case "open": {
      return {
        ...state,
        opened: true,
        mount: true,
        ...action.payload,
      };
    }
    case "close": {
      return {
        ...state,
        opened: false,
        mount: true,
        ...action.payload,
      };
    }

    case "unMount": {
      return {
        ...state,
        opened: false,
        mount: false,
        path: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function OverlayProvider({ children }: ProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

function useOverlayState() {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error("useOverlayState must be used within a OverlayProvider");
  }
  return context;
}

function useOverlayDispatch() {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("useOverlayDispatch must be used within a OverlayProvider");
  }
  return context;
}
export { OverlayProvider, useOverlayState, useOverlayDispatch };
