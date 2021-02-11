import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ListViewTypes } from "../../../../../../constants";
import PublicRoutes from "../../../../../../utils/PublicRoutes";
import { useResultAreaContext } from "../../context";
import "./EmployeeCard.scss";

const EmployeeCard = ({
  _id,
  name,
  email,
  office,
  phoneNumber,
  orgUnit,
  tagLine,
  github,
  stackOverflow,
  linkedIn,
  twitter,
  highlighted,
  imageBodyUrl,
  imagePortraitUrl,
  imageWallOfLeetUrl,
  mainText,
  manager,
}) => {
  const {
    data: { listViewType },
  } = useResultAreaContext();

  const getCardClass = useMemo(() => {
    let result = "employee-card";
    if (listViewType === ListViewTypes.LIST) result += " employee-card--list";
    else if (listViewType === ListViewTypes.GRID)
      result += " employee-card--grid";
    return result;
  }, [listViewType]);

  return (
    <article className={getCardClass}>
      <Link to={PublicRoutes.PushToEmployeeRoute(_id)}>
        <section className="employee-card__avatar">
          {imageBodyUrl ? (
            <img src={imagePortraitUrl} alt={name} />
          ) : (
            <i className="icon-user" />
          )}
        </section>

        <section className="employee-card__details">
          <h2>{name}</h2>
          <span>
            <i className="icon-location" />
            {office}
          </span>

          <div
            dangerouslySetInnerHTML={{ __html: mainText }}
            className="employee-card__details-desc"
          />
        </section>
      </Link>
    </article>
  );
};

export default EmployeeCard;
