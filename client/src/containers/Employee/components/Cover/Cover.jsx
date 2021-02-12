import { useEmployeeContext } from "../../context";
import "./Cover.scss";

const Cover = () => {
  const {
    data: { employeeData },
  } = useEmployeeContext();

  return (
    <section className="cover">
      {employeeData?.imageWallOfLeetUrl ? (
        <img src={employeeData?.imageWallOfLeetUrl} alt={employeeData?.name} />
      ) : (
        <i className="icon-aperture" />
      )}
    </section>
  );
};

export default Cover;
