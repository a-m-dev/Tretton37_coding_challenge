import { Checkbox } from "../../../../../../components";
import { useSearchAreaContext } from "../../context";
import "./ContactLinks.scss";

const ContactLinks = () => {
  const {
    data: { getContactLinkOptions, selectedContactLists },
    actions: { handleSelectContactList },
  } = useSearchAreaContext();

  return (
    <section className="contact-links">
      <h2 className="contact-links__heading">Contact Links</h2>

      <ul className="contact-links__options">
        {getContactLinkOptions.length > 0 &&
          getContactLinkOptions.map((option) => (
            <li key={option.id}>
              <Checkbox
                id={option.id}
                label={option.label}
                onChange={handleSelectContactList}
                isChecked={selectedContactLists.includes(option.id)}
              />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default ContactLinks;
