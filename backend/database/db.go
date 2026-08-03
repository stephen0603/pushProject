package database

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	dsn := "host=localhost user=admin password=123456 dbname=promotion port=5432 sslmode=disable TimeZone=Asia/Taipei"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("資料庫連線失敗：", err)
	}

	DB = db

	fmt.Println("✅ PostgreSQL Connected")
}
