package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/Farber98/WIMP/tree/backend/db"
	"github.com/Farber98/WIMP/tree/backend/models"
)

/* /switches/modify handler for switch modification. Allows name, model and pid modification. Name cannot be repeated. Pid must exist. Writes current timestamp. */
func ModifySwitch(w http.ResponseWriter, r *http.Request) {
	var t models.Switch

	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		http.Error(w, "Datos incorrectos."+err.Error(), http.StatusBadRequest)
		return
	}

	if t.ID.Hex() == "000000000000000000000000" {
		http.Error(w, "No se especifico un ID de switch a modificar.", http.StatusBadRequest)
		return
	}

	_, modifyID, _ := db.CheckID(t.ID)
	if !modifyID {
		http.Error(w, "No existe un switch con ese ID.", http.StatusBadRequest)
		return
	}

	registry := make(map[string]interface{})

	if t.ParentID.Hex() != "000000000000000000000000" {
		_, parentID, _ := db.CheckID(t.ParentID)
		if !parentID {
			http.Error(w, "No existe un padre con ese ID.", http.StatusBadRequest)
			return
		}
		registry["_pid"] = t.ParentID
	}

	if len(t.Name) > 0 {
		_, duplicateSwitch, _ := db.CheckSwitch(t.Name)
		if duplicateSwitch {
			http.Error(w, "Ya existe un switch con ese nombre.", http.StatusBadRequest)
			return
		}
		registry["name"] = t.Name
	}

	if len(t.Model) > 0 {
		registry["model"] = t.Model
	}

	registry["date"] = time.Now()

	status, err := db.ModifySwitch(t.ID, registry)
	if err != nil {
		http.Error(w, "Error al intentar modificar el switch."+err.Error(), http.StatusBadRequest)
		return
	}

	if !status {
		http.Error(w, "No se pudo modificar el registro del usuario. ", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)

}
