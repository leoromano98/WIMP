package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/Farber98/WIMP/tree/backend/db"
)

/* /switches handler that shows switches topology */
func GetAllSwitches(w http.ResponseWriter, r *http.Request) {

	results, status := db.GetSwitches()
	if !status {
		http.Error(w, "Error al leer los switches. ", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(results)

}
