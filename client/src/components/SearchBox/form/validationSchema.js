import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  query: Yup.string().nullable().typeError("You must specify a valid query"),
});

export default validationSchema;
