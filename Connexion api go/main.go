package main

import (
	"fmt"

	"html/template"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("http://localhost:8000/")

	router := gin.Default()
	router.Static("/css", "./css")
	router.LoadHTMLGlob("pages/*")

	router.SetFuncMap(template.FuncMap{
		"upper": strings.ToUpper,
	})

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{})
	})

	router.Run("localhost:8000")
}
