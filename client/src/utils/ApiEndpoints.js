import { getGeneratedQueryStringForApiCall } from "../utils/ManageQueryString";

export const BASE_URL = "http://localhost:4010/api/v1.0";

const ApiEndpoints = {
  getOffices: () => `${BASE_URL}/employees/getEmployeeAvaliableOffices`,
  getEmployee: (employeeId) =>
    `${BASE_URL}/employees/getEmployeeById/${employeeId}`,
  getEmployees: ({
    page,
    query,
    sortBy,
    sortOrder,
    office,
    contactLinks,
  } = {}) =>
    `${BASE_URL}/employees/getEmployeeList?${getGeneratedQueryStringForApiCall({
      page,
      query,
      sortBy,
      sortOrder,
      office,
      contactLinks,
    })}`,
};

export default ApiEndpoints;
