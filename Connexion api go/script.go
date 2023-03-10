package main

import (
	"database/sql"
	"log"
)

func ligne(db *sql.DB) int {
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM Artiste").Scan(&count)
	if err != nil {
		log.Println(err)
	}
	log.Println(count)
	return count
}
