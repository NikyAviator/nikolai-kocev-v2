package repository

import (
	"context"
	"time"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type mongoRepository struct {
	coll *mongo.Collection
}

func NewMongoRepository(db *mongo.Database) *mongoRepository {
	return &mongoRepository{coll: db.Collection("blogs")}
}

// Call once to Ensure Indexes
func (r *mongoRepository) EnsureIndexes(ctx context.Context) error {

	indexModels := []mongo.IndexModel{
		{ // unique slug
			Keys:    bson.D{{Key: "slug", Value: 1}},
			Options: options.Index().SetUnique(true),
		},
		{ // sort helper
			Keys:    bson.D{{Key: "publishedAt", Value: -1}},
			Options: options.Index().SetName("idx_publishedAt_desc"),
		},
	}

	_, err := r.coll.Indexes().CreateMany(ctx, indexModels)
	return err
}

// Implement repository methods here
func (r *mongoRepository) CreateBlog(ctx context.Context, blog *domain.BlogModel) (*domain.BlogModel, error) {

	now := time.Now()

	if blog.CreatedAt.IsZero() {
		blog.CreatedAt = now
	}

	blog.UpdatedAt = now

	res, err := r.coll.InsertOne(ctx, blog)
	if err != nil {
		return nil, err
	}
	blog.ID = res.InsertedID.(primitive.ObjectID)

	return blog, nil
}
