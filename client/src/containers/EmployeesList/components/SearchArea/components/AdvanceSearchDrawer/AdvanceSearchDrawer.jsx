import { useMemo } from "react";
import { useSearchAreaContext } from "../../context";
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
      <section className="advance-search-drawer__body">
        THIS IS ADVANCE SEARCH DRAWER Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Beatae velit reiciendis modi at tempora saepe
        aspernatur sed architecto quis illo quia voluptas doloribus, natus
        dolorum consequatur quae? Culpa numquam alias deleniti illo praesentium
        eaque quas, a id. Cum, sunt maiores at error esse provident aut delectus
        nam blanditiis possimus rerum dolor nemo commodi vitae sapiente iusto
        molestias debitis nostrum consectetur ipsum nulla perferendis! Enim
        eaque dicta, aut quis harum iure rem unde eveniet rerum alias! Aperiam
        consequuntur recusandae ad voluptas consectetur a fugit, numquam porro
        itaque asperiores ipsam molestias vitae, accusamus quas libero
        praesentium rerum eligendi cupiditate quo nihil quis!
      </section>
    </article>
  );
};

export default AdvanceSearchDrawer;
