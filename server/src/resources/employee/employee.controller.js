import { EmployeeModel } from "./employee.model";
import ResponseGenerator from "../../utils/ResponseGenerator";
import RequestFailureReasons from "../../constants/RequestFailureReasons";

const EmployeeController = {};

/**
 * Get Employees List
 */
EmployeeController.getEmployeesList = async (req, res, next) => {
  return res.status(200).json(
    ResponseGenerator.success({
      code: 200,
      message: "Every thing is OK",
      result: [],
    })
  );
};

/**
 * Create Employee
 */
EmployeeController.createEmployee = async (req, res, next) => {
  const employeeConfig = req.body;

  try {
    const newEmployee = new EmployeeModel({
      ...employeeConfig,
    });

    let createdEmployee = await newEmployee.save();
    createdEmployee = createdEmployee.toJSON();

    return res.status(201).json(
      ResponseGenerator.success({
        code: 201,
        message: "User Created",
        result: createdEmployee,
      })
    );
  } catch (error) {
    console.log(error);

    return res.status(500).json(
      ResponseGenerator.failure({
        code: 500,
        reason: RequestFailureReasons.INTERNAL_SERVER_ERROR,
        message: "There was a problem while creating employee",
        error,
      })
    );
  }
};

export default EmployeeController;
