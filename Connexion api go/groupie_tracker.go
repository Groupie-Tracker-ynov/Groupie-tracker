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
	Dates            []string
	Lieu             string
}

var Artistes []Artiste

func main() {
	router := gin.Default()
	router.Static("/css", "./css")
	router.Static("/img", "./img")
	router.Static("/js", "./js")
	router.LoadHTMLGlob("pages/*")
	db, err := sql.Open("sqlite3", "./grptracker.db")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{"artistes": Artistes})
	})
	router.GET("/groupietracker", func(c *gin.Context) {
		Artistes = SelectArtists(db)
		c.JSON(http.StatusOK, gin.H{"artistes": Artistes})
	})
	router.GET("/groupietracker/asc", func(c *gin.Context) {
		Artistes = Order(db, true)
		c.JSON(http.StatusOK, gin.H{"artistes": Artistes})
	})
	router.GET("/groupietracker/desc", func(c *gin.Context) {
		Artistes = Order(db, false)
		c.JSON(http.StatusOK, gin.H{"artistes": Artistes})
	})
	router.GET("/groupietracker/artiste/:nom", func(c *gin.Context) {
		nom := c.Param("nom")
		artiste := chooseArtist(db, nom)
		c.JSON(http.StatusOK, gin.H{"artiste": artiste})
	})
	router.GET("/groupietracker/rec", func(c *gin.Context) {
		Artistes = OrderConcert(db, false)
		c.JSON(http.StatusOK, gin.H{"artistes": Artistes})
	})
	router.GET("/groupietracker/anc", func(c *gin.Context) {
		Artistes = OrderConcert(db, true)
		c.JSON(http.StatusOK, gin.H{"artistes": Artistes})
	})
	router.Run("localhost:8080")

}
func chooseArtist(db *sql.DB, nom string) Artiste {
	var str Artiste
	var concert_date string
	var tabChar []string
	rows, err := db.Query("SELECT Artiste.id_art,Artiste.noms,Artiste.image,Artiste.debutcarriere,Artiste.datepremieralbum,Artiste.membres,info_concert.concert_date,Lieu.lieu_concert FROM Artiste INNER JOIN info_concert ON Artiste.id_art = info_concert.id_art INNER JOIN Lieu ON Artiste.id_art = Lieu.id_lieu WHERE Artiste.id_art = (?);", nom)
	if err != nil {
		log.Println(err)
	}
	defer rows.Close()
	for rows.Next() {
		rows.Scan(&str.ID, &str.Nom, &str.Image, &str.Debutcarriere, &str.Datepremieralbum, &str.Membres, &str.Date, &str.Lieu)
	}
	row, err := db.Query("SELECT concert_date FROM info_concert WHERE id_art = ?;", nom)
	if err != nil {
		log.Println(err)
	}
	defer row.Close()
	for row.Next() {
		row.Scan(&concert_date)
		log.Println(concert_date)
		tabChar = append(tabChar, concert_date)
	}
	str.Dates = tabChar
	log.Println(str)
	return str
}
func SelectArtists(db *sql.DB) []Artiste {
	var liste []Artiste
	var str Artiste
	row, err := db.Query("SELECT * FROM Artiste;")
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()

	for i := 0; i < NbLigne(db); i++ {
		row.Next()
		row.Scan(&str.ID, &str.Nom, &str.Image, &str.Debutcarriere, &str.Datepremieralbum, &str.Membres)
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
		req = "SELECT * FROM Artiste ORDER BY noms"
	} else {
		req = "SELECT * FROM Artiste ORDER BY noms DESC"
	}
	var liste []Artiste
	var str Artiste
	row, err := db.Query(req)
	if err != nil {
		fmt.Println(err)
	}
	defer row.Close()
	for row.Next() {
		row.Scan(&str.ID, &str.Nom, &str.Image, &str.Debutcarriere, &str.Datepremieralbum, &str.Membres)
		liste = append(liste, str)
	}
	return liste
}
func OrderConcert(db *sql.DB, flag bool) []Artiste {
	var req string
	if flag {
		req = "SELECT * FROM Artiste ORDER BY debutcarriere;"
	} else {
		req = "SELECT * FROM Artiste ORDER BY debutcarriere DESC;"
	}
	var liste []Artiste
	var str Artiste
	row, err := db.Query(req)
	if err != nil {
		fmt.Println(err)
	}
	defer row.Close()
	for row.Next() {
		row.Scan(&str.ID, &str.Nom, &str.Image, &str.Debutcarriere, &str.Datepremieralbum, &str.Membres)
		row.Scan(&str.ID, &str.Nom, &str.Image, &str.Debutcarriere, &str.Datepremieralbum, &str.Membres)
		liste = append(liste, str)
		log.Println("Artistes : ", str.ID, " ", str.Nom, " ", str.Image, " ", str.Debutcarriere, " ", str.Datepremieralbum, " ", str.Membres)
	}
	return liste
}
