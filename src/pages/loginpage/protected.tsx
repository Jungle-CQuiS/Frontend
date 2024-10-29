import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const userToken = localStorage.getItem("AccessToken");
  const navigate = useNavigate();

  useEffect(() => {

    const handleToken = (event: StorageEvent) => {
      if (event.key === "AccessToken" && event.newValue === null) {
        alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
        navigate('/login', { replace: true });
      }
    };

    window.addEventListener('storage', handleToken);

    return () => {
      window.removeEventListener('storage', handleToken);
    };
  }, [navigate]);
  // 로그인 상태가 아니면 로그인 페이지로 리디렉션
  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  // 로그인 상태면 요청한 페이지를 렌더링
  return children;
};

export default ProtectedRoute;
