package routes

import (
	"pushproject-api/controllers"

	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine) {

	api := r.Group("/api")

	api.POST("/register", controllers.Register)
	api.POST("/login", controllers.Login) // 👈 新增 Login 路由
}
