package routes

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/db"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// GET /api/blogs
func ListBlogs(store *db.Store) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
		defer cancel()

		cursor, err := store.Blogs.Find(ctx, bson.M{}, options.Find().SetSort(bson.D{{Key: "publishedAt", Value: -1}}))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "query failed"})
			return
		}
		defer cursor.Close(ctx)

		var out []models.Blog
		if err := cursor.All(ctx, &out); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "decode failed"})
			return
		}
		c.JSON(http.StatusOK, out)
	}
}

// POST /api/seed  (dev-only)
func SeedBlogs(store *db.Store) gin.HandlerFunc {
	return func(c *gin.Context) {
		now := time.Now()
		docs := []any{
			models.Blog{
				ID:        primitive.NewObjectID(),
				Title:     "Boost your conversion rate",
				Slug:      "boost-your-conversion-rate",
				Excerpt:   "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo...",
				ContentMD: "## Boost your conversion rate\n\nThis is **markdown**. Add more later.",
				ImageURL:  "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?auto=format&fit=crop&w=3603&q=80",
				Category:  models.Category{Title: "Marketing", Href: "#"},
				Author: models.Author{
					Name:     "Michael Foster",
					Role:     "Co-Founder / CTO",
					Href:     "#",
					ImageURL: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
				},
				PublishedAt: mustParse("2020-03-16"),
				Tags:        []string{"marketing"},
				CreatedAt:   now, UpdatedAt: now,
			},
			models.Blog{
				ID:        primitive.NewObjectID(),
				Title:     "How to use search engine optimization to drive sales",
				Slug:      "seo-to-drive-sales",
				Excerpt:   "Optio cum necessitatibus dolor voluptatum provident commodi et...",
				ContentMD: "## SEO to drive sales\n\nMore markdown here.",
				ImageURL:  "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?auto=format&fit=crop&w=3270&q=80",
				Category:  models.Category{Title: "Sales", Href: "#"},
				Author: models.Author{
					Name:     "Lindsay Walton",
					Role:     "Front-end Developer",
					Href:     "#",
					ImageURL: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
				},
				PublishedAt: mustParse("2020-03-10"),
				Tags:        []string{"sales"},
				CreatedAt:   now, UpdatedAt: now,
			},
			models.Blog{
				ID:        primitive.NewObjectID(),
				Title:     "Improve your customer experience",
				Slug:      "improve-customer-experience",
				Excerpt:   "Cupiditate maiores ullam eveniet adipisci in doloribus nulla minus...",
				ContentMD: "## Improve CX\n\nEven *more* markdown.",
				ImageURL:  "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=3270&q=80",
				Category:  models.Category{Title: "Business", Href: "#"},
				Author: models.Author{
					Name:     "Tom Cook",
					Role:     "Director of Product",
					Href:     "#",
					ImageURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
				},
				PublishedAt: mustParse("2020-02-12"),
				Tags:        []string{"business"},
				CreatedAt:   now, UpdatedAt: now,
			},
		}

		ctx, cancel := context.WithTimeout(c.Request.Context(), 5*time.Second)
		defer cancel()
		if _, err := store.Blogs.InsertMany(ctx, docs); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "seed failed"})
			return
		}
		c.JSON(http.StatusCreated, gin.H{"seeded": len(docs)})
	}
}

func mustParse(iso string) time.Time {
	t, err := time.Parse("2006-01-02", iso)
	if err != nil {
		return time.Now()
	}
	return t
}
