import { Link } from "react-router-dom";
import { Post } from "../../pages/Post/types";

const StoryCard: React.FC<Post> = ({ prompt, author, title, content, id }) => {
  return (
    <div className="bg-white p-7 border border-fuchsia-500">
      {/* Header */}
      <header className="flex font-light text-sm ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 rotate-90 -ml-2"
          viewBox="0 0 24 24"
          stroke="#b91c1c"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
        </svg>
        <p className="line-clamp-1">Prompt : {prompt}</p>
      </header>

      {/* Title */}
      <h2 className="font-semibold text-xl mt-2 line-clamp-1">{title}</h2>

      {/* Tags */}
      <p className="mt-2">
        By:&nbsp;
        <Link to={`/profile/${author?.username}`} className="text-pink-600">
          {/* FIXME:</Link> */}
          {author?.name}
        </Link>
      </p>

      {/* content */}
      <p className="whitespace-pre-wrap font-light line-clamp-3 lg:line-clamp-5 mt-2">{content}</p>

      {/* Go to full Post */}
      <Link
        to={`/post/${id}`}
        className="bg-pink-600 text-white font-semibold py-2 px-5 text-sm mt-6 inline-flex items-center group"
      >
        <p> READ MORE </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1 group-hover:translate-x-2 delay-100 duration-200 ease-in-out"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};

export default StoryCard;
