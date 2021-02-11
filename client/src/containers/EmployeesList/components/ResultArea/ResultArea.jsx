import { Loading, Error } from "../../../../components";
import { TopHeading, EmployeeCard } from "./components";
import { ResultAreaContext } from "./context";
import ResultAreaManager from "./ResultAreaManager";
import "./ResultArea.scss";

const ResultArea = () => {
  const {
    data,
    actions,
    data: { getListClass, isLoading, error, employeeData },
  } = ResultAreaManager();

  return (
    <section className="result-area">
      <ResultAreaContext.Provider value={{ data, actions }}>
        <TopHeading />
        {isLoading && <Loading />}
        {!isLoading && error && <Error />}

        {!isLoading && (
          <section className={getListClass}>
            {employeeData.length > 0 &&
              employeeData.map((emp) => (
                <EmployeeCard key={emp._id} {...emp} />
              ))}
          </section>
        )}
      </ResultAreaContext.Provider>
    </section>
  );
};

export default ResultArea;
