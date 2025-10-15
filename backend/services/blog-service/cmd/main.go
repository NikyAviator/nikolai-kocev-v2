package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables from .env file
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("error loading .env file")
	}

	mongodbURI := os.Getenv("MONGODB_URI")
	port := os.Getenv("PORT")
	jwtSecret := os.Getenv("JWT_SECRET")
	mongodbName := os.Getenv("MONGODB_NAME")

	log.Println("MongoDB URI:", mongodbURI)
	log.Println("Port:", port)
	log.Println("JWT Secret:", jwtSecret)
	log.Println("MongoDB Name:", mongodbName)

	log.Println("Environment variables loaded successfully")
	log.Println("Now starting MongoDB instance")
	log.Println("PPC")
	// Here you would add the code to start your MongoDB instance or connect to it

}
