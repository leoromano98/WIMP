package db

import (
	"context"
	"time"

	"github.com/Farber98/WIMP/tree/backend/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

/* Inserts user registry in db */
func InsertSwitch(u models.Switch) (string, bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	db := MongoCN.Database("tg")
	col := db.Collection("switches")

	result, err := col.InsertOne(ctx, u)
	if err != nil {
		return "", false, err
	}

	objID, _ := result.InsertedID.(primitive.ObjectID)
	return objID.String(), true, nil
}
