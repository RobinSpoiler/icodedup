package create

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"regexp"
	"strings"

	"github.com/jorgedel4/iCode/packages/structs"
)

// Add new campus to DB
func Campus(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Read request body
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		// Cast body into struct
		var req structs.Campus
		if err = json.Unmarshal(body, &req); err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		// All campus' ids must be 3 characters long
		match, _ := regexp.MatchString("^[A-Z]{3}$", req.ID)
		if !match {
			http.Error(w, "Campus ID must be 3 characters long and only contain upper case letters", http.StatusBadRequest)
			return
		}

		// Query to insert the new campus, first place holder is for ID and second for name
		query := "INSERT INTO campus VALUES (?, ?)"

		// Execute query
		_, err = mysqlDB.Exec(query, req.ID, req.Name)
		if err != nil {
			// Catch duplicate entry error
			if strings.HasPrefix(err.Error(), "Error 1062 (23000): Duplicate entry") {
				http.Error(w, fmt.Sprintf("Campus with ID '%s' already exists", req.ID), http.StatusConflict)
			// Catch all other errors
			} else {
				http.Error(w, "Error creating campus", http.StatusInternalServerError)
			}
			return
		}

		// Indicate an end to the connection
		w.WriteHeader(http.StatusCreated)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
