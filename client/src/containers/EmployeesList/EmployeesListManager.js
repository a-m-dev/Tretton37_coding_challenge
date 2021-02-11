import { useState, useEffect, useMemo, useCallback } from "react";
import ApiEndpoints from "../../utils/ApiEndpoints";
import useFetch from "../../hooks/useFetch";
import useQueryParams from "../../hooks/useQueryParams";
import { RequestMethods } from "../../constants";

const EmployeesListManager = () => {
  // query params
  const params = useQueryParams();

  // local states
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);

  // fetch data handler
  const { isLoading, error, response } = useFetch({
    url: ApiEndpoints.getEmployees(page),
    method: RequestMethods.GET,
    dep: [page],
  });

  // effects
  useEffect(() => {
    console.log(">>>>> RESPONSE", response);
    response?.data && setEmployeeData((prev) => [...prev, ...response.data]);
    response?.pagination && setPage(response.pagination.currentPage);
    response?.pagination
      ? setTotalResult(response.pagination.totalItems)
      : setTotalResult(null);
  }, [response, setEmployeeData, setPage, setTotalResult]);

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
    data: { isLoading, error, totalResult, employeeData },
    actions: {},
  };
};

export default EmployeesListManager;
