import { Link } from "react-router-dom";
import { Error } from "../../components";
import PublicRoutes from "../../utils/PublicRoutes";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <article className="not-found">
      <section className="container">
        <Error heading="You've Lost" message="Page not found" />
        <Link to={PublicRoutes.EmployeeList}>Go Back To Home</Link>
      </section>
    </article>
  );
};

export default NotFound;
