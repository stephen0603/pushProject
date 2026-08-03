package routes

import (
	"net/http"

	middlewares "pushproject-api/middleware"

	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.Engine) {

	// 建立受到 AuthMiddleware 保護的路由群組
	protected := r.Group("/api/user")
	protected.Use(middlewares.AuthMiddleware())
	{
		// 測試用 API：取得個人資料 (必須帶上有效的 Bearer Token)
		protected.GET("/me", func(c *gin.Context) {
			userID, _ := c.Get("userID")
			email, _ := c.Get("userEmail")

			c.JSON(http.StatusOK, gin.H{
				"message": "受保護的 API 存取成功",
				"user": gin.H{
					"id":    userID,
					"email": email,
				},
			})
		})
	}
}
