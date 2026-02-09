package repository

import (
	"context"
	"errors"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/shared/utils"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/v2/bson"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type UserRepository interface {
	Create(ctx context.Context, u *domain.User) error
	Delete(ctx context.Context, id string) error
	ValidateCredentials(ctx context.Context, email, password string) (string /* userID */, error)
	FindByID(ctx context.Context, id primitive.ObjectID) (*domain.User, error)
	FindByEmail(ctx context.Context, email string) (*domain.User, error)
}

type MongoUserRepository struct {
	coll *mongo.Collection
}

func NewMongoUserRepository(db *mongo.Database) *MongoUserRepository {
	return &MongoUserRepository{coll: db.Collection("users")}
}

func (r *MongoUserRepository) EnsureIndexes(ctx context.Context) error {
	models := []mongo.IndexModel{
		{Keys: bson.D{{Key: "email", Value: 1}}, Options: options.Index().SetUnique(true)},
	}
	_, err := r.coll.Indexes().CreateMany(ctx, models)
	return err
}

func (r *MongoUserRepository) Create(ctx context.Context, u *domain.User) error {

	res, err := r.coll.InsertOne(ctx, u)
	if err != nil {
		return err
	}
	// Set the generated ID
	if oid, ok := res.InsertedID.(primitive.ObjectID); ok {
		u.ID = oid
	}
	return nil

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

func (r *MongoUserRepository) ValidateCredentials(ctx context.Context, email, password string) (string, error) {
	// Find user by email
	var doc struct {
		ID           primitive.ObjectID `bson:"_id"`
		Email        string             `bson:"email"`
		PasswordHash string             `bson:"passwordHash"`
	}
	err := r.coll.FindOne(ctx, bson.M{"email": email}).Decode(&doc)
	if err != nil {
		return "", err
	}

	if !utils.CheckPasswordHash(password, doc.PasswordHash) {
		return "", errors.New("invalid credentials")
	}

	return doc.ID.Hex(), nil
}

// These two are for claims.go middleware
func (r *MongoUserRepository) FindByID(ctx context.Context, id primitive.ObjectID) (*domain.User, error) {
	var usr domain.User
	err := r.coll.FindOne(ctx, bson.M{"_id": id}).Decode(&usr)
	if err != nil {
		return nil, err
	}
	return &usr, nil
}

func (r *MongoUserRepository) FindByEmail(ctx context.Context, email string) (*domain.User, error) {
	var usr domain.User
	err := r.coll.FindOne(ctx, bson.M{"email": email}).Decode(&usr)
	if err != nil {
		return nil, err
	}
	return &usr, nil
}
