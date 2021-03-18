package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

/* Set client options */
var ClientOptions = options.Client().ApplyURI("mongodb://localhost:27017")

/* Single connection to Database */
func BD_Connection() {

	//Connect to MongoDB
	client, err := mongo.Connect(context.TODO(), ClientOptions)

	if err != nil {
		log.Fatal(err)
	}

	//Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")
}

/* Returns a variable that has the db and collection configuration. */
func BD_Selection(db string, coll string) *mongo.Collection {
	client, err := mongo.Connect(context.TODO(), ClientOptions)
	if err != nil {
		log.Fatal(err)
	}
	collection := client.Database(db).Collection(coll)
	return collection

}
