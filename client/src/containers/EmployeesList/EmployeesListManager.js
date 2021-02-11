import { useState, useEffect, useMemo, useCallback } from "react";
import ApiEndpoints from "../../utils/ApiEndpoints";
import useFetch from "../../hooks/useFetch";
import useQueryParams from "../../hooks/useQueryParams";
import { RequestMethods } from "../../constants";

const EmployeesListManager = () => {
  const params = useQueryParams();

  const [page, setPage] = useState(1);

  const { isLoading, error, response } = useFetch({
    url: ApiEndpoints.getEmployees(page),
    method: RequestMethods.GET,
    dep: [page],
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log(">>> PAGE CHANGE");
  //     setPage(2);
  //   }, 3000);
  // }, [setPage]);

  // console.log(">>>>>", page, response);

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
