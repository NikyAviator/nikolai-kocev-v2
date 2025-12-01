package domain

type User struct {
	ID         int64  `bson:"_id,omitempty"   json:"id"`
	AdminEmail string `binding:"required" json:"adminEmail"`
	Password   string `binding:"required" json:"password"`
}
