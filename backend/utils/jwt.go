package utils

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// 設定密鑰 (實際專案中建議從 .env 或環境變數讀取)
var jwtSecret = []byte("your_super_secret_key_12345")

// Claims 結構：定義存放在 Token 裡的自訂資料
type Claims struct {
	UserID uint   `json:"user_id"`
	Email  string `json:"email"`
	jwt.RegisteredClaims
}

// GenerateToken 簽發 JWT Token
func GenerateToken(userID uint, email string) (string, error) {
	now := time.Now()
	// 設定 Token 過期時間，例如 24 小時後過期
	expirationTime := now.Add(24 * time.Hour)

	claims := Claims{
		UserID: userID,
		Email:  email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime), // 過期時間
			IssuedAt:  jwt.NewNumericDate(now),            // 簽發時間
			Issuer:    "pushproject-api",                  // 簽發者
		},
	}

	// 使用 HS256 演算法與 Claims 建立 Token 物件
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// 使用密鑰進行簽名，產生最終的 JWT 字串
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
func ValidateToken(tokenString string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})
	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	}
	return nil, err
}
