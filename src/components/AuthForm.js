import { authService } from "FBInstance";
import { useState } from "react";

const AuthForm = () => {
  // email 값에 대한 Hook
  const [email, setEmail] = useState("");
  // password 값에 대한 Hook
  const [password, setPassword] = useState("");
  // 새로운 인증(가입), 기존 인증(로그인) 인지 판별하는 Hook
  const [newAccount, setNewAccount] = useState(true);
  // error 발생에 대한 Hook
  const [error, setError] = useState("");
  // input text의 change 이벤트
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // form 의 submit 함수 - 사용자 인증
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // 가입/로그인 상태에 대한 토글 함수
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
