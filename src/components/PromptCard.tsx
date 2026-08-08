import {Copy, Edit, Heart, Pin, Trash2, GripVertical,CopyPlus,} from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { toggleFavoriteBackend, togglePinBackend, deletePromptFromBackend,} from "../features/promptSlice";

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

  const prompt = {
    id,
    title,
    description,
    category,
    date,
    favorite,
    pinned,
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

      <div className="mt-4 flex gap-2">
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
            className="text-gray-400 hover:text-blue-600"
            title="Edit"
          >
            <Edit size={17} />
          </button>

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
    </div>
  );
};

export default PromptCard;