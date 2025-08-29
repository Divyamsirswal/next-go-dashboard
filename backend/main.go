package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Note struct {
	gorm.Model
	Title    string `json:"title"`
	Content  string `json:"content"`
	Category string `json:"category"`
}

var DB *gorm.DB

func connectDB() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using environment variables from hosting service")
	}
	cn := os.Getenv("DATABASE_URL")
	db, err := gorm.Open(postgres.Open(cn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
	}
	log.Println("Database connection successful.")
	DB = db
}

func migrateDB() {
	DB.AutoMigrate(&Note{})
	log.Println("Database migration successful.")
}

func getNotes(c echo.Context) error {
	var notes []Note
	if err := DB.Order("created_at desc").Find(&notes).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusOK, notes)
}

func createNote(c echo.Context) error {
	note := new(Note)
	if err := c.Bind(note); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	if err := DB.Create(&note).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusCreated, note)
}

func main() {
	e := echo.New()

	connectDB()
	migrateDB()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	corsOrigin := os.Getenv("CORS_ORIGIN")
	if corsOrigin == "" {
		corsOrigin = "http://localhost:3000"
	}

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{corsOrigin},
		AllowMethods: []string{http.MethodGet, http.MethodPost},
	}))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	e.GET("/notes", getNotes)
	e.POST("/notes", createNote)

	e.Logger.Fatal(e.Start(":" + port))
}
