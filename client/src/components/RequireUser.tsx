import { Navigate, Outlet } from "react-router-dom";
import { useGetUserQuery } from "../app/apiSlice";
import { useAppSelector } from "../app/store";
import LoaderView from "./common/FullScreenLoader";

function RequireUser() {
  const { isLoading, isFetching } = useGetUserQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });
  const { user } = useAppSelector((state) => state.userState);
  if (isLoading || isFetching) return <LoaderView />;
  else if (user != null) return <Outlet />;
  else return <Navigate to={"/login"} />;
}

export default RequireUser;
