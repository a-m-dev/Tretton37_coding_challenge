import { createContext, useContext } from "react";

export const SearchAreaContext = createContext(null);
export const useSearchAreaContext = () => useContext(SearchAreaContext);
