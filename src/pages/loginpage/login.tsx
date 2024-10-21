import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Background } from "../../components/background/styled";

// uuid 생성 함수
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = (c === 'x') ? r : ((r & 0x3) | 0x8);  // 괄호로 연산 순서 명확히
    return v.toString(16);
  });
};


export default function LoginPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username) {
      // 임시로 uuid 생성 후 로컬 스토리지에 저장
      const userUuid = generateUUID();
      localStorage.setItem("uuid", userUuid); // 유저의 uuid 저장
      localStorage.setItem("username", username); // 유저 이름도 저장
      
      // 로그인 후 메인 페이지로 이동
      navigate("/main");
    }
  };

  return (
    <Background>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </Background>
  );
}