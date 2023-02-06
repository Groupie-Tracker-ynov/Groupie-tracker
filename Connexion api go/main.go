package main

import (
	"fmt"
	"html/template"
	"net/http"
	"sort"
	"strings"

	"github.com/gin-gonic/gin"
)

func motCroissant() []string {
	words := []string{"a", "m", "d", "z", "b"}
	sort.Strings(words)
	fmt.Println(words)
	return words
}

func motDecroissant() []string {
	wordsInverse := []string{"a", "m", "d", "z", "b"}
	sort.Sort(sort.Reverse(sort.StringSlice(wordsInverse)))
	fmt.Println(wordsInverse)
	return wordsInverse
}

func intCoissant() []int {
	number := []int{1920, 2020, 2004, 1985, 2026}
	sort.Ints(number)
	fmt.Println(number)
	return number
}

func intDecroissant() []int {
	numberInverse := []int{1920, 2020, 2004, 1985, 2026}
	sort.Sort(sort.Reverse(sort.IntSlice(numberInverse)))
	fmt.Println(numberInverse)

	return numberInverse
}

func main() {

	router := gin.Default()
	router.Static("/css", "./css")
	router.LoadHTMLGlob("pages/*")
	router.Static("/js", "./js")

	router.SetFuncMap(template.FuncMap{
		"upper": strings.ToUpper,
	})

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{"motCroissant": motCroissant(), "motDecroissant": motDecroissant(), "intCoissant": intCoissant(), "intDecroissant": intDecroissant()})
	})

	router.Run("localhost:8000")

}
