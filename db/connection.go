package db

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const connectionString = "mongodb://localhost:27017"

/* Exported object with db connection */
var MongoCN = ConnectBD()

/* clientOptions for MongoDB. */
var clientOptions = options.Client().ApplyURI(connectionString)

/* Context defined for MongoDB connection */
var ctx, _ = context.WithTimeout(context.TODO(), 1*time.Second)

func ConnectBD() *mongo.Client {

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err.Error())
		return client
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err.Error())
		return client
	}

	log.Println("MongoDB live")
	return client
}

func CheckConnection() int {
	err := MongoCN.Ping(ctx, nil)
	if err != nil {
		return 0
	}
	return 1
}
