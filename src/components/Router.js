import { HashRouter as Router, Switch, Route } from "react-router-dom";
import AppAuth from "routes/Auth";
import AppHome from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn, userObj, userUpdate }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        <>
          {isLoggedIn ? (
            <div
              style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Route exact path="/">
                <AppHome userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={userObj} userUpdate={userUpdate} />
              </Route>
            </div>
          ) : (
            <>
              <Route exact path="/">
                <AppAuth />
              </Route>
            </>
          )}
        </>
      </Switch>
    </Router>
  );
};

export default AppRouter;
