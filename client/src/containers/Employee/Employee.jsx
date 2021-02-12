import EmployeeManager from "./EmployeeManager";
import { EmployeeContext } from "./context";
import { Loading, Error } from "../../components";
import { Cover, HeadingBox, Description } from "./components";
import "./Employee.scss";

const Employee = () => {
  const {
    data,
    actions,
    data: { isLoading, error },
    actions: { handleGoBack },
  } = EmployeeManager();

  return (
    <EmployeeContext.Provider value={{ data, actions }}>
      <article className="employee">
        <div className="container">
          {isLoading && <Loading />}
          {!isLoading && error && (
            <Error
              heading="User Not found!"
              message="Please select user properly"
            />
          )}

          <i onClick={handleGoBack} className="icon-up-small employee__back" />

          {!isLoading && (
            <>
              <Cover />
              <HeadingBox />
              <Description />
            </>
          )}
        </div>
      </article>
    </EmployeeContext.Provider>
  );
};

export default Employee;
