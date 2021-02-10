import Form from "../../../../../../components/Form";
import { InputField } from "../../../../../../components/Kit";
import useQueryParams from "../../../../../../hooks/useQueryParams";
import { validationSchema } from "./form";
import "./SearchBox.scss";

const SearchBox = ({ handleSubmitSearch }) => {
  // params
  const params = useQueryParams();

  const formProps = {
    initialValues: {
      query: params.get("q") || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: handleSubmitSearch,
  };

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
