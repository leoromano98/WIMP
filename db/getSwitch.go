package db

/*
import (
	"context"
	"time"

	"github.com/Farber98/WIMP/tree/backend/models"
	"go.mongodb.org/mongo-driver/bson"
)

func GetSwitch(ID string) (s models.Switch) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	db := MongoCN.Database("tg")
	coll := db.Collection("switches")

	condition := bson.M{
		"_id": ID,
	}

	err := coll.FindOne(ctx, condition).Decode(&s)
	if err != nil {
		return ""
	}

	return result, true, ID
}

*/
