import { Waypoint } from "react-waypoint";
import { Loading, Error } from "../../../../components";
import { TopHeading, EmployeeCard } from "./components";
import { ResultAreaContext } from "./context";
import ResultAreaManager from "./ResultAreaManager";
import "./ResultArea.scss";

const ResultArea = () => {
  const {
    data,
    actions,
    data: { getListClass, isLoading, error, employeeData, totalResults },
  } = ResultAreaManager();

  return (
    <section className="result-area">
      <ResultAreaContext.Provider value={{ data, actions }}>
        <TopHeading />

        <section className={getListClass}>
          {employeeData.length > 0 &&
            employeeData.map((emp) => <EmployeeCard key={emp._id} {...emp} />)}
        </section>

        {isLoading && <Loading />}
        {!isLoading && error && <Error />}
        {totalResults === 0 && (
          <Error
            heading="Tweak filters again, please"
            message="There are no result for this filter set!"
          />
        )}

        {totalResults >= 12 && (
          <Waypoint onEnter={actions.handleEnterWaypoint}>
            <div className="result-area__load-more">
              THIS IS WAY POINT AREA FOR LOAD MORE
            </div>
          </Waypoint>
        )}
      </ResultAreaContext.Provider>
    </section>
  );
};

export default ResultArea;
