package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/Farber98/WIMP/tree/backend/db"
	"github.com/Farber98/WIMP/tree/backend/models"
	"github.com/Farber98/WIMP/tree/backend/web/jwt"
)

/* /login handler for user's login */
func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json")

	var t models.User

	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		http.Error(w, "Email y/o contraseña invalidos."+err.Error(), http.StatusBadRequest)
		return
	}

	if len(t.Email) == 0 {
		http.Error(w, "El email es requerido.", http.StatusBadRequest)
		return
	}

	document, exists := db.Login(t.Email, t.Password)
	if !exists {
		http.Error(w, "Email y/o contraseña invalidos.", http.StatusBadRequest)
		return
	}

	jwtKey, err := jwt.GenerateJwt(document)
	if err != nil {
		http.Error(w, "Error en la generacion de Token."+err.Error(), http.StatusBadRequest)
		return
	}

	response := models.LoginResponse{
		Token: jwtKey,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}
