package repository

import (
	"context"
	"time"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type BlogRepository interface {
	Create(ctx context.Context, b *domain.Blog) error // Pointers for mutations
	Delete(ctx context.Context, id string) error
	DeleteAll(ctx context.Context) (int64, error)
	List(ctx context.Context) ([]domain.Blog, error)
	GetBySlug(ctx context.Context, slug string) (*domain.Blog, error) // Pointers for mutations
}

type MongoBlogRepository struct {
	coll *mongo.Collection
}

func NewMongoBlogRepository(db *mongo.Database) *MongoBlogRepository {
	return &MongoBlogRepository{coll: db.Collection("blogs")}
}

func (r *MongoBlogRepository) EnsureIndexes(ctx context.Context) error {
	models := []mongo.IndexModel{
		{Keys: bson.D{{Key: "slug", Value: 1}}, Options: options.Index().SetUnique(true)},
		{Keys: bson.D{{Key: "publishedAt", Value: -1}}},
	}
	_, err := r.coll.Indexes().CreateMany(ctx, models)
	return err
}

func (r *MongoBlogRepository) Create(ctx context.Context, b *domain.Blog) error {
	now := time.Now()
	b.CreatedAt = now
	b.UpdatedAt = now
	if b.PublishedAt.IsZero() {
		b.PublishedAt = now
	}
	// Let Mongo generate ObjectID; we’ll return it as hex string
	res, err := r.coll.InsertOne(ctx, b)
	if err != nil {
		return err
	}
	// Set the generated ID
	if oid, ok := res.InsertedID.(bson.ObjectID); ok {
		b.ID = oid
	}
	return nil
}

func (r *MongoBlogRepository) Delete(ctx context.Context, id string) error {
	oid, err := bson.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	_, err = r.coll.DeleteOne(ctx, bson.M{"_id": oid})
	return err
}

func (r *MongoBlogRepository) DeleteAll(ctx context.Context) (int64, error) {
	res, err := r.coll.DeleteMany(ctx, bson.D{})
	if err != nil {
		return 0, err
	}
	return res.DeletedCount, nil
}

// Loads all blogs into memory; suitable for small datasets.
// For bigger datasets, consider pagination.
func (r *MongoBlogRepository) List(ctx context.Context) ([]domain.Blog, error) {
	cursor, err := r.coll.Find(ctx, bson.M{}, options.Find().SetSort(bson.D{{Key: "publishedAt", Value: -1}}))

	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var blogs []domain.Blog

	if err := cursor.All(ctx, &blogs); err != nil {
		return nil, err
	}
	return blogs, nil
}

func (r *MongoBlogRepository) GetBySlug(ctx context.Context, slug string) (*domain.Blog, error) {
	var blog domain.Blog
	err := r.coll.FindOne(ctx, bson.M{"slug": slug}).Decode(&blog)
	if err != nil {
		return nil, err
	}
	return &blog, nil
}
