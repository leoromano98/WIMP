package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/Farber98/WIMP/tree/backend/db"
	"github.com/Farber98/WIMP/tree/backend/models"
)

func ModifyUserPassword(w http.ResponseWriter, r *http.Request) {
	var t models.ChangePW

	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		http.Error(w, "Datos incorrectos "+err.Error(), http.StatusBadRequest)
		return
	}

	if len(t.Password) == 0 {
		http.Error(w, "Debe especificar su contraseña anterior", http.StatusBadRequest)
		return
	}

	/* Check old password it's okay */
	_, status := db.CheckOldPassword(TokenUserID, t.Password)
	if !status {
		http.Error(w, "Contraseña incorrecta. ", http.StatusBadRequest)
		return
	}

	/* Check new password requeriments */
	if len(t.NewPassword) <= 8 {
		http.Error(w, "Debe especificar una nueva contraseña de al menos 8 caracteres.", http.StatusBadRequest)
		return
	}

	/* Check new password and confirmation */
	if t.NewPassword != t.Confirmation {
		http.Error(w, "Confirmacion incorrecta.", http.StatusBadRequest)
		return
	}

	/* Change */
	modified, _ := db.ModifyUserPassword(TokenUserID, t.NewPassword)
	if !modified {
		http.Error(w, "No se pudo cambiar la contraseña", http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusCreated)
}
