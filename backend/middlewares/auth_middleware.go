package middlewares

import (
	"net/http"
	"strings"

	"pushproject-api/utils"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// 1. 從 Header 取得 Authorization
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "未提供驗證 Token"})
			c.Abort() // 阻斷請求，不繼續執行後續 Handler
			return
		}

		// 2. 解析 Bearer <Token>
		parts := strings.SplitN(authHeader, " ", 2)
		if !(len(parts) == 2 && parts[0] == "Bearer") {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Token 格式錯誤"})
			c.Abort()
			return
		}

		tokenString := parts[1]

		// 3. 驗證 Token (呼叫 utils 解讀 Token)
		claims, err := utils.ValidateToken(tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "Token 無效或已過期"})
			c.Abort()
			return
		}

		// 4. 將解析出的 UserID 寫入 Gin Context，方便後續 Controller 使用
		c.Set("userID", claims.UserID)
		c.Set("userEmail", claims.Email)

		c.Next() // 驗證通過，繼續往下執行
	}
}
