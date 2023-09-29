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
    <div className="w-11/12 min-h-screen mx-auto py-10 max-w-screen-lg">
      <h1 className="text-center text-xl">Explore Post By Others</h1>
      <CardsContainer data={data} />
      <Pagination isLastPage={data.length < 10} setSearchParams={setSearchParams} page={page} />
    </div>
  );
}

export default index;
