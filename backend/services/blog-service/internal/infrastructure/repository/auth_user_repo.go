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

type UserRepository interface {
	Create(ctx context.Context, u domain.User) (domain.User, error)
	Delete(ctx context.Context, id string) error
}

type MongoUserRepository struct {
	coll *mongo.Collection
}

func NewMongoUserRepository(db *mongo.Database) *MongoUserRepository {
	return &MongoUserRepository{coll: db.Collection("users")}
}

func (r *MongoUserRepository) EnsureIndexes(ctx context.Context) error {
	models := []mongo.IndexModel{
		{Keys: bson.D{{Key: "adminEmail", Value: 1}}, Options: options.Index().SetUnique(true)},
	}
	_, err := r.coll.Indexes().CreateMany(ctx, models)
	return err
}

func (r *MongoUserRepository) Create(ctx context.Context, u domain.User) (domain.User, error) {
	now := time.Now()
	u.CreatedAt = now
	u.UpdatedAt = now
	// Let Mongo generate ObjectID; we’ll return it as hex string
	res, err := r.coll.InsertOne(ctx, u)
	if err != nil {
		return domain.User{}, err
	}
	// Set the generated ID
	if oid, ok := res.InsertedID.(primitive.ObjectID); ok {
		u.ID = oid.Hex()
	}
	return u, nil

}
func (r *MongoUserRepository) Delete(ctx context.Context, id string) error {
	oid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	res, err := r.coll.DeleteOne(ctx, bson.M{"_id": oid})
	if err != nil {
		return err
	}
	if res.DeletedCount == 0 {
		return mongo.ErrNoDocuments
	}
	return nil
}
