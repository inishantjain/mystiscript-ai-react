import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  const [redirectTime, setRedirectTime] = useState<number>(5);
  useEffect(() => {
    const id = setInterval(() => {
      setRedirectTime((prev) => prev - 1);
    }, 1000);
    setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="text-center min-h-screen p-10">
      <h1>Not Found the Page You are looking for.</h1>
      <p>Redirecting you to homepage in {redirectTime}s</p>
    </div>
  );
}

export default NotFoundPage;
