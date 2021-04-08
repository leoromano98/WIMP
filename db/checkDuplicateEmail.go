package db

import (
	"context"
	"time"

	"github.com/Farber98/WIMP/tree/backend/models"
	"go.mongodb.org/mongo-driver/bson"
)

func CheckDuplicateEmail(email string) (models.User, bool, string) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	db := MongoCN.Database("tg")
	coll := db.Collection("users")

	condition := bson.M{"email": email}

	var result models.User

	err := coll.FindOne(ctx, condition).Decode(&result)
	ID := result.ID.Hex()
	if err != nil {
		return result, false, ID
	}

	return result, true, ID
}
