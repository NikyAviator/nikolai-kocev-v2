package domain

import "time"

type User struct {
	ID           string    `json:"id" bson:"_id,omitempty"`
	AdminEmail   string    `json:"adminEmail" bson:"adminEmail" binding:"required"`
	PasswordHash string    `json:"-" bson:"passwordHash" binding:"required"`
	CreatedAt    time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt" bson:"updatedAt"`
}

type UserPublic struct {
	ID        string    `json:"id"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"createdAt"`
}

type CreateUserInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
