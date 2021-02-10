import { initialValues, validationSchema } from "./form";

const SearchBoxManager = ({ submitFormHandler }) => {
  return {
    formProps: {
      initialValues,
      validationSchema,
      enableReinitialize: true,
      onSubmit: (args) => console.log(">>>> ARGS", args),
    },
  };
};

export default SearchBoxManager;
