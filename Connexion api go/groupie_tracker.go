package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

type Artiste struct {
	ID               int
	Nom              string
	Image            string
	Debutcarriere    int
	Datepremieralbum int
	Membres          string
	Date             string
	Lieu             string
}

var Artistes []Artiste

func main() {
	fmt.Println("Hello World")

	router := gin.Default()
	router.Static("/css", "./css")
	router.Static("/img", "./img")
	router.Static("/js", "./js")
	router.LoadHTMLGlob("pages/*")
	db, err := sql.Open("sqlite3", "./groupietracker.db")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	router.GET("/groupietracker", func(c *gin.Context) {
		Artistes = SelectArtists(db)
		c.HTML(http.StatusOK, "index.html", gin.H{"artistes": Artistes})
	})
	router.GET("/groupietracker/asc", func(c *gin.Context) {
		Artistes = Order(db, true)
		c.HTML(http.StatusOK, "index.html", gin.H{"artistes": Artistes})
	})
	router.GET("/groupietracker/desc", func(c *gin.Context) {
		Artistes = Order(db, false)
		c.HTML(http.StatusOK, "index.html", gin.H{"artistes": Artistes})
	})
	router.GET("/groupietracker/artiste/:nom", func(c *gin.Context) {
		nom := c.Param("nom")
		artiste := chooseArtist(db, nom, Artistes)
		c.HTML(http.StatusOK, "artiste.html", gin.H{"Nom": artiste.Nom, "Image": artiste.Image, "Datepremieralbum": artiste.Datepremieralbum,
			"Debutcarriere": artiste.Debutcarriere, "Membres": artiste.Membres, "Date": artiste.Date, "Lieu": artiste.Lieu})
	})
	router.POST("/groupietracker/artiste/add", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{})
	})
	router.GET("/groupietracker/rec", func(c *gin.Context) {
		Artistes = OrderConcert(db, true)
		c.HTML(http.StatusOK, "index.html", gin.H{"artistes": Artistes})
	})
	router.GET("/groupietracker/anc", func(c *gin.Context) {
		Artistes = OrderConcert(db, false)
		c.HTML(http.StatusOK, "index.html", gin.H{"artistes": Artistes})
	})
	router.Run("localhost:8080")

}

func chooseArtist(db *sql.DB, s string, liste []Artiste) Artiste {
	var str Artiste
	row, err := db.Query("SELECT * FROM Artiste")
	if err != nil {
		log.Println(err)
	}
	defer row.Close()
	for i := 0; i < NbLigne(db); i++ {
		if fmt.Sprint(liste[i].ID) == s {
			return liste[i]
		}
	}
	return str
}
func SelectArtists(db *sql.DB) []Artiste {
	var liste []Artiste
	var str Artiste
	row, err := db.Query("SELECT Artiste.id_art,Artiste.noms,Artiste.image,Artiste.debutcarriere,Artiste.datepremieralbum,Artiste.membres,info_concert.concert_date,Lieu.lieu_concert FROM Artiste INNER JOIN info_concert ON Artiste.id_art = info_concert.id_art INNER JOIN Lieu ON Artiste.id_art = Lieu.id_lieu;")
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	for i := 0; i < NbLigne(db); i++ {
		row.Next()
		row.Scan(&str.ID, &str.Nom, &str.Image, &str.Debutcarriere, &str.Datepremieralbum, &str.Membres, &str.Date, &str.Lieu)
		liste = append(liste, str)
		log.Println("Artistes : ", str.ID, " ", str.Nom, " ", str.Image, " ", str.Debutcarriere, " ", str.Datepremieralbum, " ", str.Membres, " ", str.Date, " ", str.Lieu)
	}
	return liste
}
func NbLigne(db *sql.DB) int {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM Artiste").Scan(&count)
	if err != nil {
		fmt.Println(err)
	}
	log.Println(count)
	return count
}
func Order(db *sql.DB, flag bool) []Artiste {
	var req string
	if flag {
		req = "SELECT Artiste.id_art,Artiste.noms,Artiste.image,Artiste.debutcarriere,Artiste.datepremieralbum,Artiste.membres,info_concert.concert_date,Lieu.lieu_concert FROM Artiste INNER JOIN info_concert ON Artiste.id_art = info_concert.id_art INNER JOIN Lieu ON Artiste.id_art = Lieu.id_lieu ORDER BY noms"
	} else {
		req = "SELECT Artiste.id_art,Artiste.noms,Artiste.image,Artiste.debutcarriere,Artiste.datepremieralbum,Artiste.membres,info_concert.concert_date,Lieu.lieu_concert FROM Artiste INNER JOIN info_concert ON Artiste.id_art = info_concert.id_art INNER JOIN Lieu ON Artiste.id_art = Lieu.id_lieu ORDER BY noms DESC"
	}
	var liste []Artiste
	var str Artiste
	row, err := db.Query(req)
	if err != nil {
		fmt.Println(err)
	}
	defer row.Close()
	for row.Next() {
		row.Scan(&str.ID, &str.Nom, &str.Image, &str.Debutcarriere, &str.Datepremieralbum, &str.Membres, &str.Date, &str.Lieu)
		liste = append(liste, str)
		log.Println("Artistes : ", str.ID, " ", str.Nom, " ", str.Image, " ", str.Debutcarriere, " ", str.Datepremieralbum, " ", str.Membres)
	}
	return liste
}
func OrderConcert(db *sql.DB, flag bool) []Artiste {
	var req string
	if flag {
		req = "SELECT Artiste.id_art,Artiste.noms,Artiste.image,Artiste.debutcarriere,Artiste.datepremieralbum,Artiste.membres,info_concert.concert_date FROM Artiste INNER JOIN info_concert ON Artiste.id_art = info_concert.id_art ORDER BY concert_date"
	} else {
		req = "SELECT Artiste.id_art,Artiste.noms,Artiste.image,Artiste.debutcarriere,Artiste.datepremieralbum,Artiste.membres,info_concert.concert_date FROM Artiste INNER JOIN info_concert ON Artiste.id_art = info_concert.id_art ORDER BY concert_date DESC"
	}
	var liste []Artiste
	var str Artiste
	row, err := db.Query(req)
	if err != nil {
		fmt.Println(err)
	}
	defer row.Close()
	for row.Next() {
		row.Scan(&str.ID, &str.Nom, &str.Image, &str.Debutcarriere, &str.Datepremieralbum, &str.Membres, &str.Date)
		liste = append(liste, str)
		log.Println("Artistes : ", str.ID, " ", str.Nom, " ", str.Image, " ", str.Debutcarriere, " ", str.Datepremieralbum, " ", str.Membres)
	}
	return liste
}
