package jwt

import (
	"time"

	"github.com/Farber98/WIMP/tree/backend/models"
	jwt "github.com/dgrijalva/jwt-go"
)

/* Generates json web token. */
func GenerateJwt(t models.User) (string, error) {
	myKey := []byte("(H+MbQeThWmZq4t7w!z%C*F-J@NcRfUj")

	/* Privileges in payload */
	payload := jwt.MapClaims{
		"username": t.Username,
		"email":    t.Email,
		"_id":      t.ID.Hex(),
		"exp":      time.Now().Add(time.Hour * 12).Unix(),
	}

	/* Define jwt with claims and signing algorithm */
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)
	/* myKey signature */
	tokenStr, err := token.SignedString(myKey)
	if err != nil {
		return tokenStr, err
	}

	return tokenStr, nil
}
