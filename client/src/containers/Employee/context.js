import { createContext, useContext } from "react";

export const EmployeeContext = createContext(null);
export const useEmployeeContext = () => useContext(EmployeeContext);
