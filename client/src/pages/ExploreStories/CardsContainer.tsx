import StoryCard from "../../components/common/StoryCard";
import { Post } from "../Post/types";

function CardsContainer({ data }: { data: Post[] }) {
  return (
    <>
      <div className="w-11/12 mx-auto max-w-screen-lg">
        <div className="justify-items-center py-10 grid md:grid-cols-2 gap-5">
          {data.map((post) => (
            <StoryCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default CardsContainer;
