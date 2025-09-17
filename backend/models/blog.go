package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Blog struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"  json:"id"`
	Title     string             `bson:"title"          json:"title"`
	Slug      string             `bson:"slug"           json:"slug"`
	Excerpt   string             `bson:"excerpt"        json:"excerpt"`
	Content   string             `bson:"content"        json:"content"`
	CoverImg  string             `bson:"coverImg,omitempty" json:"coverImg,omitempty"`
	Category  string             `bson:"category"       json:"category"`
	AuthorID  primitive.ObjectID `bson:"author"         json:"author"` // ref to users collection
	Published bool               `bson:"published"      json:"published"`
	Tags      []string           `bson:"tags,omitempty" json:"tags,omitempty"`
	CreatedAt time.Time          `bson:"createdAt"      json:"createdAt"`
	UpdatedAt time.Time          `bson:"updatedAt"      json:"updatedAt"`
}
