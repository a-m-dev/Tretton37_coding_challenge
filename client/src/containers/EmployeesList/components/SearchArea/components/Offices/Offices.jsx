import { Checkbox, Loading } from "../../../../../../components";
import { useSearchAreaContext } from "../../context";
import "./Offices.scss";

const Offices = () => {
  const {
    data: { avaliableOfficesLoading, avaliableOffices, selectedOffice },
    actions: { handleSelectedOffice },
  } = useSearchAreaContext();

  return (
    <section className="offices">
      <h2 className="offices__heading">OFFICES</h2>

      {avaliableOfficesLoading && <Loading />}

      <ul className="offices__options">
        {avaliableOffices.length > 0 &&
          avaliableOffices.map((office) => (
            <li key={office}>
              <Checkbox
                id={office}
                label={office}
                onChange={handleSelectedOffice}
                isChecked={selectedOffice === office}
              />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default Offices;
