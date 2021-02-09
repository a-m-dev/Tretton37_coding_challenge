import { Link } from "react-router-dom";
import LOGO from "../../images/logo.png";
import PublicRoutes from "../../utils/PublicRoutes";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <section className="container">
        <Link to={PublicRoutes.EmployeeList}>
          <img src={LOGO} alt="Tretton37" className="header__cover" />
        </Link>
      </section>
    </header>
  );
};

export default Header;
