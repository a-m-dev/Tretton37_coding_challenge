import { useEffect, useMemo, useCallback } from "react";
import useQueryParams from "../../hooks/useQueryParams";

const EmployeesListManager = () => {
  const params = useQueryParams();

  // useEffect(() => {
  //   console.log({
  //     query: params.get("q"),
  //     sortBy: params.get("sortBy"),
  //     sortOrder: params.get("sortOrder"),
  //     office: params.get("office"),
  //     contactLinks: params.getAll("cl"),
  //   });
  // }, [params]);

  return {
    data: {},
    actions: {},
  };
};

export default EmployeesListManager;
