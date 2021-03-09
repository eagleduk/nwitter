import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "FBInstance";

const AppAuth = () => {
  // social 로그인에 대한 이벤트
  const onSocialClick = (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    authService.signInWithPopup(provider);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default AppAuth;
