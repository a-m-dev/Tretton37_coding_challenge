import "./SearchArea.scss";
import { InputField } from "../../../../components";

const SearchArea = () => {
  return (
    <section className="search-area">
      <InputField type="text" />
      <i className="icon-equalizer" />
    </section>
  );
};

export default SearchArea;
