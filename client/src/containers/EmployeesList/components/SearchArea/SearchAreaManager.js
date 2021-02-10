import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { RequestMethods } from "../../../../constants";
import useFetch from "../../../../hooks/useFetch";
import ApiEndpoints from "../../../../utils/ApiEndpoints";

const SearchAreaManager = () => {
  // Refs
  const advanceSearchDrawerRef = useRef(null);

  // local states
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);

  const { isLoading: avaliableOfficesLoading, error, response } = useFetch({
    url: ApiEndpoints.getOffices(),
    method: RequestMethods.GET,
  });

  const [activeSortId, setActiveSortId] = useState(0);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [selectedContactLists, setSelectedContactLists] = useState([]);

  // Effects
  useEffect(() => {
    if (!isAdvanceSearchOpen) {
      advanceSearchDrawerRef.current.style.maxHeight = "0px";
    } else {
      const calculateHeight = advanceSearchDrawerRef.current.scrollHeight + 64;
      advanceSearchDrawerRef.current.style.maxHeight = `${calculateHeight}px`;
    }
  }, [advanceSearchDrawerRef, isAdvanceSearchOpen]);

  // data managers
  const getFilterBtnClass = useMemo(() => {
    let result = "search-area__nav-filter-btn";
    if (isAdvanceSearchOpen) result += " search-area__nav-filter-btn--active";

    return result;
  }, [isAdvanceSearchOpen]);

  const getSortOptions = useMemo(() => {
    return [
      { id: 0, label: "By Name", order: "asc", icon: "icon-down-small" },
      { id: 1, label: "By Name", order: "desc", icon: "icon-up-small" },
      {
        id: 2,
        label: "By Office",
        order: "asc",
        icon: "icon-down-small",
      },
      {
        id: 3,
        label: "By Office",
        order: "desc",
        icon: "icon-up-small",
      },
    ];
  }, []);

  const getContactLinkOptions = useMemo(() => {
    return [
      { id: 0, label: "linkedIn" },
      { id: 1, label: "twitter" },
      { id: 2, label: "gitHub" },
      { id: 3, label: "stackOverflow" },
    ];
  }, []);

  // handlers
  const handleToggleAdvanceSearch = useCallback(() => {
    setIsAdvanceSearchOpen((prev) => !prev);
  }, [setIsAdvanceSearchOpen]);

  const handleSortSelection = useCallback(
    (selectedSortId) => setActiveSortId(selectedSortId),
    [setActiveSortId]
  );

  const handleSelectedOffice = useCallback(
    (targetOffice) => {
      if (selectedOffice === targetOffice) setSelectedOffice(null);
      else setSelectedOffice(targetOffice);
    },
    [selectedOffice, setSelectedOffice]
  );

  const handleSelectContactList = useCallback(
    (targetItem) => {
      const findIdx = selectedContactLists.findIndex((i) => i === targetItem);

      if (findIdx === -1)
        setSelectedContactLists((prev) => [...prev, targetItem]);
      else
        setSelectedContactLists([
          ...selectedContactLists.slice(0, findIdx),
          ...selectedContactLists.slice(
            findIdx + 1,
            selectedContactLists.length
          ),
        ]);
    },
    [selectedContactLists, setSelectedContactLists]
  );

  return {
    refs: { advanceSearchDrawerRef },
    data: {
      isAdvanceSearchOpen,
      getSortOptions,
      activeSortId,
      avaliableOfficesLoading,
      selectedOffice,
      avaliableOffices: response?.data || [],
      getContactLinkOptions,
      selectedContactLists,
    },
    actions: {
      handleToggleAdvanceSearch,
      handleSortSelection,
      handleSelectedOffice,
      handleSelectContactList,
    },
    classModifiers: { getFilterBtnClass },
  };
};

export default SearchAreaManager;
