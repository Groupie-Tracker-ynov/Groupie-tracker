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
                        <h4 class="h4">Début de sa carrière : ${artiste.Debutcarriere}</h4>
                        <h4 class="h4">Date de son premier album : ${artiste.Datepremieralbum}</h4>
                        <h4 class="h4">${artiste.Membres}</h4>
                        <h4 class="h4">Localisation de leur prochain/dernier concert: ${artiste.Lieu}</h4>
                        <h4 class="h4">Date de leur prochain/dernier concert: ${artiste.Date}</h4>
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
                        <h4 class="h4">Début de sa carrière : ${artiste.Debutcarriere}</h4>
                        <h4 class="h4">Date de son premier album : ${artiste.Datepremieralbum}</h4>
                        <h4 class="h4">${artiste.Membres}</h4>
                        <h4 class="h4">Localisation de leur prochain/dernier concert: ${artiste.Lieu}</h4>
                        <h4 class="h4">Date de leur prochain/dernier concert: ${artiste.Date}</h4>
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
                        <h4 class="h4">Début de sa carrière : ${artiste.Debutcarriere}</h4>
                        <h4 class="h4">Date de son premier album : ${artiste.Datepremieralbum}</h4>
                        <h4 class="h4">${artiste.Membres}</h4>
                        <h4 class="h4">Localisation de leur prochain/dernier concert: ${artiste.Lieu}</h4>
                        <h4 class="h4">Date de leur prochain/dernier concert: ${artiste.Date}</h4>
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
                        <h4 class="h4">Début de sa carrière : ${artiste.Debutcarriere}</h4>
                        <h4 class="h4">Date de son premier album : ${artiste.Datepremieralbum}</h4>
                        <h4 class="h4">${artiste.Membres}</h4>
                        <h4 class="h4">Localisation de leur prochain/dernier concert: ${artiste.Lieu}</h4>
                        <h4 class="h4">Date de leur prochain/dernier concert: ${artiste.Date}</h4>
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
                        <h4 class="h4">Début de sa carrière : ${artiste.Debutcarriere}</h4>
                        <h4 class="h4">Date de son premier album : ${artiste.Datepremieralbum}</h4>
                        <h4 class="h4">${artiste.Membres}</h4>
                        <h4 class="h4">Localisation de leur prochain/dernier concert: ${artiste.Lieu}</h4>
                        <h4 class="h4">Date de leur prochain/dernier concert: ${artiste.Date}</h4>
                    </div>
                    </div>
                </a>
                `;
        container.appendChild(div);
      });
    });
}

displayAllArtists();

// function GetArtiste() {
//   fetch(`http://localhost:8080/groupietracker/artiste`)
//     .then((res) => res.json())
//     .then((data) => {
//       const container = document.querySelector(".container-main");
//       container.innerHTML = "";
//       data.artistes.forEach((artiste) => {
//         const div = document.createElement("div");
//         div.innerHTML = `
//                                 <div class="container-main">
//                                     <img src="${artiste.Image}" alt="nom de l'artiste" class="img">
//                                         <div class="contenue">
//                                             <h1 class="h1">${artiste.Nom}</h1>
//                                             <h3 class="h4">Début de sa carrière : ${artiste.Debutcarriere}</h3>
//                                             <h3 class="h4">Dates de son premier album : ${artiste.Datepremieralbum}</h3>
//                                             <h3 class="h4">Membres: ${artiste.Membres}</h3>
//                                             <h3 class="h4">Localisation de leur prochain/dernier concert: ${artiste.Lieu}</h3>
//                                             <h3 class="h4">Date de leur prochain/dernier concert: ${artiste.Date}</h3>
//                                 </div>
//                                 `;
//         container.appendChild(div);
//       });
//     });
// }
// GetArtiste();

// const click = document.querySelector(".card");
// click.addEventListener("click", GetArtiste);
