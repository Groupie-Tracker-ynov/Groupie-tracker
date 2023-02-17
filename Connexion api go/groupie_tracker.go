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
	ID                  int
	Nom                 string
	Image               string
	Debutcarriere       int
	Datepremieralbum    int
	Membres             string
	Dateprochainconcert string
	Lieuprochainconcert string
}

var Artistes []Artiste

func main() {
	fmt.Println("Hello World")

	router := gin.Default()
	router.Static("/css", "./css")
	router.Static("/img", "./img")
	router.LoadHTMLGlob("pages/*")
	db, err := sql.Open("sqlite3", "./groupietracker.db")
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	router.GET("/groupietracker", func(c *gin.Context) {
		Artistes = SelectArtists(db, NbLigne(db))
		c.HTML(http.StatusOK, "index.html", gin.H{"artistes": Artistes})
	})
	router.GET("/groupietracker/asc", func(c *gin.Context) {
		Artistes = Order(db, NbLigne(db), true)
		c.HTML(http.StatusOK, "index.html", gin.H{"artistes": Artistes})
	})
	router.GET("/groupietracker/desc", func(c *gin.Context) {
		Artistes = Order(db, NbLigne(db), false)
		c.HTML(http.StatusOK, "index.html", gin.H{"artistes": Artistes})
	})
	router.GET("/groupietracker/artiste/:nom", func(c *gin.Context) {
		nom := c.Param("nom")
		artiste := chooseArtist(db, nom)
		log.Println(artiste)
		c.HTML(http.StatusOK, "artiste.html", gin.H{"Nom": artiste.Nom, "Image": artiste.Image, "Datepremieralbum": artiste.Datepremieralbum,
			"Debutcarriere": artiste.Debutcarriere, "Membres": artiste.Membres})
	})
	router.POST("/groupietracker", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{})
	})
	router.Run("localhost:8080")

}

func chooseArtist(db *sql.DB, s string) Artiste {
	var str Artiste
	row, err := db.Query("SELECT * FROM Artiste")
	if err != nil {
		log.Println(err)
	}
	defer row.Close()
	for row.Next() {
		row.Scan(&str.ID, &str.Nom, &str.Image, &str.Debutcarriere, &str.Datepremieralbum, &str.Membres)
		if fmt.Sprint(str.ID) == s {
			return str
		}
	}
	return str
}
func SelectArtists(db *sql.DB, a int) []Artiste {
	var liste []Artiste
	var str Artiste
	row, err := db.Query("SELECT * FROM Artiste")
	if err != nil {
		log.Fatal(err)
	}
	defer row.Close()
	for row.Next() {
		var id int
		row.Scan(&str.ID, &str.Nom, &str.Image, &str.Debutcarriere, &str.Datepremieralbum, &str.Membres)
		liste = append(liste, str)
		log.Println("Artistes : ", id, " ", str.Nom, " ", str.Image, " ", str.Debutcarriere, " ", str.Datepremieralbum, " ", str.Membres)
	}
	return liste
}
func NbLigne(db *sql.DB) int {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM Artiste").Scan(&count)
	if err != nil {
		fmt.Println(err)
	}
	return count
}
func Order(db *sql.DB, a int, flag bool) []Artiste {
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
		var id int
		row.Scan(&str.ID, &str.Nom, &str.Image, &str.Debutcarriere, &str.Datepremieralbum, &str.Membres)
		liste = append(liste, str)
		log.Println("Artistes : ", id, " ", str.Nom, " ", str.Image, " ", str.Debutcarriere, " ", str.Datepremieralbum, " ", str.Membres)
	}
	return liste
}
