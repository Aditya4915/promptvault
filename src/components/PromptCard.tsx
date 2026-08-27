import {
  Copy,
  Edit,
  Heart,
  Pin,
  Trash2,
  GripVertical,
  CopyPlus,
  X,
} from "lucide-react";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import type { AppDispatch } from "../redux/store";

import {
  toggleFavoriteBackend,
  togglePinBackend,
  deletePromptFromBackend,
  updatePromptBackend,
} from "../features/promptSlice";

interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  favorite: boolean;
  pinned: boolean;
}

const PromptCard = ({
  id,
  title,
  description,
  category,
  date,
  favorite,
  pinned,
}: PromptCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isEditing, setIsEditing] = useState(false);

  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editCategory, setEditCategory] = useState(category);

  // Reset form whenever edit modal opens
  useEffect(() => {
    if (isEditing) {
      setEditTitle(title);
      setEditDescription(description);
      setEditCategory(category);
    }
  }, [isEditing, title, description, category]);

  const prompt = {
    id,
    title,
    description,
    category,
    date,
    favorite,
    pinned,
  };

  const handleUpdate = async () => {
    if (
      editTitle.trim() === "" ||
      editDescription.trim() === "" ||
      editCategory.trim() === ""
    ) {
      alert("Please add valid details");
      return;
    }

    try {
      await dispatch(
        updatePromptBackend({
          id,
          data: {
            title: editTitle.trim(),
            description: editDescription.trim(),
            category: editCategory.trim(),
          },
        })
      ).unwrap();

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update prompt:", error);
      alert("Failed to update prompt");
    }
  };

  return (
    <div className="rounded-xl border bg-white p-5">

      {/* Top */}
      <div className="flex items-center justify-between">
        <GripVertical
          size={18}
          className="cursor-grab text-gray-400"
        />

        <div className="flex gap-3">

          {/* Favorite */}
          <button
            onClick={() =>
              dispatch(toggleFavoriteBackend(prompt))
            }
            className={
              favorite
                ? "text-red-500"
                : "text-gray-400 hover:text-red-500"
            }
            title="Favorite"
          >
            <Heart
              size={18}
              fill={favorite ? "currentColor" : "none"}
            />
          </button>

          {/* Pin */}
          <button
            onClick={() =>
              dispatch(togglePinBackend(prompt))
            }
            className={
              pinned
                ? "text-purple-600"
                : "text-gray-400 hover:text-purple-600"
            }
            title="Pin"
          >
            <Pin
              size={18}
              fill={pinned ? "currentColor" : "none"}
            />
          </button>

        </div>
      </div>

      {/* Content */}
      <h2 className="mt-4 text-lg font-semibold text-gray-900">
        {title}
      </h2>

      <p className="mt-2 line-clamp-2 text-sm text-gray-500">
        {description}
      </p>

      {/* Category */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
          {category}
        </span>

        <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
          Created at: {date}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

        {/* Copy */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(description);
          }}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600"
        >
          <Copy size={16} />
          Copy
        </button>

        <div className="flex items-center gap-3">

          {/* Duplicate */}
          <button
            className="text-gray-400 hover:text-purple-600"
            title="Duplicate"
          >
            <CopyPlus size={17} />
          </button>

          {/* Edit */}
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-blue-600"
            title="Edit"
          >
            <Edit size={17} />
          </button>

          {/* Delete */}
          <button
            onClick={() => {
              const confirmed = window.confirm(
                "Are you sure you want to delete this prompt?"
              );

              if (confirmed) {
                dispatch(deletePromptFromBackend(id));
              }
            }}
            className="text-gray-400 hover:text-red-600"
            title="Delete"
          >
            <Trash2 size={17} />
          </button>

        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

            {/* Close */}
            <button
              onClick={() => setIsEditing(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              Edit Prompt
            </h2>

            {/* Title */}
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Title
              </label>

              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                value={editDescription}
                onChange={(e) =>
                  setEditDescription(e.target.value)
                }
                rows={5}
                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Category */}
            <div className="mb-5">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category
              </label>

              <input
                type="text"
                value={editCategory}
                onChange={(e) =>
                  setEditCategory(e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">

              <button
                onClick={() => setIsEditing(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
              >
                Save Changes
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default PromptCard;