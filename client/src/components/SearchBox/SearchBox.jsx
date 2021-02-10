import Form from "../Form";
import { InputField } from "../Kit";
import SearchBoxManager from "./SearchBoxManager";
import "./SearchBox.scss";

const SearchBox = (props) => {
  const { formProps } = SearchBoxManager(props);

  return (
    <section className="search-box">
      <Form {...formProps} className="search-box__form">
        <InputField type="text" name="query" placeholder="Search here..." />
        <button type="submit" className="search-box__submit">
          <i className="icon-search" />
        </button>
      </Form>
    </section>
  );
};

export default SearchBox;
