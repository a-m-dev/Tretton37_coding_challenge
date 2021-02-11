import { Link } from "react-router-dom";
import PublicRoutes from "../../../../../../utils/PublicRoutes";
import EmployeeCardManager from "./EmployeeCardManager";
import "./EmployeeCard.scss";

const EmployeeCard = ({
  _id,
  name,
  office,
  imageBodyUrl,
  imagePortraitUrl,
  mainText,
  ...rest
}) => {
  const {
    data: { getCardClass, getContactLinks },
  } = EmployeeCardManager(rest);

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

      {getContactLinks.length > 0 && (
        <div className="employee-card__contact-links">
          {getContactLinks.map(({ id, link, icon }) => (
            <a key={id} href={link} target="_blank">
              <i className={icon} />
            </a>
          ))}
        </div>
      )}
    </article>
  );
};

export default EmployeeCard;
