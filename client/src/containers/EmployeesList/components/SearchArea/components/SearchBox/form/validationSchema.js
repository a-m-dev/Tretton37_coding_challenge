import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  query: Yup.string()
    .typeError("You must specify a valid query")
    .test("alphabets", "Name must only contain alphabets", (value) => {
      return /^[A-Za-z]+$/.test(value);
    }),
});

export default validationSchema;
