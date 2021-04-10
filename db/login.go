package db

import (
	"github.com/Farber98/WIMP/tree/backend/models"
	"golang.org/x/crypto/bcrypt"
)

/* Authenticates an user againts BD. */
func Login(email string, password string) (models.User, bool) {

	/* CheckEmail brings the user if exists. */
	user, exists, _ := CheckEmail(email)
	if !exists {
		return user, false
	}

	inputPassword := []byte(password)
	dbPassword := []byte(user.Password)

	err := bcrypt.CompareHashAndPassword(dbPassword, inputPassword)
	if err != nil {
		return user, false
	}

	return user, true
}
