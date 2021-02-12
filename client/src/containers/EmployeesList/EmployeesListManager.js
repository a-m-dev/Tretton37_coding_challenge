import { useState, useEffect, useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import PublicRoutes from "../../utils/PublicRoutes";
import ApiEndpoints from "../../utils/ApiEndpoints";
import useFetch from "../../hooks/useFetch";
import useQueryParams from "../../hooks/useQueryParams";
import { RequestMethods } from "../../constants";
import {
  getGeneratedQueryString,
  getGeneratedQueryStringForApiCall,
} from "../../utils/ManageQueryString";

const EmployeesListManager = () => {
  // push
  const { push } = useHistory();

  // query params
  const params = useQueryParams();

  // local states
  const [url, setUrl] = useState(ApiEndpoints.getEmployees());
  const [page, setPage] = useState(0);
  const [employeeData, setEmployeeData] = useState([]);

  // fetch data handler
  const { isLoading, error, response } = useFetch({
    url: url,
    method: RequestMethods.GET,
    dep: [url],
  });

  // useEffect(() => {
  //   console.log(">>> URL", url);
  // }, [url]);

  const handleSearch = useCallback(
    ({ query, sortBy, sortOrder, selectedOffice, contactLists }) => {
      // console.log(
      //   ">>>>> ARGS",
      //   JSON.stringify(
      //     {
      //       page,
      //       query,
      //       sortBy,
      //       sortOrder,
      //       selectedOffice,
      //       contactLists,
      //     },
      //     null,
      //     2
      //   )
      // );

      // TODO:
      //  - GENERATE API URL
      //  - push to the updated query params

      const apiURL = ApiEndpoints.getEmployees({
        page,
        query,
        sortBy,
        sortOrder,
        office: selectedOffice,
        contactLinks: contactLists,
      });
      setUrl(apiURL);

      // ----------------
      const generateQueryParam = getGeneratedQueryString({
        query,
        sortBy,
        sortOrder,
        selectedOffice,
        contactLists,
      });
      push(`${PublicRoutes.EmployeeList}?${generateQueryParam}`);
    },
    [push, setUrl, page]
  );

  const handleEnterWaypoint = useCallback(() => {
    console.log(">>>> PAGE INCREMENTED", page + 1);
    setPage((prev) => prev + 1);
  }, [page]);

  return {
    data: { isLoading, error, employeeData: response?.data || [] },
    actions: { handleSearch, handleEnterWaypoint },
  };
};

export default EmployeesListManager;
