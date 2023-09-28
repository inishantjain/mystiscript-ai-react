import { Link } from "react-router-dom";
import LoaderView from "../../components/common/FullScreenLoader";
import { useGetPostPaginationQuery } from "../../app/apiSlice";
import StoryCard from "../../components/common/StoryCard";

function LatestStories() {
  const { isLoading, data, isError } = useGetPostPaginationQuery({ page: 1, count: 10 });
  if (isLoading) return <LoaderView />;
  if (data == null || isError) return <div>Error Occurred</div>;
  return (
    <section>
      <div className="mx-auto w-11/12 max-w-screen-lg mt-6">
        <h2 className="text-3xl font-semibold">Latest Stories</h2>
        <div className="justify-items-center pt-10 grid md:grid-cols-2 gap-5">
          {data.map((post) => (
            <StoryCard key={post.id} {...post} />
          ))}
        </div>
        <div className="text-textBlack600 flex justify-center py-6">
          {/* <StoryCard/> */}
          <Link
            className="outline outline-rose-500 outline-2 p-1 hover:scale-105 transition-transform"
            to="/post/exploreStories?page=2&count=10"
          >
            Load More
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestStories;
