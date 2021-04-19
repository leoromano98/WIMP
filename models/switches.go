package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Switch struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	ParentID primitive.ObjectID `bson:"_pid,omitempty" json:"pid"`
	Name     string             `bson:"name" json:"name,omitempty"`
	Model    string             `bson:"model" json:"model,omitempty"`
	Position Position           `bson:"position" json:"position,omitempty"`
	Date     time.Time          `bson:"date" json:"date,omitempty"`
}

type Position struct {
	Lat float64 `bson:"lat" json:"lat,omitempty"`
	Lng float64 `bson:"lng" json:"lng,omitempty"`
}
