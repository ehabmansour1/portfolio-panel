// --------------------menu-----------------------
let menu = document.getElementById("menu");
let sections = document.getElementById("sections");
menu.onclick = function () {
  if (menu.classList.contains("menu-opened")) {
    menu.classList.remove("menu-opened");
    sections.style.display = "none";
  } else {
    menu.classList.add("menu-opened");
    sections.style.display = "flex";
  }
};
let sectionsLinks = document.querySelectorAll(".sections a");
sectionsLinks.forEach((e) => {
  e.addEventListener("click", function () {
    menu.classList.remove("menu-opened");
    sections.style.display = "none";
  });
});
// --------------------menu-----------------------
// --------------------social-----------------------
let links = document.getElementById("links");
let social = document.getElementById("social");
links.onclick = function () {
  if (links.classList.contains("link-opened")) {
    links.classList.remove("link-opened");
    links.classList.add("link-closed");
    social.classList.remove("visible");
  } else {
    links.classList.remove("link-closed");
    links.classList.add("link-opened");
    social.classList.add("visible");
  }
};
// --------------------menu-----------------------
// --------------------loader-----------------------
var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});
// --------------------loader-----------------------
let targetApi = "https://6420ad6525cb6572104db57f.mockapi.io/projects";
let tbody = document.querySelector("tbody");
async function parseApi(api) {
  const response = await fetch(api);
  const projects = await response.json();
  tbody.innerHTML = "";
  projects.forEach((e) =>
    tbody.insertAdjacentHTML(
      "beforeend",
      `<tr id='${e.id}'>
  <td>${e.name}</td>
  <td>${e.img}</td>
  <td>${e.link}</td>
  <td>${e.type}</td>
  <td><i onclick=deleteProject(event) class="ai-cross deleteProject"></i></td>
</tr>`
    )
  );
}
parseApi(targetApi);
let addButt = document.querySelector("#add-butt");
addButt.addEventListener("click", function () {
  let prevData = [];
  fetch(targetApi)
    .then((result) => result.json())
    .then((result) => {
      prevData.concat([...result]);
      updateApi(result);
    });
});
function updateApi(prev) {
  let newProjects = [
    ...prev,
    {
      name: projname.value,
      img: img.value,
      link: projlink.value,
      type: type.value,
      id: new Date().getTime().toString(),
    },
  ];
  Upload(newProjects);
}
function Upload(upload) {
  fetch(
    "https://proxy.cors.sh/https://mockapi.io/api/mocks/6420ad6525cb6572104db580/resources/6420ad8982bea25f6d0574f8/data",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,ar;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-cors-api-key": "temp_0c1ad9035a2ea152af3216f21e365446",
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2NDFlMzQyZTA1OTYwOTljZTE1Y2E4YmUiLCJpYXQiOjE2Nzk3MDEwMzg0OTcsImV4cCI6MTc0Mjc3MzAzODQ5N30.KieBQBttFUkxeKNsN154GdCLBTd-eSY8ssXqHzGowNI",
        Referer: "https://mockapi.io/projects/6420ad6525cb6572104db580",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: `${JSON.stringify(upload)}`,
      method: "PUT",
    }
  ).then((w) => parseApi(targetApi));
}
function deleteProject(e) {
  let targetId = e.currentTarget.parentElement.parentElement.id;
  console.log(targetId);
  fetch(targetApi)
    .then((result) => result.json())
    .then((result) => {
      Upload(result.filter((item) => +item.id !== +targetId));
    });
}
