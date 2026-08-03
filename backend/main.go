package main

import (
	"net/http"
	"pushproject-api/database"
	"pushproject-api/models"
	"pushproject-api/routes"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	// 連接資料庫
	database.Connect()

	// 建立資料表
	database.DB.AutoMigrate(&models.User{})

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
		MaxAge:       12 * time.Hour,
	}))

	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "ok",
		})
	})
	routes.AuthRoutes(r)
	routes.UserRoutes(r)
	r.Run(":8080")
}
