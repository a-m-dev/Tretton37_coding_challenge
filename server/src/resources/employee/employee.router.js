import Router from "express";

import EmployeeController from "./employee.controller";

const EmployeeRouter = Router();

EmployeeRouter.route("/getEmployeeList").get(
  EmployeeController.getEmployeesList
);

EmployeeRouter.route("/createEmployee").post(EmployeeController.createEmployee);

export default EmployeeRouter;
