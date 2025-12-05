package utils

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

const secretKey = "will-be-changed-in-production"

func GenerateToken(adminEmail, userId string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"adminEmail": adminEmail,
		"userId":     userId,
		"exp":        time.Now().Add(time.Hour * 1).Unix(),
	})

	return token.SignedString([]byte(secretKey))
}

func VerifyToken(token string) error {
	parsedToken, err := jwt.Parse(token, func(token *jwt.Token) (any, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)
		if !ok {
			return nil, jwt.ErrTokenMalformed
		}
		return []byte(secretKey), nil
	})
	if err != nil {
		return errors.New("could not parse token")
	}

	tokenIsValid := parsedToken.Valid

	if !tokenIsValid {
		return errors.New("invalid token")
	}

	_, ok := parsedToken.Claims.(jwt.MapClaims)
	if !ok {
		return errors.New("invalid token claims")
	}
	// You can extract claims if needed
	// adminEmail := claims["adminEmail"].(string)
	// userId := claims["userId"].(string)

	return nil

}
