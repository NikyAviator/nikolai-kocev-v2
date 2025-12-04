package utils

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

const secretKey = "will-be-changed-in-production"

func GenerateToken(emailAdmin, userId string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"emailAdmin": emailAdmin,
		"userId":     userId,
		"exp":        time.Now().Add(time.Hour * 1).Unix(),
	})

	return token.SignedString([]byte(secretKey))
}
