package main

import (
	"context"
	"fmt"
	"log"
)

func InsertPacket(packet Packet) {
	BD_Connection()
	collection := BD_Selection("tg", "packets")
	insertResult, err := collection.InsertOne(context.TODO(), packet)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted a single document: ", insertResult.InsertedID)
}
