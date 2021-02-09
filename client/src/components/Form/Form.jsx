import { Form as FormikForm, Formik } from "formik";

const Form = ({
  initialValues,
  validationSchema,
  enableReinitialize,
  onSubmit,
  validateOnChange = true,
  validateOnBlur = true,
  ...rest
}) => {
  const formikProps = {
    initialValues,
    validationSchema,
    enableReinitialize,
    onSubmit,
    validateOnChange,
    validateOnBlur,
  };

  return (
    <Formik {...formikProps}>
      <FormikForm {...rest} />
    </Formik>
  );
};

export default Form;
