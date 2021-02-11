import { useState, useCallback, useMemo } from "react";
import { ListViewTypes } from "../../../../constants";

const ResultAreaManager = () => {
  // local states
  const [listViewType, setListViewType] = useState(ListViewTypes.GRID);

  // data managers
  const getListViewTypes = useMemo(() => {
    return [
      { id: 0, type: ListViewTypes.GRID, icon: "icon-th-large" },
      { id: 1, type: ListViewTypes.LIST, icon: "icon-th-list" },
    ];
  }, []);

  // handlers
  const handleSwitchListViewType = useCallback(
    (type) => setListViewType(type),
    [setListViewType]
  );

  return {
    data: { listViewType, getListViewTypes },
    actions: { handleSwitchListViewType },
  };
};

export default ResultAreaManager;
