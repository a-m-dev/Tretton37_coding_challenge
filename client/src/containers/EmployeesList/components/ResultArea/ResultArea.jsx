import { TopHeading } from "./components";
import { ResultAreaContext } from "./context";
import ResultAreaManager from "./ResultAreaManager";
import "./ResultArea.scss";

const ResultArea = () => {
  const { data, actions } = ResultAreaManager();

  return (
    <section className="result-area">
      <ResultAreaContext.Provider value={{ data, actions }}>
        <TopHeading />
        Hi
      </ResultAreaContext.Provider>
    </section>
  );
};

export default ResultArea;
