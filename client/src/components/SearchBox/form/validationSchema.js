import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  query: Yup.string()
    .nullable()
    .typeError("You must specify a valid query")
    .required("Query is required to search"),
});

export default validationSchema;
