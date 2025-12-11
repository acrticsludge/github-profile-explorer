"use client";
import { Octokit } from "octokit";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  interface GitHubUser {
    login: string;
    name: string | null;
    bio: string | null;
    avatar_url: string;
    followers: number;
    public_repos: number;
  }

  const [userdata, setUserdata] = useState<GitHubUser | null>(null);
  const [user, setUser] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (user.trim() === "") return;

    router.push(`/user/${user.trim()}`);
  };
  useEffect(() => {
    async function loadUser() {
      const octokit = new Octokit();
      const res = await octokit.request("GET /users/{username}", {
        username: user,
      });

      setUserdata(res.data);
    }
    loadUser();
  }, []);

  if (!userdata) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-12 px-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Explore GitHub Profiles
        </h1>

        <div className="w-full max-w-xl text-black relative">
          <input
            type="text"
            placeholder="Search for a GitHub user..."
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full px-5 py-4 rounded-xl border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <button
            className="absolute right-2 top-2/4 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-xl transition-colors duration-200"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
