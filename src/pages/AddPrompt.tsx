import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { addPromptToBackend } from "../features/promptSlice";

const AddPrompt = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Coding");

  const handleSubmit = async () => {
    const newPrompt = {
      title,
      description,
      category,
      date: new Date().toISOString().split("T")[0],
      favorite: false,
      pinned: false,
    };

    try {
      await dispatch(addPromptToBackend(newPrompt)).unwrap();
      alert("Prompt Added Successfully")
      navigate("/");
    } catch (error) {
      console.error("Failed to add prompt:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Add Prompt
      </h1>

      <p className="mb-4 text-gray-500">
        Create a new prompt.
      </p>

      <div className="rounded-xl border bg-white p-4">

        {/* Title */}
        <div className="mb-3">
          <label className="mb-2 block font-medium">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter prompt title"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-purple-500"
          />
        </div>

        {/* Description */}
        <div className="mb-2">
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter prompt description"
            rows={5}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-purple-500"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="mb-2 block font-medium">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border px-4 py-3"
          >
            <option>Coding</option>
            <option>Marketing</option>
            <option>Content Writing</option>
            <option>Email</option>
            <option>Resume</option>
            <option>SQL</option>
            <option>Design</option>
            <option>Social Media</option>
            <option>Productivity</option>
            <option>Others</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">

          <button
            onClick={() => navigate("/")}
            className="rounded-lg border px-5 py-2.5"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-lg bg-purple-600 px-5 py-2.5 text-white"
          >
            Save Prompt
          </button>

        </div>
      </div>
    </div>
  );
};

export default AddPrompt;