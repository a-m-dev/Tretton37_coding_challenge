import SearchAreaManager from "./SearchAreaManager";
import { SearchAreaContext } from "./context";
import { SearchBox, AdvanceSearchDrawer } from "./components";
import "./SearchArea.scss";

const SearchArea = () => {
  const {
    refs,
    data,
    actions: { handleToggleAdvanceSearch, handleSubmitSearch, ...rest },
    classModifiers: { getFilterBtnClass },
  } = SearchAreaManager();

  return (
    <article className="search-area">
      <SearchAreaContext.Provider value={{ refs, data, actions: { ...rest } }}>
        <section className="search-area__nav">
          <SearchBox handleSubmitSearch={handleSubmitSearch} />

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
