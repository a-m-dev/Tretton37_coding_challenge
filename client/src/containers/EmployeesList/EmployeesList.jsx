import { EmployeesListContext } from "./context";
import EmployeesListManager from "./EmployeesListManager";
import { SearchArea, ResultArea } from "./components";
import "./EmployeesList.scss";

const EmployeeList = () => {
  const { data, actions } = EmployeesListManager();

  return (
    <article className="employees-list">
      <EmployeesListContext.Provider value={{ data, actions }}>
        <section className="container">
          <h1 className="employees-list__heading">
            The fellowship of the tretton37
          </h1>

          <SearchArea />
          <ResultArea />
        </section>
      </EmployeesListContext.Provider>
    </article>
  );
};

export default EmployeeList;
