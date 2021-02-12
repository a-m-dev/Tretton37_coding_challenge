import { useEmployeeContext } from "../../context";
import "./Description.scss";

const Description = () => {
  const {
    data: { employeeData },
  } = useEmployeeContext();

  return (
    <section className="description">
      <div dangerouslySetInnerHTML={{ __html: employeeData?.mainText }} />
    </section>
  );
};

export default Description;
