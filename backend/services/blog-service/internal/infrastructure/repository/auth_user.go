package repository

import (
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserRepository interface {
	Create(user domain.User) (domain.User, error)
}

type MongoUserRepository struct {
	coll *mongo.Collection
}

func NewMongoUserRepository(db *mongo.Database) *MongoUserRepository {
	return &MongoUserRepository{coll: db.Collection("users")}
}
