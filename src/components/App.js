import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "FBInstance";

function App() {
  const [init, setInit] = useState(false);
  // 유저 상태에 대한 Hook
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    // 인증에 대한 변화가 감지되었을 때
    authService.onAuthStateChanged((user) => {
      if (user) {
        //setUserObj(user);
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const userUpdate = () => {
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          userUpdate={userUpdate}
        />
      ) : (
        "Loading...."
      )}
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;
