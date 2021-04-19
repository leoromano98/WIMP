package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/Farber98/WIMP/tree/backend/db"
	"github.com/Farber98/WIMP/tree/backend/models"
)

/* /switch/create handler for adding new switch */
func CreateSwitch(w http.ResponseWriter, r *http.Request) {
	var t models.Switch
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		http.Error(w, " Error: "+err.Error(), http.StatusBadRequest)
		return
	}

	if len(t.Name) == 0 {
		http.Error(w, "Nombre requerido.", http.StatusBadRequest)
		return
	}

	if len(t.Model) == 0 {
		http.Error(w, "Modelo requerido.", http.StatusBadRequest)
		return
	}

	if t.Position.Lat == 0 || t.Position.Lng == 0 {
		http.Error(w, "Debe especificar latitud y longitud.", http.StatusBadRequest)
		return
	}

	t.Date = time.Now()

	_, duplicateSwitch, _ := db.CheckSwitch(t.Name)
	if duplicateSwitch {
		http.Error(w, "Ya existe un switch con ese nombre.", http.StatusBadRequest)
		return
	}

	/* 000... is empty pid value */
	if t.ParentID.Hex() != "000000000000000000000000" {
		_, parentID, _ := db.CheckParentID(t.ParentID)
		if !parentID {
			http.Error(w, "No existe un padre con ese ID.", http.StatusBadRequest)
			return
		}
	}
	_, status, err := db.InsertSwitch(t)
	if err != nil {
		http.Error(w, "Error al realizar el registro del switch."+err.Error(), http.StatusBadRequest)
		return
	}

	if !status {
		http.Error(w, "Fallo al insertar el switch.", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
