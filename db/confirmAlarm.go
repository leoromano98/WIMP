package db

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ConfirmAlarm(ID string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	db := MongoCN.Database("tg")
	col := db.Collection("alarms")

	objID, _ := primitive.ObjectIDFromHex(ID)

	condition := bson.M{"_id": objID}

	_, err := col.DeleteOne(ctx, condition)
	return err

}
