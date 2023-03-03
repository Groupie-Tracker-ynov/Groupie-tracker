//Menu burger
var burgerMenu = document.getElementById("burger-menu");
var overlay = document.getElementById("menu");
burgerMenu.addEventListener("click", function () {
  this.classList.toggle("close");
  overlay.classList.toggle("overlay");
});

// Path: Connexion api go/js/index.js
function displayAllArtists() {
  fetch("http://localhost:8080/groupietracker")
    .then((res) => res.json())
    .then((data) => {
      const container = document.querySelector(".container-main");
      container.innerHTML = "";
      data.artistes.forEach((artiste) => {
        const div = document.createElement("div");
        div.innerHTML = `
                <a href="/groupietracker/artiste/${artiste.ID}" id="cards">
                    <div class="card">
                    <div class="back-img" style="background: no-repeat url('${artiste.Image}') center;"></div>
                    <div class="contenue">
                        <img src="${artiste.Image}" alt="${artiste.Nom}" class="img">
                        <h1 class="h1">${artiste.Nom}</h1>
                    </div>
                    </div>
                </a>
                `;
        container.appendChild(div);
      });
    });
}
function displayAllArtistsAsc() {
  fetch("http://localhost:8080/groupietracker/asc")
    .then((res) => res.json())
    .then((data) => {
      const container = document.querySelector(".container-main");
      container.innerHTML = "";
      data.artistes.forEach((artiste) => {
        const div = document.createElement("div");
        div.innerHTML = `
                <a href="/groupietracker/artiste/${artiste.ID}" id="cards">
                    <div class="card">
                    <div class="back-img" style="background: no-repeat url('${artiste.Image}') center;"></div>
                    <div class="contenue">
                        <img src="${artiste.Image}" alt="${artiste.Nom}" class="img">
                        <h1 class="h1">${artiste.Nom}</h1>
                    </div>
                    </div>
                </a>
                `;
        container.appendChild(div);
      });
    });
}
function displayAllArtistsDesc() {
  fetch("http://localhost:8080/groupietracker/desc")
    .then((res) => res.json())
    .then((data) => {
      const container = document.querySelector(".container-main");
      container.innerHTML = "";
      data.artistes.forEach((artiste) => {
        const div = document.createElement("div");
        div.innerHTML = `
                <a href="/groupietracker/artiste/${artiste.ID}" id="cards">
                    <div class="card">
                    <div class="back-img" style="background: no-repeat url('${artiste.Image}') center;"></div>
                    <div class="contenue">
                        <img src="${artiste.Image}" alt="${artiste.Nom}" class="img">
                        <h1 class="h1">${artiste.Nom}</h1>
                    </div>
                    </div>
                </a>
                `;
        container.appendChild(div);
      });
    });
}
function displayAllArtistsRec() {
  fetch("http://localhost:8080/groupietracker/rec")
    .then((res) => res.json())
    .then((data) => {
      const container = document.querySelector(".container-main");
      container.innerHTML = "";
      data.artistes.forEach((artiste) => {
        const div = document.createElement("div");
        div.innerHTML = `
                <a href="/groupietracker/artiste/${artiste.ID}" id="cards">
                    <div class="card">
                    <div class="back-img" style="background: no-repeat url('${artiste.Image}') center;"></div>
                    <div class="contenue">
                        <img src="${artiste.Image}" alt="${artiste.Nom}" class="img">
                        <h1 class="h1">${artiste.Nom}</h1>
                    </div>
                    </div>
                </a>
                `;
        container.appendChild(div);
      });
    });
}
function displayAllArtistsAnc() {
  fetch("http://localhost:8080/groupietracker/anc")
    .then((res) => res.json())
    .then((data) => {
      const container = document.querySelector(".container-main");
      container.innerHTML = "";
      data.artistes.forEach((artiste) => {
        const div = document.createElement("div");
        div.innerHTML = `
                <a href="/groupietracker/artiste/${artiste.ID}" id="cards">
                    <div class="card">
                    <div class="back-img" style="background: no-repeat url('${artiste.Image}') center;"></div>
                    <div class="contenue">
                        <img src="${artiste.Image}" alt="${artiste.Nom}" class="img">
                        <h1 class="h1">${artiste.Nom}</h1>
                    </div>
                    </div>
                </a>
                `;
        container.appendChild(div);
      });
    });
}

displayAllArtists();

//Systeme de recherche
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
let art = [];

async function recherche(search) {
  await fetch(`http://localhost:8080/groupietracker/${search}`)
    .then((res) => res.json())
    .then((data) => (art = data.art));
  console.log(art);
}

function searchDisplay() {
  searchInput.addEventListener("input", (e) => {
    e.preventDefault();

    searchResults.innerHTML = "";
    if (art === null) {
      searchResults.innerHTML = "Aucun résultat trouvé.";
    } else {
      const container = document.querySelector(".container-main");
      container.innerHTML = `<h2>${artiste.Nom}</h2>`;
      searchResults.appendChild(container);
    }
  });
}

recherche();
searchDisplay();
