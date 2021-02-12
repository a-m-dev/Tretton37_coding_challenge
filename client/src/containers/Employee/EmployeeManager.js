import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ApiEndpoints from "../../utils/ApiEndpoints";
import useFetch from "../../hooks/useFetch";
import { RequestMethods } from "../../constants";

const EmployeeManager = () => {
  const params = useParams();
  const { goBack } = useHistory();

  const { isLoading, error, response } = useFetch({
    url: ApiEndpoints.getEmployee(params?.employeeId || undefined),
    method: RequestMethods.GET,
  });

  // handlers
  const handleGoBack = () => goBack();

  return {
    data: { isLoading, error, employeeData: response?.data },
    actions: { handleGoBack },
  };
};

export default EmployeeManager;
