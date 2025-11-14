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
		Href  string `json:"href"`
	} `json:"category"`
	Author struct {
		Name     string `json:"name"`
		Role     string `json:"role"`
		Href     string `json:"href"`
		ImageURL string `json:"imageUrl"`
	} `json:"author"`
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
	Author      Author    `bson:"author"          json:"author"`
	PublishedAt time.Time `bson:"publishedAt"     json:"publishedAt"`
	Tags        []string  `bson:"tags,omitempty"  json:"tags,omitempty"`
	CreatedAt   time.Time `bson:"createdAt"       json:"createdAt"`
	UpdatedAt   time.Time `bson:"updatedAt"       json:"updatedAt"`
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
