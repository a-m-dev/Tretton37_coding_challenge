import { createContext, useContext } from "react";

export const ResultAreaContext = createContext(null);
export const useResultAreaContext = () => useContext(ResultAreaContext);
