package main

import (
	"log"

	"github.com/Farber98/WIMP/tree/backend/db"
	"github.com/Farber98/WIMP/tree/backend/handlers"
)

func main() {
	if db.CheckConnection() == 0 {
		log.Fatal("No connection")
		return
	}

	handlers.Handler()
}
