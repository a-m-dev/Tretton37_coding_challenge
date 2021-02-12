import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import PublicRoutes from "../../utils/PublicRoutes";
import ApiEndpoints from "../../utils/ApiEndpoints";
import useFetch from "../../hooks/useFetch";
import { RequestMethods } from "../../constants";
import { debounce } from "../../utils/debounce";
import { getGeneratedQueryString } from "../../utils/ManageQueryString";

const EmployeesListManager = () => {
  // push
  const { push } = useHistory();

  // local states
  const [url, setUrl] = useState(ApiEndpoints.getEmployees());
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({});
  const [employeeData, setEmployeeData] = useState([]);
  const [totalResults, setTotalResults] = useState(null);

  // fetch data handler
  const { isLoading, error, response } = useFetch({
    url: url,
    method: RequestMethods.GET,
    dep: [url],
  });

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    // TODO:
    //  - api call
    //  - push to the updated query params
    handleApiCall({ page, ...filters });
    handleUpdateUrl({ page, ...filters });
  }, [page, filters]);

  useEffect(() => {
    if (response) {
      const { data, pagination } = response || { data: [] };
      setTotalResults(pagination.totalItems);
      if (page > 1) setEmployeeData((prev) => [...prev, ...data]);
      else setEmployeeData(data);
    }
  }, [response]);

  const handleSearch = useCallback(
    async ({ query, sortBy, sortOrder, selectedOffice, contactLists }) => {
      setFilters({
        query,
        sortBy,
        sortOrder,
        office: selectedOffice,
        contactLinks: contactLists,
      });
    },
    [push, page]
  );

  const handleApiCall = useCallback(
    debounce(
      async ({ page, query, sortBy, sortOrder, office, contactLinks }) => {
        const apiURL = ApiEndpoints.getEmployees({
          page,
          query,
          sortBy,
          sortOrder,
          office,
          contactLinks,
        });
        setUrl(apiURL);
      },
      100
    ),
    []
  );

  const handleUpdateUrl = useCallback(
    ({ page, query, sortBy, sortOrder, office, contactLinks }) => {
      const generateQueryParam = getGeneratedQueryString(
        {
          query,
          sortBy,
          sortOrder,
          selectedOffice: office,
          contactLists: contactLinks,
        },
        250
      );
      push(`${PublicRoutes.EmployeeList}?${generateQueryParam}`);
    },
    []
  );

  // handle pagination
  const handleEnterWaypoint = useCallback(() => {
    if (Math.ceil(totalResults / 12) < page + 1) {
      // console.log(">>>> RETURNING ");
      return;
    }
    // console.log(">>>> PAGE INCREMENTED", page + 1);
    setPage((prev) => prev + 1);
  }, [page, totalResults]);

  return {
    data: { isLoading, error, employeeData, totalResults },
    actions: { handleSearch, handleEnterWaypoint },
  };
};

export default EmployeesListManager;
