package service

import (
	"context"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type service struct {
	repo domain.BlogRepository
}

func NewService(repo domain.BlogRepository) *service {
	return &service{
		repo: repo,
	}
}

// Implement service methods here
func (s *service) CreateBlog(ctx context.Context, blog *domain.BlogModel) (*domain.BlogModel, error) {
	newBlog := &domain.BlogModel{
		ID:          primitive.NewObjectID(),
		Title:       blog.Title,
		Slug:        blog.Slug,
		Excerpt:     blog.Excerpt,
		ContentMD:   blog.ContentMD,
		ImageURL:    blog.ImageURL,
		Category:    blog.Category,
		Author:      blog.Author,
		PublishedAt: blog.PublishedAt,
		Tags:        blog.Tags,
		CreatedAt:   blog.CreatedAt,
		UpdatedAt:   blog.UpdatedAt,
	}

	return s.repo.CreateBlog(ctx, newBlog)
}
