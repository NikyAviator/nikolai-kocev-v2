package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Blog struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"  json:"id"`
	Title     string             `bson:"title"          json:"title" binding:"required"`
	Slug      string             `bson:"slug"           json:"slug" binding:"required"`
	Excerpt   string             `bson:"excerpt"        json:"excerpt" binding:"required"`
	Content   string             `bson:"content"        json:"content" binding:"required"`
	CoverImg  string             `bson:"coverImg,omitempty" json:"coverImg,omitempty"`
	Category  string             `bson:"category"       json:"category" binding:"required"`
	AuthorID  primitive.ObjectID `bson:"author,omitempty"         json:"author,omitempty"`
	Published bool               `bson:"published"      json:"published"`
	Tags      []string           `bson:"tags,omitempty" json:"tags,omitempty"`
	CreatedAt time.Time          `bson:"createdAt"      json:"createdAt"`
	UpdatedAt time.Time          `bson:"updatedAt"      json:"updatedAt"`
}

var blogs = []Blog{}

func (b *Blog) Save() {
	blogs = append(blogs, *b)

}

func GetAllBlogs() []Blog {
	return blogs
}
