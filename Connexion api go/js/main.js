const containerMain = document.querySelector('.container-main')

function containerDisplay() {
    containerMain.innerHTML =
        `
         <div class="card">
                <div class="back-img" style="background: no-repeat url(../css/pnl.jpg) center;"></div>
                <div class="contenue">
                    <img src="../css/pnl.jpg" alt="nom de l'artiste" class="img">
                    <h1 class="h1">PNL</h1>
                    <h4 class="h4">Debut: 2014</h4>
                    <h4 class="h4">Premier Album: Monchico 2014</h4>
                    <h4 class="h4">Nom de tout les artistes du groupe (si groupe)</h4>
                    <h4 class="h4">Localisation de leur prochain/dernier concert: Paris</h4>
                    <h4 class="h4">Date de leur prochain/dernier concert: 2022</h4>
                </div>
            </div>

        `
}


for (i = 0; i < 10; i++) {
    containerDisplay()
}