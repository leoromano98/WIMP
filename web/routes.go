package web

import (
	"github.com/Farber98/WIMP/tree/backend/web/handlers"
	"github.com/gorilla/mux"
)

func RouterConfig() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/register", CheckBD(handlers.Register)).Methods("POST")

	return router
}
