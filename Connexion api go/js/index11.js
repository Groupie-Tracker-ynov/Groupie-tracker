//Menu burger
var burgerMenu = document.getElementById("burger-menu");
var overlay = document.getElementById("menu");
burgerMenu.addEventListener("click", function () {
  this.classList.toggle("close");
  overlay.classList.toggle("overlay");
});

//Valeur effet scroll bar
let scrollValue =
  (window.scrollY + window.innerHeight) / document.body.offsetHeight;
const navBar = document.querySelector(".container-header");

//Fonction qui permet de faire disparaitre la barre de navigation en scrollant vers le bas
window.addEventListener("scroll", () => {
  if (scrollValue > window.scrollY) {
    navBar.style.top = "0px";
    navBar.style.visibility = "visible";
  } else {
    navBar.style.top = "-100px";
  }
  scrollValue = window.scrollY;
});
let flag=true;
url = "http://localhost:8080/api/groupietracker";
displayAllArtists(url); //Affiche tous les artistes au lancement de la page html
function displayAllArtists(url) {
  //Fonction qui affiche tous les artistes
  fetch(url) //Récupère les information envoyés à cette URI
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".container-main-art").innerHTML = "";
      const container = document.querySelector(".container-main");
      const presentation = document.querySelector(".presentation");
      presentation.innerHTML="";
      if (flag){
        presentation.innerHTML = `
                      <a href="http://localhost:8080/groupietracker"><img class="home" src="../img/logo.png" alt="logo"></a>
                      <a href="http://localhost:8080/groupietracker"><h1 class="animTexth1"><span class="span1">Groupie-Tracker</span></h1></a>
                      <p class="animText"><span class="span2">Bienvenue sur Groupie Tracker, votre guide ultime pour suivre toute les actualités sur vos chanteurs préférés ! Rejoignez notre communauté de fans passionnés et explorez notre site pour découvrir les dernières nouvelles et bien plus encore.</span></p>
                      <div class="content-btn">
                        <p>Pour commencer à decouvrir vos artistes préférés</p>
                        <a id="suivant" class="start" href="#cards">Cliquez ici</a>
                      </div>
            `;
            flag=false;
      }
      console.log(data.artistes);
      container.innerHTML = "";
      data.artistes.forEach((artiste) => {
        //parcours tous les artistes et affiche une "card" pour chacun d'eux
        const div = document.createElement("div");
        div.innerHTML = `
                <a href="#" class="cards" id="cards" data-id="${artiste.ID}">
                    <div class="card" >
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
          //Empêche le href d'êre actif et lancer la fonction "displayArtistBYId" à la place
          event.preventDefault();
          const artisteId = this.getAttribute("data-id");
          displayArtistById(artisteId);
        });
      });
    });
}
function displayArtistById(id) {
  //affiche un seul artiste en fonction de son ID
  fetch(`http://localhost:8080/api/groupietracker/artiste/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".container-main").innerHTML = "";
      document.querySelector(".presentation").innerHTML = "";
      const navBar = document.querySelector(".container-header");
      const body = document.querySelector("body");
      body.style.overflow = "hidden";
      navBar.style.opacity = "0";
      const container = document.querySelector(".container-main-art");
      container.innerHTML = `
      <a href="http://localhost:8080/groupietracker"><img src="${data.artiste.Image}" alt="nom de l'artiste" class="img-art"></a>
            <div class="contenue-art">
                <h1 class="h1">${data.artiste.Nom}</h1>
                <h3 class="h4">Début de sa carrière : ${data.artiste.Debutcarriere}</h3>
                <h3 class="h4">Date de son premier album : ${data.artiste.Datepremieralbum}</h3>
                <h3 class="h4">Membres : ${data.artiste.Membres}</h3>
                <h3 class="h4">Localisation de leur prochain/dernier concert : ${data.artiste.Lieu}</h3>
                <h3 class="h4">Date de leur prochain/dernier concert : ${data.artiste.Date}</h3>
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

//systeme de recherche
const endpoint = "http://localhost:8080/api/groupietracker";
const artistes = [];
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => artistes.push(...data.artistes));

function findMatches(wordToMatch, artists) {
  //effectue la recherche en fonction de la chaîne de caractère dans la barre de recherche
  return artists.filter((artist) => {
    const regex = new RegExp(wordToMatch, "gi");
    return artist.Nom.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, artistes);
  const html = matchArray //affiche les résulats de la recherche

    .map((artist) => {
      document.querySelector(".presentation").innerHTML = "";
      const artistName = artist.Nom;
      const artistid = artist.ID;
      const artistImage = artist.Image;
      return `
          <a href="#" class="cards" id="cards" data-id="${artistid}">
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
  const main = document.querySelector(".container-main");
  const body = document.querySelector("body");

  main.style.margintop = "-600px";

  //conditon pour afficher un message si aucun résultat n'est trouvé
  if (html == "") {
    search.innerHTML = `<h2 class="h2">Aucun résultat</h2>`;
    search.style.opacity = "1";
    suggestions.innerHTML = "";
    body.style.overflow = "hidden";
    document.querySelector(".presentation").innerHTML = "";
  } else {
    suggestions.innerHTML = html;
    search.style.opacity = "0";
    body.style.overflow = "visible";
  }

  suggestions.innerHTML = html;
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

//écoute les événements de la barre de recherche
searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);

function displayAllArtistsAsc() {
  url = "http://localhost:8080/api/groupietracker/asc";
  displayAllArtists(url); //Affiche les artistes dans l'ordre alphabétique
}
function displayAllArtistsDesc() {
  url = "http://localhost:8080/api/groupietracker/desc";
  displayAllArtists(url); //Affiche les artistes dans l'ordre anti-alphabétique
}
function displayAllArtistsAnc() {
  url = "http://localhost:8080/api/groupietracker/anc";
  displayAllArtists(url); //Affiche les artistes dans l'ordre décroissant de l'année du début de carrière
}
function displayAllArtistsRec() {
  url = "http://localhost:8080/api/groupietracker/rec";
  displayAllArtists(url); //Affiche les artistes dans l'ordre croissant de l'année du début de carrière
}
