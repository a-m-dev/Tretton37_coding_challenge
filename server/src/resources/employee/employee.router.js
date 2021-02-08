import Router from "express";
import EmployeeController from "./employee.controller";
import ValidationTypes from "../../constants/ValidationTypes";

// middlewares
import DataValidator from "../../middlewares/dataValidator";

// validation schemas
import createEmployeeSchema from "../../validators/createEmployeeValidator";

const EmployeeRouter = Router();

EmployeeRouter.route("/getEmployeeById/:employeeId").get(
  EmployeeController.getEmployeeById
);

EmployeeRouter.route("/getEmployeeList").get(
  EmployeeController.getEmployeesList
);

EmployeeRouter.route("/getEmployeeAvaliableOffices").get(
  EmployeeController.getEmployeeAvaliableOffices
);

EmployeeRouter.route("/createEmployee").post(
  DataValidator(createEmployeeSchema, ValidationTypes.BODY),
  EmployeeController.createEmployee
);

// TODO:
//  - add validator
EmployeeRouter.route("/bulkCreateEmployee").post(
  EmployeeController.bulkCreateEmployee
);

// TODO:
//  - add validator
EmployeeRouter.route("/updateEmployee/:employeeId").put(
  EmployeeController.updateEmployee
);

EmployeeRouter.route("/deleteEmployee/:employeeId").delete(
  EmployeeController.deleteEmployee
);

export default EmployeeRouter;
