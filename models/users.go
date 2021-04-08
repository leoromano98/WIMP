package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Username string             `bson:"username" json:"username,omitempty"`
	Email    string             `bson:"email" json:"email,omitempty"`
	Password string             `bson:"password" json:"password,omitempty"`
}
