import { useResultAreaContext } from "../../context";
import "./TopHeading.scss";

const TopHeading = () => {
  const {
    data: { listViewType, getListViewTypes, totalResults },
    actions: { handleSwitchListViewType },
  } = useResultAreaContext();

  return (
    <section className="top-heading">
      <h2 className="top-heading__title">
        Employees <span>{totalResults > 0 && `( ${totalResults} )`}</span>
      </h2>
      <ul className="top-heading__list-types">
        {getListViewTypes.length > 0 &&
          getListViewTypes.map((listType) => (
            <li
              key={listType.id}
              className={`top-heading__list-types-element ${
                listViewType === listType.type &&
                "top-heading__list-types-element--active"
              } `}
            >
              <button onClick={() => handleSwitchListViewType(listType.type)}>
                <i className={listType.icon} />
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default TopHeading;
