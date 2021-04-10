package web

import (
	"github.com/Farber98/WIMP/tree/backend/web/handlers"
	"github.com/gorilla/mux"
)

/* Establish router configuration */
func RouterConfig() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/register", CheckBD(handlers.Register)).Methods("POST")
	router.HandleFunc("/login", CheckBD(handlers.Login)).Methods("POST")
	//router.HandleFunc("/profile", CheckBD(ValidateJwt(handlers.Profile))).Methods("POST")

	return router
}
