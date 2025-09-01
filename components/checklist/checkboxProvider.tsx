import { createContext, useContext } from "react";

import { useCheckboxMap } from "@/hooks/useCheckboxMap";

export const CheckboxContext = createContext<ReturnType<typeof useCheckboxMap> | null>(null);

export function CheckboxProvider({ children }: { children: React.ReactNode }) {
    const checkbox = useCheckboxMap();

    return (
        <CheckboxContext.Provider value={checkbox}>
            {children}
        </CheckboxContext.Provider>
    );
}


export function useCheckboxContext() {
    const context = useContext(CheckboxContext);
    if (!context) {
        throw new Error("useCheckboxContext must be used inside a <CheckboxProvider>");
    }
    return context;
}
