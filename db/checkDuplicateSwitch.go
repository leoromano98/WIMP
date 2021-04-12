package db

import (
	"context"
	"time"

	"github.com/Farber98/WIMP/tree/backend/models"
	"go.mongodb.org/mongo-driver/bson"
)

/* Checks if a given mail already exists in db */
func CheckSwitch(name string) (models.Switch, bool, string) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	db := MongoCN.Database("tg")
	coll := db.Collection("switches")

	condition := bson.M{"name": name}

	var result models.Switch

	err := coll.FindOne(ctx, condition).Decode(&result)
	ID := result.ID.Hex()
	if err != nil {
		return result, false, ID
	}

	return result, true, ID
}
