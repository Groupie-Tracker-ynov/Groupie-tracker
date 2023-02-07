package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

// func motCroissant() []string {
// 	words := []string{"a", "m", "d", "z", "b"}
// 	sort.Strings(words)
// 	fmt.Println(words)
// 	return words
// }

// func motDecroissant() []string {
// 	wordsInverse := []string{"a", "m", "d", "z", "b"}
// 	sort.Sort(sort.Reverse(sort.StringSlice(wordsInverse)))
// 	fmt.Println(wordsInverse)
// 	return wordsInverse
// }

// func intCoissant() []int {
// 	number := []int{1920, 2020, 2004, 1985, 2026}
// 	sort.Ints(number)
// 	fmt.Println(number)
// 	return number
// }

// func intDecroissant() []int {
// 	numberInverse := []int{1920, 2020, 2004, 1985, 2026}
// 	sort.Sort(sort.Reverse(sort.IntSlice(numberInverse)))
// 	fmt.Println(numberInverse)

// 	return numberInverse
// }

type Artiste struct {
	Nom              string
	Image            string
	Debutcarriere    int
	Datepremieralbum int
	Membres          string
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
	displayStudents(db, NbLigne(db))
	log.Println("Nombre de lignes : ", NbLigne(db))

	router.GET("/groupie-tracker", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{"artistes": Artistes, "lignes": NbLigne(db)})
	})
	router.POST("/groupie-tracker", func(c *gin.Context) {

		c.HTML(http.StatusOK, "index.html", gin.H{})
	})
	router.Run("localhost:8000")
}
func displayStudents(db *sql.DB, a int) {
	var str Artiste
	row, err := db.Query("SELECT * FROM Artiste")
	if err != nil {
		log.Fatal(err)
	}
	log.Println(row)
	defer row.Close()
	for i := 0; i < a; i++ {
		row.Next()
		var id int
		var noms string
		var image string
		var debutcarriere int
		var datepremieralbum int
		var membres string
		row.Scan(&id, &noms, &image, &debutcarriere, &datepremieralbum, &membres)
		str.Nom = noms
		str.Image = image
		str.Debutcarriere = debutcarriere
		str.Datepremieralbum = datepremieralbum
		str.Membres = membres
		Artistes = append(Artistes, str)
		log.Println("Artistes : ", id, " ", Artistes[i].Nom, " ", Artistes[i].Image, " ", Artistes[i].Debutcarriere, " ", Artistes[i].Datepremieralbum, " ", Artistes[i].Membres)
	}
}
func NbLigne(db *sql.DB) int {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM Artiste").Scan(&count)
	if err != nil {
		fmt.Println(err)
	}
	return count
}
