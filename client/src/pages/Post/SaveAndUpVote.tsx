import React from "react";
import { useLikePostMutation, useSavePostMutation } from "../../app/apiSlice";
import SavedOutline from "../../assets/images/saved";
import SavedFilled from "../../assets/images/savedFilled";
import HeartOutline from "../../assets/images/heartOutline";
import HeartFilled from "../../assets/images/heartFilled";
interface props {
  postId: string;
  isLiked: boolean;
  isSaved: boolean;
  likeCount: number;
}

const SaveAndUpVote: React.FC<props> = ({ isLiked, isSaved, postId, likeCount }: props) => {
  const [liked, setLiked] = React.useState(isLiked); //creating local variables for quick response
  const [saved, setSaved] = React.useState(isSaved);
  //   const {} = useGetPostQuery();

  const [likePost] = useLikePostMutation();
  const [savePost] = useSavePostMutation();

  const [timeoutId, setTimeoutId] = React.useState(-1); //should persist state changes

  function likePostHandler(postId: string) {
    //debounce
    clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        setLiked((t) => !t);
        likePost(postId); //api call
      }, 1000)
    );
  }
  function savePostHandler(postId: string) {
    //debounce
    clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        setSaved((t) => !t);
        savePost(postId); //api call
      }, 1000)
    );
  }

  return (
    <div className="ml-2 flex items-center gap-8">
      {/* save button */}
      <div className="flex items-center gap-3 text-xl font-semibold">
        <button onClick={() => likePostHandler(postId)} className="text-lg">
          {liked ? <HeartFilled width={24} height={24} /> : <HeartOutline width={24} height={24} />}
        </button>
        <span>{likeCount}</span>
      </div>
      {/* save button */}
      <button onClick={() => savePostHandler(postId)} className="flex items-center gap-1 font-semibold">
        {saved ? <SavedFilled width={24} height={24} /> : <SavedOutline width={24} height={24} />}
        <span>{saved ? "unsave" : "Save"}</span>&nbsp;
      </button>
    </div>
  );
};

export default SaveAndUpVote;
