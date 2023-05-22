package read

import (
	"database/sql"
	"elPadrino/RIDDLE/packages/structs"
	"encoding/json"
	"fmt"
	"net/http"
)

// Get the progress for a homework
func StatusHomework(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Get the required variables from URL parameters
		var req structs.HomeworkCheck
		req.StudentID = r.URL.Query().Get("student_id")
		req.HomeworkID = r.URL.Query().Get("homework_id")

		// Check if the required variables are provided
		if req.StudentID == "" || req.HomeworkID == "" {
			http.Error(w, "Error reading parameters from URL", http.StatusBadRequest)
			return
		}

		query := `SELECT CalculateProgress(?, ?);`

		var progress int
		err := mysqlDB.QueryRow(query, req.StudentID, req.HomeworkID).Scan(&progress)
		if err != nil {
			http.Error(w, "Error executing query", http.StatusInternalServerError)
			return
		}

		// Add the percentage symbol to the progress
		progressWithSymbol := fmt.Sprintf("%d%%", progress)

		// Create a response struct
		response := struct {
			Progress string `json:"progress"`
		}{
			Progress: progressWithSymbol,
		}

		// Encode the response struct into JSON
		responseJSON, err := json.Marshal(response)
		if err != nil {
			http.Error(w, "Error parsing response", http.StatusInternalServerError)
			return
		}

		// Set the response headers and write the response JSON
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(responseJSON)
	}
}
