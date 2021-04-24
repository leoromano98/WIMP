package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/Farber98/WIMP/tree/backend/db"
	"github.com/Farber98/WIMP/tree/backend/models"
)

func GetSwitchAlarms(w http.ResponseWriter, r *http.Request) {
	var t models.Switch
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		http.Error(w, "Datos incorrectos."+err.Error(), http.StatusBadRequest)
		return
	}

	if t.ID.Hex() == "000000000000000000000000" {
		http.Error(w, "No se especifico un ID de switch para obtener alarmas.", http.StatusBadRequest)
		return
	}

	_, exists, _ := db.CheckID(t.ID)
	if !exists {
		http.Error(w, "No existe un switch con ese ID.", http.StatusBadRequest)
		return
	}

	results, status := db.GetSwitchAlarms(t.ID)
	if !status {
		http.Error(w, "Error al leer las alarmas del switch.", http.StatusInternalServerError)
		return
	}

	/* if len(results) == 0 {
		results := "No hay resultados"
		w.Header().Set("Content-type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(results)
		return
	} */

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(results)

}
