package main

import (
	"database/sql"
	"log"
	"net/http"
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/jorgedel4/iCode/packages/exec"
)

func main() {
	// Loading env variables (.env file)
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
		return
	}

	// Connection to MySQL
	db, err := sql.Open("mysql", fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?parseTime=true", os.Getenv("MYSQL_USER"), os.Getenv("MYSQL_PASSWORD"), os.Getenv("MYSQL_IP"), os.Getenv("MYSQL_PORT"), os.Getenv("MYSQL_DBNAME")))
	if err != nil {
		log.Fatal("Error connecting to MySQL:", err)
	}
	defer func() {
		if err = db.Close(); err != nil {
			log.Fatal("Error disconnecting from MySQL:", err)
		}
	}()

	// Creating router and defining routes
	r := mux.NewRouter()
	r.HandleFunc("/exec", exec.Code(db)).Methods("POST")

	log.Println("Starting CodeExec on port", os.Getenv("PORT"))

	// Start listening
	if err = http.ListenAndServe(os.Getenv("PORT"), r); err != nil {
		log.Fatalf("Error listening to port. %s", err.Error())
		return
	}
}
