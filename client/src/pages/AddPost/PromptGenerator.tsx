import { FormEvent, useState } from "react";
import { generateStoryAPI } from "../../utils/aiStoryFetch";
import PromptResponse from "./PromptResponse";
import { v4 as uuid } from "uuid";
function PromptGenerator() {
  const [prompt, setPrompt] = useState<string>("");
  const [responses, setResponses] = useState<PromptQuery[]>([]);
  const [currResponse, setCurrResponse] = useState("");
  const [isError, setError] = useState<boolean>(false);
  async function sendHandler(e: FormEvent) {
    e.preventDefault();
    try {
      const response: ReadableStream<Uint8Array> | undefined = await generateStoryAPI(prompt);
      if (!response) return;
      const reader = response.getReader();

      const textDecoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setCurrResponse((prev) => {
            const PromptAndResponse: PromptQuery = { id: uuid(), content: prev, prompt: prompt };
            setResponses((prev) => [...prev, PromptAndResponse]);
            return "";
          });
          break;
        }
        const res = textDecoder.decode(value);
        setCurrResponse((prev) => prev + res);
      }
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }

  if (isError) {
    return <div className="text-center">Whoops! something went wrong...</div>;
  }

  return (
    <div className="mx-auto max-w-screen-xl w-11/12 min-h-screen">
      <div className="space-y-5 pb-28">
        {/* previous responses */}
        {responses.length > 0 ? (
          responses.map((item) => <PromptResponse key={item.id} response={item} />)
        ) : (
          <div className="text-center text-lg mt-8">Start Writing a Fresh Prompt.</div>
        )}

        {/* current response */}
        {currResponse && <div className=" p-3 rounded border border-teal-500 ">{currResponse}</div>}
      </div>
      {/* fixed prompt input */}
      <form
        onSubmit={(e) => sendHandler(e)}
        className="flex bottom-2 right-2 left-2 bg-white fixed border border-red-500 rounded  p-3"
      >
        <textarea
          value={prompt}
          rows={1}
          className="resize-none text-textBlack600 w-full outline-none focus:bg-offWhite pl-3 pr-8"
          onChange={(e) => setPrompt(e.target.value)}
          id={prompt}
          placeholder="A quick brown fox jumped over..."
        />
        <button type="submit">
          <img
            width="28"
            height="28"
            src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/external-send-basic-ui-elements-flatart-icons-outline-flatarticons.png"
            alt="external-send-basic-ui-elements-flatart-icons-outline-flatarticons"
          />
        </button>
      </form>
    </div>
  );
}

export default PromptGenerator;
