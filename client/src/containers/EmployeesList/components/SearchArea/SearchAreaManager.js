import { useState, useRef, useEffect, useCallback, useMemo } from "react";

const SearchAreaManager = () => {
  // Refs
  const advanceSearchDrawerRef = useRef(null);

  // local states
  const [isAdvanceSearchOpen, setIsAdvanceSearchOpen] = useState(false);

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

  // handlers
  const handleToggleAdvanceSearch = useCallback(() => {
    setIsAdvanceSearchOpen((prev) => !prev);
  }, [setIsAdvanceSearchOpen]);

  return {
    refs: { advanceSearchDrawerRef },
    data: { isAdvanceSearchOpen },
    actions: { handleToggleAdvanceSearch },
    classModifiers: { getFilterBtnClass },
  };
};

export default SearchAreaManager;
