package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/Farber98/WIMP/tree/backend/db"
	"github.com/Farber98/WIMP/tree/backend/models"
)

func ActivateSwitch(w http.ResponseWriter, r *http.Request) {
	var t models.Switch
	registry := make(map[string]interface{})

	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		http.Error(w, "Datos incorrectos."+err.Error(), http.StatusBadRequest)
		return
	}

	/* Check if switch ID is specified */
	if t.ID.Hex() == "000000000000000000000000" {
		http.Error(w, "No se especifico un ID de switch a activar.", http.StatusBadRequest)
		return
	}

	/* Check if ID exists */
	_, exists, _ := db.CheckID(t.ID)
	if !exists {
		http.Error(w, "No existe un switch con ese ID.", http.StatusBadRequest)
		return
	}

	/* Check if switch is active */
	_, active, _ := db.CheckActiveSwitch(t.ID)
	if active {
		http.Error(w, "El switch ya esta activo.", http.StatusBadRequest)
		return
	}

	registry["status"] = true

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
