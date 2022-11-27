const repoList = document.querySelector(".js-repo-list");


fetch("https://api.github.com/users/Neschadin/repos")
  .then(getStatus)
  .then(buildRepoList)
  .catch(alert);


function getStatus(response) {
  return response.status === 200 ?
    response.json() :
    Promise.reject(new Error(response.status));
}


function getCommitDate(repoName) {
  fetch(`https://api.github.com/repos/Neschadin/${repoName}/commits`)
    .then(getStatus)
    .then(response => alert("last commit: " + response[0].commit.author.date))
    .catch(alert);
}


function buildRepoList(response) {
  response.forEach((item) => {
    const elem = createHTMLElement(item);

    repoList.append(elem);
  });
  
  repoList.addEventListener("click", (e) => {
    if (e.target.className === "js-list-item") getCommitDate(e.target.innerText);
  });
}


function createHTMLElement(item) {
  const elem = document.createElement("li");

  elem.className = "js-list-item";
  elem.innerText = item.name;

  return elem;
}