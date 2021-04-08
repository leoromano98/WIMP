package db

import (
	"context"

	"github.com/Farber98/WIMP/tree/backend/models"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const connectionString = "mongodb://localhost:27017"

/* Exported object with db connection */
var MongoCN = ConnectBD()

/* clientOptions for MongoDB. */
var clientOptions = options.Client().ApplyURI(connectionString)

func ConnectBD() *mongo.Client {

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		models.ErrorLog.Fatal(err.Error())
		return client
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		models.ErrorLog.Fatal(err.Error())
		return client
	}

	models.InfoLog.Println("MongoDB live")
	return client
}

func CheckConnection() int {
	err := MongoCN.Ping(context.TODO(), nil)
	if err != nil {
		return 0
	}
	return 1
}
