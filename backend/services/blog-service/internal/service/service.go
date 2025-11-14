package service

import (
	"context"
	"errors"
	"strings"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/infrastructure/repository"
)

type BlogService interface {
	CreateBlog(ctx context.Context, in domain.CreateBlogInput) (domain.Blog, error)
	DeleteBlog(ctx context.Context, id string) error
	DeleteAllBlogs(ctx context.Context) (int64, error)
}

type blogService struct {
	repo repository.BlogRepository
}

func NewBlogService(r repository.BlogRepository) BlogService {
	return &blogService{repo: r}
}

func (s *blogService) CreateBlog(ctx context.Context, in domain.CreateBlogInput) (domain.Blog, error) {
	if strings.TrimSpace(in.Title) == "" || strings.TrimSpace(in.Slug) == "" ||
		strings.TrimSpace(in.Excerpt) == "" || strings.TrimSpace(in.ContentMD) == "" {
		return domain.Blog{}, errors.New("missing required fields")
	}

	b := domain.Blog{
		Title:     in.Title,
		Slug:      in.Slug,
		Excerpt:   in.Excerpt,
		ContentMD: in.ContentMD,
		ImageURL:  in.ImageURL,
		Category: domain.Category{
			Title: in.Category.Title,
			Href:  in.Category.Href,
		},
		Author: domain.Author{
			Name:     in.Author.Name,
			Role:     in.Author.Role,
			Href:     in.Author.Href,
			ImageURL: in.Author.ImageURL,
		},
		Tags: in.Tags,
	}
	return s.repo.Create(ctx, b)
}

func (s *blogService) DeleteBlog(ctx context.Context, id string) error {
	return s.repo.Delete(ctx, id)
}

func (s *blogService) DeleteAllBlogs(ctx context.Context) (int64, error) {
	return s.repo.DeleteAll(ctx)
}
