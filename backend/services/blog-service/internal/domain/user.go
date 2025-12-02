package domain

import "time"

type User struct {
	ID           string    `json:"id" bson:"_id,omitempty"`
	AdminEmail   string    `json:"adminEmail" bson:"adminEmail" binding:"required"`
	PasswordHash string    `json:"passwordHash" bson:"passwordHash" binding:"required"`
	CreatedAt    time.Time `json:"createdAt" bson:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt" bson:"updatedAt"`
}
