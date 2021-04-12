package handlers

import (
	"errors"
	"strings"

	"github.com/Farber98/WIMP/tree/backend/db"
	"github.com/Farber98/WIMP/tree/backend/models"
	"github.com/dgrijalva/jwt-go"
)

/* Email value used in all endpoints */
var TokenEmail string

/* ID that models answers, used in all endpoints */
var TokenUserID string

/* Extracts atributes from given token */
func ProcessToken(tk string) (*models.Claim, bool, string, error) {
	myKey := []byte("(H+MbQeThWmZq4t7w!z%C*F-J@NcRfUj")
	claims := &models.Claim{}

	/* Splits our token from Bearer delimiter */
	splitToken := strings.Split(tk, "Bearer")
	if len(splitToken) != 2 {
		return claims, false, string(""), errors.New("formato invalido")
	}

	tk = strings.TrimSpace(splitToken[1])

	tkn, err := jwt.ParseWithClaims(tk, claims, func(token *jwt.Token) (interface{}, error) {
		return myKey, nil
	})
	if err == nil {
		_, found, _ := db.CheckEmail(claims.Email)
		if found {
			TokenEmail = claims.Email
			TokenUserID = claims.ID.Hex()
		}
		return claims, found, TokenUserID, nil
	}

	if !tkn.Valid {
		return claims, false, string(""), errors.New("token invalido")
	}

	return claims, false, string(""), err
}
