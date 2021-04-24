package web

import (
	"github.com/Farber98/WIMP/tree/backend/web/handlers"
	"github.com/gorilla/mux"
)

/* Establish router configuration */
func RouterConfig() *mux.Router {

	router := mux.NewRouter()

	/* User administration */
	router.HandleFunc("/register", CheckBD(handlers.CreateUser)).Methods("POST")
	router.HandleFunc("/login", CheckBD(handlers.Login)).Methods("POST")
	router.HandleFunc("/user/password", CheckBD(ValidateJwt(handlers.ModifyUserPassword))).Methods("PUT")

	/* Switches */
	router.HandleFunc("/switches", CheckBD(ValidateJwt(handlers.GetAllSwitches))).Methods("GET")
	router.HandleFunc("/switches/create", CheckBD(ValidateJwt(handlers.CreateSwitch))).Methods("POST")
	router.HandleFunc("/switches/modify", CheckBD(ValidateJwt(handlers.ModifySwitch))).Methods("PUT")
	router.HandleFunc("/switches/delete", CheckBD(ValidateJwt(handlers.DeleteSwitch))).Methods("DELETE")
	router.HandleFunc("/switches/activate", CheckBD(ValidateJwt(handlers.ActivateSwitch))).Methods("PUT")
	router.HandleFunc("/switches/deactivate", CheckBD(ValidateJwt(handlers.DeactivateSwitch))).Methods("PUT")
	router.HandleFunc("/switches/alarms", CheckBD(ValidateJwt(handlers.GetAllAlarms))).Methods("GET")
	router.HandleFunc("/switches/alarms/switch", CheckBD(ValidateJwt(handlers.GetSwitchAlarms))).Methods("GET")
	router.HandleFunc("/switches/alarms/confirm", CheckBD(ValidateJwt(handlers.ConfirmAlarm))).Methods("DELETE")

	/* Package processing */

	return router
}
