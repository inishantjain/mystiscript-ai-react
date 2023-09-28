import { useSearchParams } from "react-router-dom";
import CardsContainer from "./CardsContainer";
import Pagination from "./Pagination";
import { useGetPostPaginationQuery } from "../../app/apiSlice";
import LoaderView from "../../components/common/FullScreenLoader";

function index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1;
  const count = searchParams.get("count") ? parseInt(searchParams.get("count")!, 10) : 10;

  const { isLoading, data, isError } = useGetPostPaginationQuery({ page, count });
  if (isLoading) return <LoaderView />;
  if (data == null || isError) return <div>Error Occurred</div>;
  return (
    <>
      <h1 className="text-center text-xl">Explore Post By Others</h1>
      <CardsContainer data={data} />
      <Pagination setSearchParams={setSearchParams} page={page} />
    </>
  );
}

export default index;
