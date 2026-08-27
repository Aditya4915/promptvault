const API_URL = "https://prompt-backend-4ipo.onrender.com";


// =========================
// GET PROMPTS
// =========================

export const getPrompts = async () => {
  const response = await fetch(`${API_URL}/prompts`);

  if (!response.ok) {
    throw new Error("Failed to fetch prompts");
  }

  return response.json();
};


// =========================
// CREATE PROMPT
// =========================

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


// =========================
// UPDATE PROMPT
// Favorite / Pin / Edit
// =========================

export const updatePrompt = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    category?: string;
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


// =========================
// DELETE PROMPT
// =========================

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