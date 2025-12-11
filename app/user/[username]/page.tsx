"use client";

import { useParams } from "next/navigation";
import { Octokit } from "octokit";
import { useState, useEffect } from "react";

interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}
export default function UserPageClient() {
  const params = useParams();
  const username = params.username;
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const octokit = new Octokit();
        const res = await fetch(`https://api.github.com/users/${username}`, {
          cache: "no-store",
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        });
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUser(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  if (loading) return <p className="text-center mt-12">Loading...</p>;
  if (error) return <p className="text-center mt-12 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center mt-12 px-4">
      <img
        src={user!.avatar_url}
        alt={user!.login}
        className="w-32 h-32 rounded-full mb-4"
      />
      <h1 className="text-2xl font-semibold">{user!.name || user!.login}</h1>
      <p className="text-gray-600 mb-4">{user!.bio}</p>
      <div className="flex gap-6 text-gray-800 mb-4">
        <span>Repos: {user!.public_repos}</span>
        <span>Followers: {user!.followers}</span>
        <span>Following: {user!.following}</span>
      </div>
      <a
        href={user!.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        View on GitHub
      </a>
    </div>
  );
}
