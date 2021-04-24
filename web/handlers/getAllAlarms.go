package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/Farber98/WIMP/tree/backend/db"
)

func GetAllAlarms(w http.ResponseWriter, r *http.Request) {
	results, status := db.GetAllAlarms()
	if !status {
		http.Error(w, "Error al leer las alarmas. ", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(results)

}
