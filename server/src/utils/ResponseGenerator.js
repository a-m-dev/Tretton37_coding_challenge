import RequestFailureReasons from "../constants/RequestFailureReasons";
import AppConfig from "./AppConfig";

const ResponseGenerator = () => {
  return {
    success({ code, message = "It's OK", result = [] }) {
      return {
        meta: { code, message },
        data: result,
      };
    },
    successList({
      code,
      message = "It's OK",
      result = [],
      pagination: {
        currentPage,
        totalItems,
        perPage = AppConfig.listItemsPerPageCount,
      },
    }) {
      return {
        meta: { code, message },
        pagination: {
          perPage,
          currentPage,
          totalItems,
        },
        data: result,
      };
    },
    failure({
      code,
      message = "Something went wrong!",
      reason = RequestFailureReasons.BAD_REQUEST,
      error,
    }) {
      return {
        meta: { code, reason, message },
        error: error,
      };
    },
  };
};

export default ResponseGenerator();
