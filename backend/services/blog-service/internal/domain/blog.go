package domain

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Maybe add A Bool for Published? Check if it correct syntax

type Blog struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title       string             `bson:"title"        json:"title"`
	Slug        string             `bson:"slug"         json:"slug"`
	Excerpt     string             `bson:"excerpt"      json:"excerpt"`
	ContentMD   string             `bson:"contentMd"    json:"contentMd"`
	ImageURL    string             `bson:"imageUrl"     json:"imageUrl"`
	Category    Category           `bson:"category"     json:"category"`
	Author      Author             `bson:"author"       json:"author"`
	PublishedAt time.Time          `bson:"publishedAt"  json:"publishedAt"`
	// Published   bool               `bson:"published,false"    json:"published"`
	Tags []string `bson:"tags,omitempty" json:"tags,omitempty"`

	CreatedAt time.Time `bson:"createdAt" json:"createdAt"`
	UpdatedAt time.Time `bson:"updatedAt" json:"updatedAt"`
}

type Category struct {
	Title string `bson:"title" json:"title"`
	Href  string `bson:"href"  json:"href"`
}

type Author struct {
	Name     string `bson:"name"     json:"name"`
	Role     string `bson:"role"     json:"role"`
	Href     string `bson:"href"     json:"href"`
	ImageURL string `bson:"imageUrl" json:"imageUrl"`
}
