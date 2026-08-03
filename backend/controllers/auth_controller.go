package controllers

import (
	"net/http"

	"pushproject-api/database"
	"pushproject-api/models"
	"pushproject-api/utils" // 引入 JWT 工具包

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Register(c *gin.Context) {

	var req RegisterRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "資料格式錯誤",
		})
		return
	}

	// 檢查 Email 是否存在
	var user models.User
	if err := database.DB.Where("email = ?", req.Email).First(&user).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Email 已存在",
		})
		return
	}

	// 密碼加密
	hashPassword, _ := bcrypt.GenerateFromPassword(
		[]byte(req.Password),
		bcrypt.DefaultCost,
	)

	user = models.User{
		Email:    req.Email,
		Password: string(hashPassword),
	}

	database.DB.Create(&user)

	c.JSON(http.StatusOK, gin.H{
		"message": "Register Success",
	})
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Login(c *gin.Context) {
	var req LoginRequest

	// 1. 解析請求資料
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "資料格式錯誤",
		})
		return
	}

	// 2. 透過 Email 尋找使用者
	var user models.User
	if err := database.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		// 找不到使用者
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "帳號或密碼錯誤",
		})
		return
	}

	// 3. 驗證密碼 Hash
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		// 密碼比對失敗
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "帳號或密碼錯誤",
		})
		return
	}

	// 4. 產生 JWT Token 🔑
	token, err := utils.GenerateToken(user.ID, user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "系統錯誤，無法產生 Token",
		})
		return
	}

	// 5. 比對成功，回傳 Token 與基本使用者資訊
	c.JSON(http.StatusOK, gin.H{
		"message": "Login Success",
		"token":   token,
		"user": gin.H{
			"id":    user.ID,
			"email": user.Email,
		},
	})
}
