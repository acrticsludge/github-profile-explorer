"use client";

interface RepoCardProps {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stars: number;
}

export default function RepoCard({
  name,
  description,
  html_url,
  language,
  stars,
}: RepoCardProps) {
  return (
    <a
      href={html_url}
      target="_blank"
      className="block p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all shadow-sm hover:shadow-md backdrop-blur-sm"
    >
      <h3 className="text-lg text-black font-semibold mb-1">{name}</h3>

      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
        {description || "No description provided."}
      </p>

      <div className="flex justify-between items-center text-sm text-gray-300 mt-2">
        <span className="px-2 py-1 rounded-md bg-white/10">
          {language || "Unknown"}
        </span>

        <span className="flex items-center gap-1">⭐ {stars}</span>
      </div>
    </a>
  );
}
