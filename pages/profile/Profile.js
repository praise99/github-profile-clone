const baseUrl = "https://api.github.com/users/";
let repository_content;
let userName;
const Loading = document.getElementById("loading");
const complete_repositories_list = document.getElementById("repository_cards");
// GET USER NAME
window.onload = () => {
  document.getElementById("content").classList.add("loading_hide");
  let url = document.location.href,
    params = url.split("?")[1].split("&"),
    data = {},
    tmp;
  for (let i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split("=");
    data[tmp[0]] = tmp[1];
  }
  fetchGithubUser(data.name);
};
// FETCH USER
const fetchGithubUser = async (username) => {
  const url = baseUrl + username;
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (response.ok) {
      console.log(result);
      displayUserInfo(result);
      fetchUserRepository(result.login);
    } else {
      Loading.innerText = "User Not Found...Try a valid Github Username";
      setTimeout(() => {
        window.location.href = "/index.html";
      }, 1500);
    }
  } catch {
    console.log(error, "error");
  }
};
//FETCH USER REPOSITORY
const fetchUserRepository = async (username) => {
  const url = baseUrl + username + "/repos";
  try {
    const response = await fetch(url);
    const result = await response.json();
    if (response.ok) {
      let repositories = result.slice(0, 6);
      let complete_repositories = result.slice(0, 20);
      repository_content = result.slice(0, 20);
      document.getElementById("repository_number").innerText =
        repository_content.length;
      getTopRepository(repositories);
      getRepositoryList(complete_repositories);
      document.getElementById("content").classList.remove("loading_hide");
      Loading.classList.add("loading_hide");
    } else {
      console.log(result, "error");
    }
  } catch {
    console.log(error, "error");
  }
};
// DISPLAY USER INFORMATION
const displayUserInfo = (data) => {
  userName = data.login;
  document.getElementById("image_github").src = data.avatar_url;
  document.getElementById("logo_img").src = data.avatar_url;
  document.getElementById("logo_image_active").src = data.avatar_url;
  document.getElementById("logo_image").src = data.avatar_url;
  document.getElementById("short_name").innerText = data.name;
  document.getElementById("user_name").innerText = data.login;
  document.getElementById("user_name_active").innerText = data.login;
  document.getElementById("user_name_data").innerText = data.login;
  document.getElementById("bio").innerText = data.bio;
  document.getElementById("user_profile").href = data.html_url;
  document.getElementById("followers").innerText = data.followers;
  document.getElementById("following").innerText = data.following;
  document.getElementById("blog").innerHTML = `            <img
              src="../../assets/images/link.svg"
              alt="location"
             class= ${data.blog ? "icons-location" : "none"}
            />
            <a href=https://${data.blog}>           <p class= ${
    data.blog ? "location_text" : "none"
  }>
             ${data.blog?.slice(0, 40)}
            </p></a>
`;
  document.getElementById("location").innerHTML = `
                  <img
              src="../../assets//images//location.png"
              alt="location"
              class= ${data.location ? "icons-location" : "none"}
            />
            <p class= ${
              data.location ? "location_text" : "none"
            }>${data.location?.slice(0, 44)}</p>`;
  document.getElementById("email").innerHTML = `            <img
              src="../../assets//images/envelope.svg"
              alt="location"
              class= ${data.email ? "icons-location" : "none"}
            />
                        <a href=mailto:${
                          data.email
                        }>                     <p  class= ${
    data.email ? "location_text" : "none"
  }>${data.email?.slice(0, 44)}</p></a>
  `;
  document.getElementById("twitter").innerHTML = `            <img
              src="../../assets/images/twitter.svg"
              alt="location"
              class= ${data.twitter_username ? "icons-location" : "none"}

            />
                             <a href=https://twitter.com/${
                               data.twitter_username
                             }>            <p class= ${
    data.twitter_username ? "location_text" : "none"
  }>${data.twitter_username?.slice(0, 44)}</p></a>
`;
};
// SEARCH USER REPOSITORY
const searchRepositories = () => {
  let search = document.getElementById("searchValue").value;
  let searchRepository = repository_content.filter(function (el) {
    return el.name.includes(search);
  });
  if (searchRepository.length === 0) {
    complete_repositories_list.innerHTML = `<div class="empty_body">
      <h1 class="empty_content">${userName} doesn’t have any repositories that match.</h1>
    </div>`;
  } else {
    getRepositoryList(searchRepository);
  }
};
// DISPLAY USER REPOSITORY
const getRepositoryList = (data) => {
  if (data.length === 0) {
    complete_repositories_list.innerHTML = `<div class="empty_body">
      <h1 class="empty_content">${userName} doesn't have any public repositories yet.</h1>
    </div>`;
  } else {
    let completeRepositories = "";
    for (card of data) {
      completeRepositories += `
                   <li class="list">
              <div class="repository_card">
                <div class="card_top flex">
                  <div class="card_description flex">
                    <h1 class="card_title_repo">${card.name}</h1>
                    <div class="type">${
                      card.private ? "Private" : "Public"
                    }</div>
                  </div>
                  <div class="star_card btn flex">
                    <div class="first_star flex">
                      <img
                        src="../../assets//images//star.svg"
                        alt="custard"
                        class="star-icon"
                      />
                      <p class="star_description">Star</p>
                    </div>
                    <div class="second_star">
                      <img
                        src="../../assets/images/arrow-down.svg"
                        alt=""
                        class="star_second"
                      />
                    </div>
                  </div>
                </div>
                <div class="card_middle">
                  <p class="middle_description">${
                    card.description ? "list.description" : ""
                  }
                  </p>
                </div>
                <div class="card_end flex">
                  <p  class=${card.language ? "file_end_end" : "none"}>
                                  <span class="type_span"></span>
${card.language ? card.language : ""}</p>
                  <p class="file_end">Updated on ${new Date(
                    card.updated_at
                  ).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}</p>
                </div>
              </div>
            </li>
        `;
    }
    complete_repositories_list.innerHTML = completeRepositories;
  }
};
// DISPLAY USER POPULAR REPOSITORY
const getTopRepository = (item) => {
  let repositoryLists = document.getElementById("repository_list");
  if (item.length === 0) {
    repositoryLists.innerHTML = `<div class="empty_body">
      <h1 class="empty_content">You don't have any public repositories yet.</h1>
    </div>`;
  } else {
    let repository = "";
    for (list of item) {
      repository += `
              <li class="list_repository">
                <div class="card">
                  <div class="card_title flex">
                    <h3 class="card_title_name">${list.name}</h3>
                    <div class="type">${
                      list.private ? "Private" : "Public"
                    }</div>
                  </div>
                  <p class="subtitle">${
                    list.description ? "list.description" : ""
                  }</p>
                  <div class="flex">
                    <p class="file_end top_type">${
                      list.language ? list.language : ""
                    }</p>
                    <div>
                      <img src="../../assets/images/star.svg" alt="custard" class=
                      ${
                        list.stargazers_count !== 0 ? "star-icon_repo" : "none"
                      } />
                    </div>
                    <p class="subtitle">
                      ${
                        list.stargazers_count !== 0 ? list.stargazers_count : ""
                      }
                    </p>
                  </div>
                </div>
              </li>`;
    }

    repositoryLists.innerHTML = repository;
  }
};
