import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../../app/apiSlice";
import { useAppSelector } from "../../app/store";
import { formatDate } from "../../utils/formatDate";
import LoaderView from "../../components/common/FullScreenLoader";
import ShareLinks from "./ShareLinks";
import SaveAndUpVote from "./SaveAndUpVote";

function PostPage() {
  const { postId } = useParams();
  const { isLoading, isFetching } = useGetPostQuery(postId!, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });
  const { post } = useAppSelector((state) => state.postState);
  const { user } = useAppSelector((state) => state.userState);
  if (isLoading || isFetching) return <LoaderView />;

  return (
    <div>
      <div className="text-brownie mx-auto max-w-screen-lg py-10">
        {/* title */}
        <h1 className="text-4xl font-semibold">{post?.title}</h1>

        {/* Author, ShareLinks */}
        <div className="flex text-lg gap-5 items-center mt-8 mb-4">
          <div className="flex items-center">
            <img
              src={`https://api.dicebear.com/7.x/pixel-art/svg?seed${post?.author?.name}`}
              alt="user_image"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span>{post?.author.name}</span>
          </div>
          <div>
            <span className="text-gray-500">{formatDate(post?.createdAt!)}</span>
          </div>
          {/* <span className="flex-1">spacer</span> */}
          <ShareLinks />
        </div>

        {/* save | up vote/heart */}
        <SaveAndUpVote
          postId={postId!}
          isLiked={post?.likedBy.some((like) => like.username === user?.username) || false}
          likeCount={post?.likedBy.length || 0}
          isSaved={user?.savedPosts.some((post) => post.id === postId) || false}
        />
        <div className="mt-4">
          <h4>
            <span className="font-bold">Prompt</span> : {post?.prompt}
          </h4>
        </div>
        {/* Story/Article */}
        <div className="space-y-5">{post?.content}</div>
      </div>
    </div>
  );
}

export default PostPage;
