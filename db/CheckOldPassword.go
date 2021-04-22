package db

import (
	"context"
	"time"

	"github.com/Farber98/WIMP/tree/backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func CheckOldPassword(ID string, password string) (models.User, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	db := MongoCN.Database("tg")
	coll := db.Collection("users")

	objID, _ := primitive.ObjectIDFromHex(ID)

	condition := bson.M{"_id": objID}

	var result models.User

	err := coll.FindOne(ctx, condition).Decode(&result)
	if err != nil {
		return result, false
	}

	dbPassword := []byte(result.Password)
	inputPassword := []byte(password)

	errPass := bcrypt.CompareHashAndPassword(dbPassword, inputPassword)
	if errPass != nil {
		return result, false
	}

	return result, true
}
