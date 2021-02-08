import mongoose from "mongoose";
import { EmployeeModel } from "./employee.model";
import ResponseGenerator from "../../utils/ResponseGenerator";
import RequestFailureReasons from "../../constants/RequestFailureReasons";
import AppConfig from "../../utils/AppConfig";
import SortDirections from "../../constants/SortDirections";

const EmployeeController = {};

/**
 * Get Employee By Id
 */
EmployeeController.getEmployeeById = async (req, res, next) => {
  const { employeeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json(
      ResponseGenerator.failure({
        code: 400,
        message: "Please Provide a valid ID",
      })
    );
  }

  try {
    const employee = await EmployeeModel.findById(employeeId);

    if (!employee) {
      return res.status(404).json(
        ResponseGenerator.failure({
          code: 404,
          message: "No employee Found",
        })
      );
    }

    return res.status(200).json(
      ResponseGenerator.success({
        code: 200,
        message: "Employee Found!",
        result: employee,
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      ResponseGenerator.failure({
        code: 500,
        message: "There was a problem during geeting employees",
        error,
      })
    );
  }
};

/**
 * Get Employees List
 */
EmployeeController.getEmployeesList = async (req, res, next) => {
  const queryConfig = req.query;

  // pagination
  let page = parseInt(queryConfig.page) || 1;
  let perPage =
    parseInt(queryConfig.perPage) || AppConfig.listItemsPerPageCount;

  // sorting
  let sortConfig = {};
  if (queryConfig.sortBy && queryConfig.sortDirection) {
    let direction = null;

    switch (queryConfig.sortDirection.toLowerCase()) {
      case SortDirections.DESC:
        direction = -1;
        break;

      case SortDirections.ASC:
      default:
        direction = 1;
        break;
    }

    sortConfig[queryConfig.sortBy] = direction;
  }

  // filter
  let filterConfig = {};

  // search by Name
  if (queryConfig.name) filterConfig.name = new RegExp(queryConfig.name, "gi");

  // search by office
  if (queryConfig.office) filterConfig.$or = [{ office: queryConfig.office }];

  // contact links
  if (queryConfig.contactLinks?.length !== 0) {
    for (let i = 0; i < queryConfig.contactLinks?.length; i++) {
      filterConfig[queryConfig.contactLinks[i]] = { $ne: null };
    }
  }

  console.log(">>>> FILTER CONFIG", JSON.stringify(filterConfig, null, 2));

  try {
    // get count
    const employeesCount = await EmployeeModel.find(
      filterConfig
    ).countDocuments();

    // get result
    const employees = await EmployeeModel.find(filterConfig)
      .sort(sortConfig)
      .skip(perPage * (page - 1))
      .limit(perPage);

    return res.status(200).json(
      ResponseGenerator.successList({
        code: 200,
        result: employees,
        pagination: {
          currentPage: page,
          totalItems: employeesCount,
        },
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      ResponseGenerator.failure({
        code: 500,
        message: "There was a problem during geeting employees",
        error,
      })
    );
  }
};

/**
 *  Get Employee avaliableOffices
 */
EmployeeController.getEmployeeAvaliableOffices = async (req, res, next) => {
  try {
    const offices = await EmployeeModel.find();

    const avaliableOffices = Array.from(
      new Set(offices.map((el) => el.office))
    ).filter(Boolean);

    return res.status(200).json(
      ResponseGenerator.success({
        code: 200,
        message: "offices avaliable",
        result: avaliableOffices,
      })
    );
  } catch (error) {
    console.log(error);

    return res.status(500).json(
      ResponseGenerator.failure({
        code: 500,
        reason: RequestFailureReasons.INTERNAL_SERVER_ERROR,
        message: "There was a problem while getting offices",
        error,
      })
    );
  }
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
        message: "Employee Created",
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

/**
 * Bulk Create Employee
 */
EmployeeController.bulkCreateEmployee = async (req, res, next) => {
  const bulkEmployeeData = req.body;

  try {
    const createdEmployees = await EmployeeModel.insertMany(bulkEmployeeData);

    return res.status(201).json(
      ResponseGenerator.success({
        code: 201,
        message: "Employees Added!",
        result: {
          insertedCount: createdEmployees.length,
          employees: createdEmployees,
        },
      })
    );
  } catch (error) {
    console.log(error);

    return res.status(500).json(
      ResponseGenerator.failure({
        code: 500,
        reason: RequestFailureReasons.INTERNAL_SERVER_ERROR,
        message: "There was a problem during creating employees",
        error,
      })
    );
  }
};

/**
 * Update Employee
 */
EmployeeController.updateEmployee = async (req, res, next) => {
  const { employeeId } = req.params;
  let updatables = req.body;

  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json(
      ResponseGenerator.failure({
        code: 400,
        message: "Please Provide a valid ID",
      })
    );
  }

  try {
    const result = await EmployeeModel.findOneAndUpdate(
      { _id: employeeId },
      { ...updatables },
      { new: true }
    );

    return res.status(200).json(
      ResponseGenerator.success({
        code: 200,
        message: "Employee Updated",
        result,
      })
    );
  } catch (error) {
    console.log(error);

    return res.status(500).json(
      ResponseGenerator.failure({
        code: 500,
        reason: RequestFailureReasons.INTERNAL_SERVER_ERROR,
        message: "There was a problem during updating employees",
        error,
      })
    );
  }
};

/**
 * Delete Employee
 */
EmployeeController.deleteEmployee = async (req, res, next) => {
  const { employeeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    return res.status(400).json(
      ResponseGenerator.failure({
        code: 400,
        message: "Please Provide a valid ID",
      })
    );
  }

  try {
    const employee = await EmployeeModel.findByIdAndRemove(employeeId);

    if (!employee) {
      return res.status(404).json(
        ResponseGenerator.failure({
          code: 404,
          message: "No employee Found",
        })
      );
    }

    return res.status(200).json(
      ResponseGenerator.success({
        code: 200,
        message: "Employee Removed!",
        result: employee,
      })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(
      ResponseGenerator.failure({
        code: 500,
        message: "There was a problem during geeting employees",
        error,
      })
    );
  }
};

export default EmployeeController;
