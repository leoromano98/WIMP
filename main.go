package main

import (
	"github.com/Farber98/WIMP/tree/backend/db"
	"github.com/Farber98/WIMP/tree/backend/models"
	"github.com/Farber98/WIMP/tree/backend/web"
)

func main() {
	if db.CheckConnection() == 0 {
		models.ErrorLog.Fatal("No connection")
		return
	}

	web.Handler()
}
