package web

import (
	"net/http"

	"github.com/Farber98/WIMP/tree/backend/models"
	"github.com/rs/cors"
)

var PORT = "3333"

/* Runs server. */
func Handler() {
	router := RouterConfig()
	/* Allow all connections. TODO restrict with IP */
	handler := cors.AllowAll().Handler(router)
	models.ErrorLog.Fatal(http.ListenAndServe(":"+PORT, handler))
}
