package db

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func ModifyUserPassword(ID string, pass string) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	db := MongoCN.Database("tg")
	col := db.Collection("users")
	registry := make(map[string]interface{})

	registry["password"], _ = EncryptPw(pass)

	objID, _ := primitive.ObjectIDFromHex(ID)

	updtString := bson.M{
		"$set": registry,
	}

	filter := bson.M{"_id": objID}

	_, err := col.UpdateOne(ctx, filter, updtString)
	if err != nil {
		return false, err
	}

	return true, nil

}
