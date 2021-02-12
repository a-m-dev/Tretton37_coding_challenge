import { useState, useCallback, useMemo } from "react";
import { ListViewTypes } from "../../../../constants";
import { useEmployeesListContext } from "../../context";

const ResultAreaManager = () => {
  const {
    data: { isLoading, error, employeeData, totalResults },
    actions: { handleEnterWaypoint },
  } = useEmployeesListContext();

  // local states
  const [listViewType, setListViewType] = useState(ListViewTypes.GRID);

  // data managers
  const getListViewTypes = useMemo(() => {
    return [
      { id: 0, type: ListViewTypes.GRID, icon: "icon-th-large" },
      { id: 1, type: ListViewTypes.LIST, icon: "icon-th-list" },
    ];
  }, []);

  const getListClass = useMemo(() => {
    let result = "result-area__employees-list";

    switch (true) {
      case listViewType === ListViewTypes.LIST:
        result += " result-area__employees-list--list";
        break;

      case listViewType === ListViewTypes.GRID:
      default:
        result += " result-area__employees-list--grid";
        break;
    }

    return result;
  }, [listViewType]);

  // handlers
  const handleSwitchListViewType = useCallback(
    (type) => setListViewType(type),
    [setListViewType]
  );

  return {
    data: {
      isLoading,
      error,
      employeeData,
      getListClass,
      listViewType,
      getListViewTypes,
      totalResults,
    },
    actions: { handleSwitchListViewType, handleEnterWaypoint },
  };
};

export default ResultAreaManager;
