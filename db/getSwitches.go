package db

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

/* Retrieves all switches from database */
func GetSwitches() ([]primitive.M, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("tg")
	coll := db.Collection("switches")

	var results []primitive.M

	cursor, err := coll.Find(ctx, bson.M{})
	if err != nil {
		return results, false
	}

	for cursor.Next(context.Background()) {
		var result bson.M
		err := cursor.Decode(&result)
		if err != nil {
			return results, false
		}
		results = append(results, result)
	}

	if err := cursor.Err(); err != nil {
		return results, false
	}

	cursor.Close(context.Background())

	return results, true
}
