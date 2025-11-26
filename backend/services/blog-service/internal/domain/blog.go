package domain

import (
	"time"
)

type CreateBlogInput struct {
	Title     string `json:"title"       binding:"required"`
	Slug      string `json:"slug"        binding:"required"`
	Excerpt   string `json:"excerpt"     binding:"required"`
	ContentMD string `json:"contentMd"   binding:"required"`
	ImageURL  string `json:"imageUrl"`
	Category  struct {
		Title string `json:"title"`
	} `json:"category"`
	Tags []string `json:"tags"`
}

// Persisted model (what we store in Mongo)
type Blog struct {
	ID          string    `bson:"_id,omitempty"   json:"id"`
	Title       string    `bson:"title"           json:"title"`
	Slug        string    `bson:"slug"            json:"slug"`
	Excerpt     string    `bson:"excerpt"         json:"excerpt"`
	ContentMD   string    `bson:"contentMd"       json:"contentMd"`
	ImageURL    string    `bson:"imageUrl"        json:"imageUrl"`
	Category    Category  `bson:"category"        json:"category"`
	PublishedAt time.Time `bson:"publishedAt"     json:"publishedAt"`
	Tags        []string  `bson:"tags,omitempty"  json:"tags,omitempty"`
	CreatedAt   time.Time `bson:"createdAt"       json:"createdAt"`
	UpdatedAt   time.Time `bson:"updatedAt"       json:"updatedAt"`
}

type Category struct {
	Title string `bson:"title" json:"title"`
}
