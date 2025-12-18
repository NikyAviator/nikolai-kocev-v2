package service

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/domain"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/services/blog-service/internal/infrastructure/repository"
	"github.com/nikyaviator/nikolai-kocev-v2/backend/shared/utils"
)

type UserService interface {
	CreateUser(ctx context.Context, in domain.CreateUserInput) (domain.UserPublic, error)
	DeleteUser(ctx context.Context, id string) error
	LoginUser(ctx context.Context, loginReq domain.LoginRequest) (string, error)
}

type userService struct {
	userRepo repository.UserRepository
}

func NewUserService(r repository.UserRepository) UserService {
	return &userService{userRepo: r}
}

func (s *userService) CreateUser(ctx context.Context, in domain.CreateUserInput) (domain.UserPublic, error) {

	if strings.TrimSpace(in.Email) == "" || strings.TrimSpace(in.Password) == "" {
		return domain.UserPublic{}, errors.New("missing required fields")
	}

	// Hash the password before storing
	hashedPassword, err := utils.HashPassword(in.Password)
	if err != nil {
		return domain.UserPublic{}, err
	}

	// Merge input into domain.User
	newUser := &domain.User{
		Email:        in.Email,
		PasswordHash: hashedPassword,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}

	// Create user in the repository
	err = s.userRepo.Create(ctx, newUser)
	if err != nil {
		return domain.UserPublic{}, err
	}

	// Prepare public user data to return
	userPublic := domain.UserPublic{
		ID:        newUser.ID,
		Email:     newUser.Email,
		CreatedAt: newUser.CreatedAt,
	}

	return userPublic, nil

}

func (s *userService) DeleteUser(ctx context.Context, id string) error {

	if strings.TrimSpace(id) == "" {
		return errors.New("missing user id")
	}
	return s.userRepo.Delete(ctx, id)
}

func (s *userService) LoginUser(ctx context.Context, loginReq domain.LoginRequest) (string, error) {
	if strings.TrimSpace(loginReq.Email) == "" || strings.TrimSpace(loginReq.Password) == "" {
		return "", errors.New("email and password are required")
	}

	// Validate credentials -> returns the DB user ID (your repo already does this)
	userID, err := s.userRepo.ValidateCredentials(ctx, loginReq.Email, loginReq.Password)
	if err != nil {
		return "", errors.New("invalid email or password")
	}

	// Issue JWT (uses your existing helper)
	// Keep email from the request for now; if you later want canonical case, return email from repo too.
	token, err := utils.GenerateToken(loginReq.Email, userID) // uses SECRET_KEY and 1h exp
	if err != nil {
		return "", err
	}
	return token, nil
}
