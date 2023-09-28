import { useNavigate } from "react-router-dom";
import { useGetUserPostsQuery } from "../../app/apiSlice";
import { useAppSelector } from "../../app/store";
import ErrorScreen from "../../components/common/ErrorScreen";
import LoaderView from "../../components/common/FullScreenLoader";
import StoryCard from "../../components/common/StoryCard";

function MyPostsSection() {
  const { user } = useAppSelector((state) => state.userState);
  const { isLoading, data, isError } = useGetUserPostsQuery(user?.username!);
  const navigate = useNavigate();
  if (isLoading) return <LoaderView />;
  if (isError) return <ErrorScreen />;

  // TODO:const showModal = () => {
  //   const dialogElement: HTMLDialogElement = document.getElementById("createOrEditPostModal") as HTMLDialogElement;
  //   if (!dialogElement) return;
  //   dialogElement.showModal();
  // };
  return (
    <section className="">
      <div className="w-11/12 max-w-screen-lg mx-auto py-10">
        <div className="flex gap-7 items-center">
          <h3 className="text-4xl">Stories Post By You</h3>
          <button
            className="outline p-1 outline-pink-600"
            onClick={() => {
              navigate("/addPost");
            }}
          >
            Add Post
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-10 mt-10">
          {data ? (
            data.map((story) => <StoryCard key={story.id} {...story} />)
          ) : (
            <h4 className="text-xl text-center col-span-2">Look Like You haven't posted anything yet.</h4>
          )}
        </div>
      </div>
    </section>
  );
}

export default MyPostsSection;
