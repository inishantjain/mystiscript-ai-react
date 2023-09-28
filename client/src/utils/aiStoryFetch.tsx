const url = import.meta.env.VITE_BASE_URL + "/story/generatePrompt";
// type React.Dispatch<React.SetStateAction<string>>;
export const generateStoryAPI = async (prompt: string) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.body) {
      throw new Error("No response from the server");
    }

    return response.body;
  } catch (error) {
    console.error("Error fetching story:", error);
  }
};
