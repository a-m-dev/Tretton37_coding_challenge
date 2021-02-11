const PublicRoutes = {
  // router routes
  EmployeeList: "/",
  Employee: "/:employeeId",

  // dymanic routes
  PushToEmployeeRoute: (empId) => `/${empId}`,
};

export default PublicRoutes;
