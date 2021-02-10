import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import PublicRoutes from "../../../../utils/PublicRoutes";
import { RequestMethods } from "../../../../constants";
import useFetch from "../../../../hooks/useFetch";
import ApiEndpoints from "../../../../utils/ApiEndpoints";
import useQueryParams from "../../../../hooks/useQueryParams";
import { getGeneratedQueryString } from "../../../../utils/ManageQueryString";

const SearchAreaManager = () => {
  // push
  const { push } = useHistory();

  // params
  const params = useQueryParams();

  // Refs
  const advanceSearchDrawerRef = useRef(null);

  // local states
  const [query, setQuery] = useState("");
  const [activeSortId, setActiveSortId] = useState(0);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [selectedContactLists, setSelectedContactLists] = useState([]);
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);

  // Data Fetchers
  const { isLoading: avaliableOfficesLoading, error, response } = useFetch({
    url: ApiEndpoints.getOffices(),
    method: RequestMethods.GET,
  });

  // data managers
  const getFilterBtnClass = useMemo(() => {
    let result = "search-area__nav-filter-btn";
    if (isAdvanceSearchOpen) result += " search-area__nav-filter-btn--active";

    if (
      activeSortId !== 0 ||
      selectedOffice !== null ||
      selectedContactLists.length > 0
    )
      result += " search-area__nav-filter-btn--filtered";

    return result;
  }, [isAdvanceSearchOpen, activeSortId, selectedOffice, selectedContactLists]);

  const getSortOptions = useMemo(() => {
    return [
      {
        id: 0,
        label: "By Name ( default )",
        sortBy: "name",
        order: "asc",
        icon: "icon-down-small",
      },
      {
        id: 1,
        label: "By Name",
        sortBy: "name",
        order: "desc",
        icon: "icon-up-small",
      },
      {
        id: 2,
        label: "By Office",
        sortBy: "office",
        order: "asc",
        icon: "icon-down-small",
      },
      {
        id: 3,
        label: "By Office",
        sortBy: "office",
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

  // Effects
  useEffect(() => {
    if (!isAdvanceSearchOpen) {
      advanceSearchDrawerRef.current.style.maxHeight = "0px";
    } else {
      const calculateHeight = advanceSearchDrawerRef.current.scrollHeight + 64;
      advanceSearchDrawerRef.current.style.maxHeight = `${calculateHeight}px`;
    }
  }, [advanceSearchDrawerRef, isAdvanceSearchOpen]);

  useEffect(() => {
    // query
    if (params.get("q")) setQuery(params.get("q"));

    // sort
    if (params.get("sortBy") && params.get("sortOrder")) {
      const targetSortConfig = getSortOptions.find(
        (opt) =>
          opt.sortBy === params.get("sortBy") &&
          opt.order === params.get("sortOrder")
      );
      Boolean(targetSortConfig) && setActiveSortId(targetSortConfig.id);
    }

    // office
    if (params.get("office")) setSelectedOffice(params.get("office"));

    // contact links
    if (params.getAll("cl") && params.getAll("cl").length > 0) {
      let ids = [];
      getContactLinkOptions.forEach(
        (opt) => params.getAll("cl").includes(opt.label) && ids.push(opt.id)
      );
      setSelectedContactLists(ids);
    }
  }, [setQuery, setActiveSortId, setSelectedOffice, setSelectedContactLists]);

  useEffect(() => {
    const { sortBy = "name", order: sortOrder = "asc" } = getSortOptions.find(
      (opt) => opt.id === activeSortId
    );
    const contactLists = getContactLinkOptions
      .filter((link) => selectedContactLists.includes(link.id))
      .map((el) => el.label);

    const queryString = getGeneratedQueryString({
      query,
      sortBy,
      sortOrder,
      selectedOffice,
      contactLists,
    });

    push(`${PublicRoutes.EmployeeList}?${queryString}`);
  }, [
    push,
    query,
    activeSortId,
    selectedOffice,
    selectedContactLists,
    getSortOptions,
  ]);

  // handlers
  const handleSubmitSearch = useCallback(({ query }) => setQuery(query), [
    setQuery,
  ]);

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
      handleSubmitSearch,
      handleToggleAdvanceSearch,
      handleSortSelection,
      handleSelectedOffice,
      handleSelectContactList,
    },
    classModifiers: { getFilterBtnClass },
  };
};

export default SearchAreaManager;
