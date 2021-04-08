package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/Farber98/WIMP/tree/backend/db"
	"github.com/Farber98/WIMP/tree/backend/models"
)

func Register(w http.ResponseWriter, r *http.Request) {
	var t models.User
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		http.Error(w, " Error: "+err.Error(), http.StatusBadRequest)
		return
	}

	if len(t.Email) == 0 {
		http.Error(w, "Email requerido.", http.StatusBadRequest)
		return
	}

	if len(t.Password) < 8 {
		http.Error(w, "Debe especificar una contraseña de al menos 8 caracteres.", http.StatusBadRequest)
		return
	}

	_, duplicate, _ := db.CheckDuplicateEmail(t.Email)
	if duplicate {
		http.Error(w, "Ya existe un usuario registrado con ese mail.", http.StatusBadRequest)
		return
	}

	_, status, err := db.InsertRegister(t)
	if err != nil {
		http.Error(w, "Error al realizar el registro de usuario."+err.Error(), http.StatusBadRequest)
		return
	}

	if !status {
		http.Error(w, "Fallo al insertar el registro.", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
