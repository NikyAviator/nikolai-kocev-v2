package db

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Store exposes typed collections your app uses.
// Add fields here as you add more collections (Users, Sessions, etc.)
type Store struct {
	Blogs *mongo.Collection
}

// NewStore wraps an existing *mongo.Database, attaches collections,
// and ensures indexes once at startup.
func NewStore(database *mongo.Database) (*Store, error) {
	store := &Store{
		Blogs: database.Collection("blogs"),
	}
	// Ensure indexes for each collection we own.
	if err := ensureBlogIndexes(database, store.Blogs); err != nil {
		return nil, err
	}
	return store, nil
}

func ensureBlogIndexes(_ *mongo.Database, collection *mongo.Collection) error {
	ctx := context.Background() // short ops; if you prefer, pass ctx from caller

	models := []mongo.IndexModel{
		{ // unique slug for permalinks
			Keys:    bson.D{{Key: "slug", Value: 1}},
			Options: options.Index().SetUnique(true).SetName("uniq_slug"),
		},
		{ // sort helper: newest first
			Keys:    bson.D{{Key: "publishedAt", Value: -1}},
			Options: options.Index().SetName("idx_publishedAt_desc"),
		},
	}
	_, err := collection.Indexes().CreateMany(ctx, models)
	return err
}
