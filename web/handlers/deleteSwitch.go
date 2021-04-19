package handlers

import (
	"net/http"

	"github.com/Farber98/WIMP/tree/backend/db"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

/* switches/delete */
func DeleteSwitch(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "Debe enviar el parametro ID.", http.StatusBadRequest)
		return
	}

	objID, _ := primitive.ObjectIDFromHex(ID)
	_, deleteID, _ := db.CheckID(objID)
	if !deleteID {
		http.Error(w, "No existe un switch con ese ID.", http.StatusBadRequest)
		return
	}

	_, parentID, _ := db.CheckItsParent(objID)
	if parentID {
		http.Error(w, "No se puede borrar un switch que tiene hijos asociados.", http.StatusBadRequest)
		return
	}

	err := db.DeleteSwitch(ID)
	if err != nil {
		http.Error(w, "Error al borrar el switch. "+err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
}
