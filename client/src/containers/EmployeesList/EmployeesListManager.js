import { useState, useEffect, useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import PublicRoutes from "../../utils/PublicRoutes";
import ApiEndpoints from "../../utils/ApiEndpoints";
import useFetch from "../../hooks/useFetch";
import useQueryParams from "../../hooks/useQueryParams";
import { RequestMethods } from "../../constants";
import { getGeneratedQueryString } from "../../utils/ManageQueryString";

const EmployeesListManager = () => {
  // push
  const { push } = useHistory();

  // query params
  const params = useQueryParams();

  // local states
  const [page, setPage] = useState(1);
  const [totalResult, setTotalResult] = useState(null);
  const [employeeData, setEmployeeData] = useState([]);
  const [url, setUrl] = useState("");

  // fetch data handler
  const { isLoading, error, response } = useFetch({
    url: url,
    method: RequestMethods.GET,
    dep: [page, url],
  });

  // effects
  useEffect(() => {
    console.log(">>>>> RESPONSE", response);
    response?.data && setEmployeeData(response.data);
    response?.pagination && setPage(response.pagination.currentPage);
    response?.pagination
      ? setTotalResult(response.pagination.totalItems)
      : setTotalResult(null);
  }, [response, setEmployeeData, setPage, setTotalResult]);

  // useEffect(() => {
  //   console.log({
  //     query: params.get("q"),
  //     sortBy: params.get("sortBy"),
  //     sortOrder: params.get("sortOrder"),
  //     office: params.get("office"),
  //     contactLinks: params.getAll("cl"),
  //   });
  // }, [params]);

  const handleSearch = useCallback(
    ({ query, sortBy, sortOrder, selectedOffice, contactLists }) => {
      // console.log("HANDLE SEARCH >>> ", {
      //   query,
      //   sortBy,
      //   sortOrder,
      //   selectedOffice,
      //   contactLists,
      // });

      // TODO:
      // - call search function
      const generatedURL = ApiEndpoints.getEmployees({
        page,
        query,
        sortBy,
        sortOrder,
        office: selectedOffice,
        contactLinks: contactLists,
      });

      // console.log(">>>> URL", generatedURL);
      setUrl(generatedURL);

      // - update url
      const queryString = getGeneratedQueryString({
        query,
        sortBy,
        sortOrder,
        selectedOffice,
        contactLists,
      });
      push(`${PublicRoutes.EmployeeList}?${queryString}`);
    },
    [push, setUrl, page]
  );

  return {
    data: { isLoading, error, totalResult, employeeData },
    actions: { handleSearch },
  };
};

export default EmployeesListManager;
