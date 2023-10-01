import { Link, Navigate, Outlet } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { useAppSelector } from "../../app/store";
export { Login, Register };

function AuthenticationPage() {
  const { user } = useAppSelector((state) => state.userState);
  if (user) return <Navigate to={"/profile"} />;
  return (
    <div className="min-h-screen flex flex-col gap-y-6 items-center justify-center bg-offWhite">
      <Link className="font-rancho text-3xl font-semibold" to="/">
        MystiScript
      </Link>
      <div className="max-w-md w-11/12 p-6 ring ring-conGreen ring-opacity-50 rounded-lg shadow-2xl bg-rose-50">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthenticationPage;
