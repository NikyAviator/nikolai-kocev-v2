package repository

import (
	"context"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type mongoRepository struct {
	db *mongo.Database
}

func NewMongoRepository(db *mongo.Database) *mongoRepository {
	return &mongoRepository{db: db}
}

// Implement repository methods here
func (r *mongoRepository) CreateBlog(ctx context.Context, blog *domain.BlogModel) (*domain.BlogModel, error) {
	result, err := r.db.Collection("blogs").InsertOne(ctx, blog)
	if err != nil {
		return nil, err
	}

	blog.ID = result.InsertedID.(primitive.ObjectID)

	return blog, nil
}
