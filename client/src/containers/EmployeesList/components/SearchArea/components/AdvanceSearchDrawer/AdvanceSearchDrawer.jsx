import { useMemo } from "react";
import { useSearchAreaContext } from "../../context";
import Sorting from "../Sorting";
import Offices from "../Offices";
import ContactLinks from "../ContactLinks";
import "./AdvanceSearchDrawer.scss";

const AdvanceSearchDrawer = () => {
  const {
    refs: { advanceSearchDrawerRef },
    data: { isAdvanceSearchOpen },
  } = useSearchAreaContext();

  const getClassName = useMemo(() => {
    let result = "advance-search-drawer";
    if (isAdvanceSearchOpen) result += " advance-search-drawer--open";
    return result;
  }, [isAdvanceSearchOpen]);

  return (
    <article className={getClassName} ref={advanceSearchDrawerRef}>
      <div className="advance-search-drawer__body">
        <Sorting />
        <Offices />
        <ContactLinks />
      </div>
    </article>
  );
};

export default AdvanceSearchDrawer;
