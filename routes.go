package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

/*Route defines a model route. */
type Route struct {
	Name       string
	Method     string
	Path       string
	HandleFunc http.HandlerFunc
}

/*Routes defina a slice of Route elementes.*/
type Routes []Route

/* All the routes of the APP. */
var routes = Routes{
	Route{"Index", "GET", "/", Index}}

/*RouterConfiguration returns router var with all routes configurated.  */
func RouterConfiguration() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)
	//Iterations over routes sets our router
	for _, route := range routes {
		router.
			Name(route.Name).
			Methods(route.Method).
			Path(route.Path).
			Handler(route.HandleFunc)
	}
	return router
}
