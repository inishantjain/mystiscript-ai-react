import toast from "react-hot-toast";
import { useCreatePostMutation } from "../../app/apiSlice";
import { memo } from "react";
function PromptResponse({ response }: { response: PromptQuery }) {
  const [createPostApi, { isError, isLoading, isSuccess, error }] = useCreatePostMutation();
  function handleStoryPostCreate() {
    const title = response.content.split("\n")[0] || "";
    const content = response.content.split("\n").slice(1).join("\n") || response.content;
    createPostApi({ prompt: response.prompt, content, title });
  }

  if (isError) {
    toast.error("Error creating Post");
    console.error(error);
  }

  if (isSuccess) {
    return <div className="bg-offWhite p-3 rounded border border-red-500">Story Posted Successfully.</div>;
  }

  return (
    <div className="bg-offWhite p-3 rounded border border-teal-500 space-y-1">
      <div className="flex">
        <p className="flex-1">
          <span className="font-semibold">Prompt: </span>
          {response.prompt}
        </p>

        <button
          disabled={isLoading || isSuccess}
          onClick={handleStoryPostCreate}
          className="outline-conGreen outline px-2 text-lg right-3 top-0"
        >
          {isLoading ? <span className="animate-ping">...</span> : <span>Post</span>}
        </button>
      </div>
      <hr />
      <p className="whitespace-pre-wrap">{response.content}</p>
    </div>
  );
}

export default memo(PromptResponse);
