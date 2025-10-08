package db

import (
	"context"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"

	"go.mongodb.org/mongo-driver/mongo/options"
)

// Store holds typed collection handles.
type Store struct {
	Blogs *mongo.Collection
}

// Connect opens Mongo, pings it, creates indexes, and returns a Store.
func Connect(ctx context.Context, uri, dbName string) (*mongo.Client, *Store, error) {
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		return nil, nil, err
	}
	if err := client.Ping(ctx, nil); err != nil {
		_ = client.Disconnect(ctx)
		return nil, nil, err
	}

	database := client.Database(dbName)
	store := &Store{
		Blogs: database.Collection("blogs"),
	}

	// Ensure indexes once at startup.
	if err := ensureBlogIndexes(ctx, store.Blogs); err != nil {
		_ = client.Disconnect(ctx)
		return nil, nil, err
	}

	return client, store, nil
}

func ensureBlogIndexes(ctx context.Context, coll *mongo.Collection) error {
	models := []mongo.IndexModel{
		{ // unique slug
			Keys:    bson.D{{Key: "slug", Value: 1}},
			Options: options.Index().SetUnique(true).SetName("uniq_slug"),
		},
		{ // sort by newest published
			Keys:    bson.D{{Key: "publishedAt", Value: -1}},
			Options: options.Index().SetName("idx_publishedAt_desc"),
		},
	}
	_, err := coll.Indexes().CreateMany(ctx, models)
	return err
}

// (Optional) helps when you want to insert with zero values handled correctly.
func NewBlog() models.Blog { return models.Blog{} }
