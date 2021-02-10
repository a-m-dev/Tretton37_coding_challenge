import { Checkbox } from "../../../../../../components";
import { useSearchAreaContext } from "../../context";
import "./Sorting.scss";

const Sorting = () => {
  const {
    data: { getSortOptions, activeSortId },
    actions: { handleSortSelection },
  } = useSearchAreaContext();

  return (
    <section className="sorting">
      <h2 className="sorting__heading">SORTING</h2>

      <ul className="sorting__options">
        {getSortOptions.length > 0 &&
          getSortOptions.map((option) => (
            <li key={option.id}>
              <Checkbox
                id={option.id}
                label={
                  <span>
                    <i className={option.icon} />
                    {option.label}
                  </span>
                }
                onChange={handleSortSelection}
                isChecked={activeSortId === option.id}
              />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default Sorting;
