package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/Farber98/WIMP/tree/backend/db"
	"github.com/Farber98/WIMP/tree/backend/models"
)

/* /register handler for user's registry */
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

	if len(t.Username) == 0 {
		http.Error(w, "Nombre de usuario requerido.", http.StatusBadRequest)
		return
	}

	if len(t.Username) < 4 {
		http.Error(w, "Debe especificar un nombre de usuario de al menos 4 caracteres.", http.StatusBadRequest)
		return
	}

	if len(t.Password) < 8 {
		http.Error(w, "Debe especificar una contraseña de al menos 8 caracteres.", http.StatusBadRequest)
		return
	}

	_, duplicateEmail, _ := db.CheckEmail(t.Email)
	if duplicateEmail {
		http.Error(w, "Ya existe un usuario registrado con ese mail.", http.StatusBadRequest)
		return
	}

	_, duplicateUsername, _ := db.CheckUsername(t.Username)
	if duplicateUsername {
		http.Error(w, "Nombre de usuario no disponible.", http.StatusBadRequest)
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
