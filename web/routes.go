package web

import (
	"github.com/Farber98/WIMP/tree/backend/web/handlers"
	"github.com/gorilla/mux"
)

/* Establish router configuration */
func RouterConfig() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/register", CheckBD(handlers.CreateUser)).Methods("POST")
	router.HandleFunc("/login", CheckBD(handlers.Login)).Methods("POST")
	//router.HandleFunc("/user/password",CheckBD(handlers.ModifyPassword)).Methods("POST")
	//router.HandleFunc("/user/email",CheckBD(handlers.ModifyEmail)).Methods("POST")
	router.HandleFunc("/switches", CheckBD(ValidateJwt(handlers.GetAllSwitches))).Methods("GET")
	router.HandleFunc("/switches/create", CheckBD(ValidateJwt(handlers.CreateSwitch))).Methods("POST")
	//router.HandleFunc("/switches/modify", CheckBD(handlers.ModifySwitch)).Methods("POST")

	return router
}
