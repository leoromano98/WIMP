package handlers

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

var PORT = "3333"

/* Handler() defines router and runs server. */
func Handler() {
	router := mux.NewRouter()

	/* Allow all connections. TODO restrict with IP */
	handler := cors.AllowAll().Handler(router)
	log.Fatal(http.ListenAndServe(":"+PORT, handler))
}
