fetch('http://localhost:8080/groupietracker')
.then(res => res.json())
.then(data => {
    var artistes = data.artistes;
    for (var i = 0; i < artistes.length; i++) {
    var artiste = artistes[i];
    var html = `
        <a href="/groupietracker/artiste/${artiste.ID}">
        <div class="card">
            <div class="back-img" style="background: no-repeat url('${artiste.Image}') center;"></div>
            <div class="contenue">
            <img src="..${artiste.Image}" alt="nom de l'artiste" class="img">
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
    document.body.innerHTML += html;
    }
})
.catch(error => console.error(error));
