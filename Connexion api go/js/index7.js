//Menu burger
var burgerMenu = document.getElementById("burger-menu");
var overlay = document.getElementById("menu");
burgerMenu.addEventListener("click", function () {
  this.classList.toggle("close");
  overlay.classList.toggle("overlay");
});

function displayAllArtists() {
  fetch("http://localhost:8080/groupietracker")
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".container-main-art").innerHTML = "";
      const container = document.querySelector(".container-main");
      console.log(data.artistes);
      container.innerHTML = "";
      data.artistes.forEach((artiste) => {
        const div = document.createElement("div");
        div.innerHTML = `
                <a href="#" class="cards" data-id="${artiste.ID}">
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
      const myLink = document.querySelectorAll(".cards");
      myLink.forEach((element) => {
        element.addEventListener("click", function (event) {
          event.preventDefault();
          const artisteId = this.getAttribute("data-id");
          displayArtistById(artisteId);
        });
      });
    });
}
function displayAllArtistsAsc() {
  fetch("http://localhost:8080/groupietracker/asc")
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".container-main-art").innerHTML = "";
      const container = document.querySelector(".container-main");
      container.innerHTML = "";
      data.artistes.forEach((artiste) => {
        const div = document.createElement("div");
        div.innerHTML = `
                <a href="#" class="cards" data-id="${artiste.ID}">
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
      const myLink = document.querySelectorAll(".cards");
      myLink.forEach((element) => {
        element.addEventListener("click", function (event) {
          event.preventDefault();
          const artisteId = this.getAttribute("data-id");
          displayArtistById(artisteId);
        });
      });
    });
}
function displayAllArtistsDesc() {
  fetch("http://localhost:8080/groupietracker/desc")
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".container-main-art").innerHTML = "";
      const container = document.querySelector(".container-main");
      container.innerHTML = "";
      data.artistes.forEach((artiste) => {
        const div = document.createElement("div");
        div.innerHTML = `
                <a href="#" class="cards" data-id="${artiste.ID}">
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
      const myLink = document.querySelectorAll(".cards");
      myLink.forEach((element) => {
        element.addEventListener("click", function (event) {
          event.preventDefault();
          const artisteId = this.getAttribute("data-id");
          displayArtistById(artisteId);
        });
      });
    });
}
function displayAllArtistsRec() {
  fetch("http://localhost:8080/groupietracker/rec")
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".container-main-art").innerHTML = "";
      const container = document.querySelector(".container-main");
      container.innerHTML = "";
      data.artistes.forEach((artiste) => {
        const div = document.createElement("div");
        div.innerHTML = `
                <a href="#" class="cards" data-id="${artiste.ID}">
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
      const myLink = document.querySelectorAll(".cards");
      myLink.forEach((element) => {
        element.addEventListener("click", function (event) {
          event.preventDefault();
          const artisteId = this.getAttribute("data-id");
          displayArtistById(artisteId);
        });
      });
    });
}
function displayAllArtistsAnc() {
  fetch("http://localhost:8080/groupietracker/anc")
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".container-main-art").innerHTML = "";
      const container = document.querySelector(".container-main");
      container.innerHTML = "";
      data.artistes.forEach((artiste) => {
        const div = document.createElement("div");
        div.innerHTML = `
                <a href="#" class="cards" data-id="${artiste.ID}">
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
      const myLink = document.querySelectorAll(".cards");
      myLink.forEach((element) => {
        element.addEventListener("click", function (event) {
          event.preventDefault();
          const artisteId = this.getAttribute("data-id");
          displayArtistById(artisteId);
        });
      });
    });
}
function displayAllArtistsAnc() {
  fetch("http://localhost:8080/groupietracker/anc")
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".container-main-art").innerHTML = "";
      const container = document.querySelector(".container-main");
      container.innerHTML = "";
      data.artistes.forEach((artiste) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <a href="#" class="cards" data-id="${artiste.ID}">
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
      const myLink = document.querySelectorAll(".cards");
      myLink.forEach((element) => {
        element.addEventListener("click", function (event) {
          event.preventDefault();
          const artisteId = this.getAttribute("data-id");
          displayArtistById(artisteId);
        });
      });
    });
}
function displayArtistById(id) {
  fetch(`http://localhost:8080/groupietracker/artiste/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".container-main").innerHTML = "";
      const container = document.querySelector(".container-main-art");
      container.innerHTML = `
            <img src="${data.artiste.Image}" alt="nom de l'artiste" class="img-art">
            <div class="contenue-art">
                <h1 class="h1">${data.artiste.Nom}</h1>
                <h3 class="h4">Début de sa carrière : ${data.artiste.Debutcarriere}</h3>
                <h3 class="h4">Date de son premier album : ${data.artiste.Datepremieralbum}</h3>
                <h3 class="h4">Membres: ${data.artiste.Membres}</h3>
                <h3 class="h4">Localisation de leur prochain/dernier concert: ${data.artiste.Lieu}</h3>
                <h3 class="h4">Date de leur prochain/dernier concert: ${data.artiste.Date}</h3>
            </div>
        `;
      const container2 = document.createElement("div");
      container2.classList.add("concert");
      container.appendChild(container2);
      if (!container2) {
        console.error("Could not find .concert element");
        return;
      }
      container2.innerHTML = "<h2 class='h4'>Concerts</h2>";
      if (!data.artiste.Dates) {
        console.error("No concert dates found");
        return;
      }
      data.artiste.Dates.forEach((date) => {
        container2.innerHTML += `<h4 class="h4"><li>${date}</li></h4>`;
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
displayAllArtists();

//Systeme de recherche
const endpoint = "http://localhost:8080/groupietracker";
const artistes = [];
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => artistes.push(...data.artistes));

function findMatches(wordToMatch, artists) {
  return artists.filter((artist) => {
    const regex = new RegExp(wordToMatch, "gi");
    return artist.Nom.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, artistes);
  const html = matchArray
    .map((artist) => {
      const artistName = artist.Nom;
      const artistid = artist.ID;
      const artistImage = artist.Image;
      return `
          <a href="#" class="cards" data-id="${artistid}">
            <div class="card">
              <div class="back-img" style="background: no-repeat url('${artistImage}') center;"></div>
              <div class="contenue">
                <img src="${artistImage}" alt="${artistName}" class="img">
                <h1 class="h1">${artistName}</h1>
              </div>
            </div>
          </a>
        `;
    })
    .join("");

  if (html == "") {
    search.innerHTML = `<h2 class="h2">Aucun résultat</h2>`;
    search.style.opacity = "1";
  } else {
    suggestions.innerHTML = html;
    search.style.opacity = "0";
  }

  const myLink = document.querySelectorAll(".cards");
  myLink.forEach((element) => {
    element.addEventListener("click", function (event) {
      event.preventDefault();
      const artisteId = this.getAttribute("data-id");
      displayArtistById(artisteId);
    });
  });
}

const searchInput = document.querySelector(".-search");
const suggestions = document.querySelector(".container-main");
const search = document.querySelector(".noResult");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
