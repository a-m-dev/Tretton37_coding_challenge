import LOGO from "../../images/logo.png";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <section className="container">
        <img src={LOGO} alt="Tretton37" className="header__cover" />
      </section>
    </header>
  );
};

export default Header;
