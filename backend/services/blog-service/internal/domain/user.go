package domain

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type User struct {
	ID           bson.ObjectID `json:"id" bson:"_id,omitempty"`
	Email        string        `json:"email" bson:"email" binding:"required"`
	PasswordHash string        `json:"-" bson:"passwordHash" binding:"required"`
	CreatedAt    time.Time     `json:"createdAt" bson:"createdAt"`
	UpdatedAt    time.Time     `json:"updatedAt" bson:"updatedAt"`
}

type UserPublic struct {
	ID        bson.ObjectID `json:"id"`
	Email     string        `json:"email"`
	CreatedAt time.Time     `json:"createdAt"`
}

type CreateUserInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginRequest struct {
	Email    string        `json:"email"`
	Password string        `json:"password"`
	UserId   bson.ObjectID `json:"userId"` // Authentication purpose, should match the ID of the user trying to log in
}
