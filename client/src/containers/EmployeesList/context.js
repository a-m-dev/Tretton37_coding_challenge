import { createContext, useContext } from "react";

export const EmployeesListContext = createContext(null);
export const useEmployeesListContext = () => useContext(EmployeesListContext);
