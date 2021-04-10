package db

import "golang.org/x/crypto/bcrypt"

/* Encrypts given password  */
func EncryptPw(pass string) (string, error) {
	cost := 8
	bytes, err := bcrypt.GenerateFromPassword([]byte(pass), cost)
	return string(bytes), err
}
