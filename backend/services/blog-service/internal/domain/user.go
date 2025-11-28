package domain

type User struct {
	ID         int64  `bson:"_id,omitempty"   json:"id"`
	AdminEmail string `binding:"required"`
	Password   string `binding:"required"`
}
