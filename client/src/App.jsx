import { Switch, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { EmployeesList, Employee, NotFound } from "./containers";
import PublicRoutes from "./utils/PublicRoutes";

function App() {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route
            exact
            path={PublicRoutes.EmployeeList}
            component={EmployeesList}
          />
          <Route exact path={PublicRoutes.Employee} component={Employee} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
