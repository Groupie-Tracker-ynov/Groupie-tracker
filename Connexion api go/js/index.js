async function fetchArtiste() {
  await fetch(`http://localhost:8080/groupietracker`).then((res) =>
    res.json().then((data) => (artistes = data.artistes))
  );

  console.log(artistes);
}

fetchArtiste();
