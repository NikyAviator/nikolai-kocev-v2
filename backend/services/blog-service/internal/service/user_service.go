package service

import (
	"context"
	"errors"
	"strings"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/infrastructure/repository"
)

type UserService interface {
	CreateUser(ctx context.Context, in domain.User) (domain.User, error)
	DeleteUser(ctx context.Context, id string) error
}

type userService struct {
	userRepo repository.UserRepository
}

func NewUserService(r repository.UserRepository) UserService {
	return &userService{userRepo: r}
}

func (s *userService) CreateUser(ctx context.Context, in domain.User) (domain.User, error) {

	if strings.TrimSpace(in.AdminEmail) == "" || strings.TrimSpace(in.PasswordHash) == "" {
		return domain.User{}, errors.New("missing required fields")
	}

	user := domain.User{
		AdminEmail:   in.AdminEmail,
		PasswordHash: in.PasswordHash,
		CreatedAt:    in.CreatedAt,
		UpdatedAt:    in.UpdatedAt,
	}
	return s.userRepo.Create(ctx, user)
}

func (s *userService) DeleteUser(ctx context.Context, id string) error {

	if strings.TrimSpace(id) == "" {
		return errors.New("missing user id")
	}
	return s.userRepo.Delete(ctx, id)
}
