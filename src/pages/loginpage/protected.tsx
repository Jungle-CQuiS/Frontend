import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const userUuid = localStorage.getItem("uuid");
  console.log(userUuid);

  // 로그인 상태가 아니면 로그인 페이지로 리디렉션
  if (!userUuid) {
    return <Navigate to="/login" replace />;
  }

  // 로그인 상태면 요청한 페이지를 렌더링
  return children;
};

export default ProtectedRoute;
