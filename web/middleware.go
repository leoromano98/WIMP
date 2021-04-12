package web

import (
	"net/http"

	"github.com/Farber98/WIMP/tree/backend/db"
	"github.com/Farber98/WIMP/tree/backend/web/handlers"
)

/* Middleware that executes CheckConnection() before corresponding handler */
func CheckBD(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if db.CheckConnection() == 0 {
			http.Error(w, "Connection with DB lost.", http.StatusInternalServerError)
			return
		}
		next.ServeHTTP(w, r)
	}
}

/* Middleware that calls ProcessToken() for validating jwt in request */
func ValidateJwt(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, _, _, err := handlers.ProcessToken(r.Header.Get("Authorization"))
		if err != nil {
			http.Error(w, "Error en el Token: "+err.Error(), http.StatusBadRequest)
			return
		}
		next.ServeHTTP(w, r)
	}
}
