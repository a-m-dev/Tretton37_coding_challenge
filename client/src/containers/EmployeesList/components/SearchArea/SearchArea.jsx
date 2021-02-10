import SearchAreaManager from "./SearchAreaManager";
import { SearchAreaContext } from "./context";
import { AdvanceSearchDrawer } from "./components";
import { SearchBox } from "../../../../components";
import "./SearchArea.scss";

const SearchArea = () => {
  const {
    refs,
    data,
    actions: { handleToggleAdvanceSearch, ...rest },
    classModifiers: { getFilterBtnClass },
  } = SearchAreaManager();

  return (
    <article className="search-area">
      <SearchAreaContext.Provider value={{ refs, data, actions: { ...rest } }}>
        <section className="search-area__nav">
          <SearchBox />

          <button
            className={getFilterBtnClass}
            onClick={handleToggleAdvanceSearch}
          >
            <i className="icon-equalizer" />
          </button>
        </section>

        <AdvanceSearchDrawer />
      </SearchAreaContext.Provider>
    </article>
  );
};

export default SearchArea;
