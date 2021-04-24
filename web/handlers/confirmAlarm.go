package handlers

import (
	"net/http"

	"github.com/Farber98/WIMP/tree/backend/db"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ConfirmAlarm(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "Debe enviar el parametro ID.", http.StatusBadRequest)
		return
	}

	objID, _ := primitive.ObjectIDFromHex(ID)
	_, deleteID, _ := db.CheckAlarmID(objID)
	if !deleteID {
		http.Error(w, "No existe una alarma con ese ID.", http.StatusBadRequest)
		return
	}

	err := db.ConfirmAlarm(ID)
	if err != nil {
		http.Error(w, "Error al confirmar la alarma. "+err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
}
