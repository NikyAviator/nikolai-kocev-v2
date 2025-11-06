package mongo

import (
	"context"
	"errors"
	"time"

	mongodrv "go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Config holds minimal connection configuration.
type MongoConfigConfig struct {
	URI         string
	DBName      string
	ConnTimeout time.Duration // default 10s if zero
}

// Connect opens a MongoDB connection, verifies it with Ping, and returns
// the client, a database handle, and a cleanup function you should call on shutdown.
func ConnectMongoDB(parentCtx context.Context, cfg MongoConfigConfig) (*mongodrv.Client, *mongodrv.Database, func(context.Context) error, error) {
	if cfg.URI == "" {
		return nil, nil, nil, errors.New("mongo: Config.URI is empty")
	}
	if cfg.DBName == "" {
		return nil, nil, nil, errors.New("mongo: Config.DBName is empty")
	}
	if cfg.ConnTimeout == 0 {
		cfg.ConnTimeout = 10 * time.Second
	}

	// ApplyURI config; Atlas recommends pinning Server API v1 for stability.
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(cfg.URI).SetServerAPIOptions(serverAPI)

	// Time-bound connect + ping
	ctx, cancel := context.WithTimeout(parentCtx, cfg.ConnTimeout)
	defer cancel()

	client, err := mongodrv.Connect(ctx, opts)
	if err != nil {
		return nil, nil, nil, err
	}
	if err := client.Ping(ctx, nil); err != nil {
		_ = client.Disconnect(context.Background())
		return nil, nil, nil, err
	}

	db := client.Database(cfg.DBName)

	closeFn := func(ctx context.Context) error {
		return client.Disconnect(ctx)
	}

	return client, db, closeFn, nil
}
