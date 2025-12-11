import { Octokit } from "octokit";

const octokit = new Octokit();

async function loadUser(username) {
  const res = await octokit.request("GET /users/{username}", { username });
  const data = res.data;

  document.getElementById("avatar").src = data.avatar_url;
  document.getElementById("name").textContent = data.name;
  document.getElementById("bio").textContent = data.bio;
  document.getElementById("followers").textContent = data.followers;
  document.getElementById("repos").textContent = data.public_repos;
}

loadUser("acrticsludge");
