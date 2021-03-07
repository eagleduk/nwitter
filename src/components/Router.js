import { HashRouter as Router, Switch, Route } from "react-router-dom";
import AppAuth from "routes/Auth";
import AppHome from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <AppHome userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile />
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
