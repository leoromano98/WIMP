package web

import (
	"net/http"

	"github.com/Farber98/WIMP/tree/backend/db"
)

func CheckBD(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if db.CheckConnection() == 0 {
			http.Error(w, "Connection with DB lost.", http.StatusInternalServerError)
			return
		}
		next.ServeHTTP(w, r)
	}
}
