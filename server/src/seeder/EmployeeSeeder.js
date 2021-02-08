import { EmployeeModel } from "../resources/employee/employee.model";
import __MOCK_EMPLOYEES__ from "./__mock_data__/employees.json";

const EmployeeSeeder = async () => {
  const employees = await EmployeeModel.find();

  if (employees.length === 0) {
    try {
      await EmployeeModel.insertMany(__MOCK_EMPLOYEES__);
      console.log(
        `[SEEDER]: Inserted ${__MOCK_EMPLOYEES__.length} employees to database`
      );
    } catch (error) {
      console.log("[SEEDER]: Failed to seed employees to database");
    }
  } else {
    console.log(`[SEEDER]: Seeding employeers has been happened before!`);
  }
};

export default EmployeeSeeder;
