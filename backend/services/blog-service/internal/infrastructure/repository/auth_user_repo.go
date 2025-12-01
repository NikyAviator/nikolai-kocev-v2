package repository

import (
	"context"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserRepository interface {
	Create(ctx context.Context, u domain.User) (domain.User, error)
}

type MongoUserRepository struct {
	coll *mongo.Collection
}

func NewMongoUserRepository(db *mongo.Database) *MongoUserRepository {
	return &MongoUserRepository{coll: db.Collection("users")}
}

func (r *MongoUserRepository) Create(ctx context.Context, u domain.User) (domain.User, error) {
	_, err := r.coll.InsertOne(ctx, u)
	if err != nil {
		return domain.User{}, err
	}
	return u, nil
}
