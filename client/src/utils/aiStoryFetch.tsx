import toast from "react-hot-toast";
const url = import.meta.env.VITE_BASE_URL + "/story/generatePrompt";

export const generateStoryAPI = async (prompt: string) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.body) throw new Error("No response from the server");

    if (response.status !== 200) throw new Error("Server error: " + response.status);
    return response.body;
  } catch (error) {
    toast.error("Some Error occurred");
    console.error("Error fetching story:", error);
  }
};
