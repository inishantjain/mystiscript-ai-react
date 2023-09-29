import StoryCard from "../../components/common/StoryCard";
import { Post } from "../Post/types";

function CardsContainer({ data }: { data: Post[] }) {
  return (
    <div className="justify-items-center py-10 grid md:grid-cols-2 gap-10">
      {data.map((post) => (
        <StoryCard key={post.id} {...post} />
      ))}
    </div>
  );
}

export default CardsContainer;
