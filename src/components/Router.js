import { HashRouter as Router, Switch, Route } from "react-router-dom";
import AppAuth from "routes/Auth";
import AppHome from "routes/Home";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <AppHome />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <AppAuth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
