package read

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jorgedel4/iCode/packages/structs"
)

// Get all of the modules that belong to a course
func CourseModules(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Get course ID from route variable
		courseID := mux.Vars(r)["courseID"]

		// Query to get the course's modules
		query := `SELECT id_module, nombre
		FROM modules
		WHERE course = ?`

		// Execute query
		rows, err := mysqlDB.Query(query, courseID)
		if err != nil {
			http.Error(w, "Error executing query", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var results []structs.CourseModule
		// Iterate over all of the returned modules and store them
		for rows.Next() {
			var result structs.CourseModule
			err = rows.Scan(&result.ID, &result.Name)
			if err != nil {
				http.Error(w, "Error reading results", http.StatusInternalServerError)
				return
			}

			results = append(results, result)
		}

		// Encode modules slice into JSON
		modulesJSON, err := json.Marshal(results)
		if err != nil {
			http.Error(w, "Error parsing response", http.StatusInternalServerError)
			return
		}

		// Return response and close connection
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(modulesJSON)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
