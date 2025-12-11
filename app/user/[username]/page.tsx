"use client";

import { useParams } from "next/navigation";
import { Octokit } from "octokit";
import { useState, useEffect } from "react";
import RepoCard from "./RepoCard";

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
  const username = params.username as string;

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const octokit = new Octokit({
          auth: process.env.GITHUB_TOKEN,
        });

        const { data } = await octokit.rest.users.getByUsername({
          username,
        });

        setUser(data as User);
      } catch (err: any) {
        setError(err.message || "User not found");
      } finally {
        setLoading(false);
      }
    };

    if (username) fetchUser();
  }, [username]);

  useEffect(() => {
    const octokit = new Octokit();
    async function fetchRepos() {
      const res = await octokit.request("GET /users/{username}/repos", {
        username,
        per_page: 100,
      });

      setRepos(res.data);
    }

    fetchRepos();
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
      <h1 className="text-2xl text-gray-600 font-semibold">
        {user!.name || user!.login}
      </h1>
      <p className="text-gray-600 mb-4">{user!.bio}</p>
      <div className="flex gap-6 text-gray-800 mb-4">
        <span>Repos: {user!.public_repos}</span>
        <span>Followers: {user!.followers}</span>
        <span>Following: {user!.following}</span>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {repos.map((repo) => (
            <RepoCard
              key={repo.id}
              name={repo.name}
              description={repo.description}
              html_url={repo.html_url}
              language={repo.language}
              stars={repo.stargazers_count}
            />
          ))}
        </div>
      </div>
      <a
        href={user!.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline mt-5"
      >
        View on GitHub
      </a>
    </div>
  );
}
