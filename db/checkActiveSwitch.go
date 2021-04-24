package db

import (
	"context"
	"time"

	"github.com/Farber98/WIMP/tree/backend/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CheckActiveSwitch(ID primitive.ObjectID) (models.Switch, bool, string) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	db := MongoCN.Database("tg")
	coll := db.Collection("switches")
	condition := bson.M{
		"$and": []bson.M{
			{"_id": ID},
			{"status": true},
		},
	}
	var result models.Switch
	err := coll.FindOne(ctx, condition).Decode(&result)
	PID := result.ID.Hex()
	if err != nil {
		return result, false, PID
	}

	return result, true, PID
}
