package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"  json:"id"`
	Username  string             `bson:"username"      json:"username" binding:"required"`
	Email     string             `bson:"email"         json:"email" binding:"required,email"`
	Password  string             `bson:"password"      json:"password" binding:"required,min=6"`
	CreatedAt time.Time          `bson:"createdAt"     json:"createdAt"`
	UpdatedAt time.Time          `bson:"updatedAt"     json:"updatedAt"`
}

var users = []User{}

func (u User) Save() {
	users = append(users, u)

}

func GetAllUsers() []User {
	return users
}
