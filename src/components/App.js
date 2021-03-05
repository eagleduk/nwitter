import { useState } from "react";
import AppRouter from "components/Router";
import { AuthService } from "FBInstance";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
