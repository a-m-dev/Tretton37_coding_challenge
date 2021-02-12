import { useMemo } from "react";
import { useEmployeeContext } from "../../context";
import getContactListLinks from "../../../../utils/getContactListLinks";
import "./HeadingBox.scss";

const HeadingBox = () => {
  const {
    data: { employeeData },
  } = useEmployeeContext();

  const getContactLinks = useMemo(() => {
    return getContactListLinks({
      linkedIn: employeeData?.linkedIn,
      twitter: employeeData?.twitter,
      gitHub: employeeData?.gitHub,
      stackOverflow: employeeData?.stackOverflow,
    });
  }, [employeeData]);

  return (
    <section className="heading-box">
      <div className="heading-box__avatar">
        {employeeData?.imagePortraitUrl ? (
          <img src={employeeData?.imagePortraitUrl} alt={employeeData?.name} />
        ) : (
          <i className="icon-user" />
        )}
      </div>

      <div className="heading-box__employee-data">
        <h1 className="heading-box__employee-data-name">
          {employeeData?.name}
        </h1>
        <span className="heading-box__employee-data-location">
          <i className="icon-location" />
          {employeeData?.office || "Lund"}
        </span>
      </div>

      {getContactLinks.length > 0 && (
        <div className="heading-box__contact-links">
          {getContactLinks.map(({ id, link, icon }) => (
            <a key={id} href={link} target="_blank">
              <i className={icon} />
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default HeadingBox;
