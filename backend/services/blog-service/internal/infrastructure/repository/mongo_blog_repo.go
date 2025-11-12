package repository

import (
	"context"
	"time"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type BlogRepository interface {
	Create(ctx context.Context, b domain.Blog) (domain.Blog, error)
	Delete(ctx context.Context, id string) error
}

type MongoBlogRepository struct {
	coll *mongo.Collection
}

func NewMongoBlogRepository(db *mongo.Database) *MongoBlogRepository {
	return &MongoBlogRepository{coll: db.Collection("blogs")}
}

func (r *MongoBlogRepository) Create(ctx context.Context, b domain.Blog) (domain.Blog, error) {
	now := time.Now()
	b.CreatedAt = now
	b.UpdatedAt = now
	if b.PublishedAt.IsZero() {
		b.PublishedAt = now
	}
	// Let Mongo generate ObjectID; we’ll return it as hex string
	res, err := r.coll.InsertOne(ctx, b)
	if err != nil {
		return domain.Blog{}, err
	}
	// Set the generated ID
	if oid, ok := res.InsertedID.(primitive.ObjectID); ok {
		b.ID = oid.Hex()
	}
	return b, nil
}

func (r *MongoBlogRepository) Delete(ctx context.Context, id string) error {
	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	_, err = r.coll.DeleteOne(ctx, primitive.M{"_id": oid})
	return err
}
