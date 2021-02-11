export const BASE_URL = "http://localhost:4010/api/v1.0";

const ApiEndpoints = {
  getOffices: () => `${BASE_URL}/employees/getEmployeeAvaliableOffices`,
  getEmployees: (page) => `${BASE_URL}/employees/getEmployeeList?page=${page}`,
};

export default ApiEndpoints;
