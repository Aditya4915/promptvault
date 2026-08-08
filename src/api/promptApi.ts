const API_URL = "http://127.0.0.1:5000";


// GET
export const getPrompts = async () => {
  const response = await fetch(`${API_URL}/prompts`);

  if (!response.ok) {
    throw new Error("Failed to fetch prompts");
  }

  return response.json();
};


// POST
export const createPrompt = async (prompt: {
  title: string;
  description: string;
  category: string;
  date: string;
  favorite: boolean;
  pinned: boolean;
}) => {
  const response = await fetch(`${API_URL}/prompts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prompt),
  });

  if (!response.ok) {
    throw new Error("Failed to create prompt");
  }

  return response.json();
};


// PUT - Favorite / Pin
export const updatePrompt = async (
  id: string,
  data: {
    favorite?: boolean;
    pinned?: boolean;
  },
) => {
  const response = await fetch(
    `${API_URL}/prompts/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update prompt");
  }

  return response.json();
};


// DELETE
export const deletePromptApi = async (id: string) => {
  const response = await fetch(
    `${API_URL}/prompts/${id}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete prompt");
  }

  return response.json();
};