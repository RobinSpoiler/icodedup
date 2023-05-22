package read

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jorgedel4/iCode/packages/structs"
)

// Get all enrolled students in a group
func EnrolledStudents(mysql *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Get group ID from router variables
		group := mux.Vars(r)["groupID"]

		// Query to get all students enrolled in a course
		query := `SELECT s.matricula, CONCAT(first_name, ' ', flast_name, ' ', slast_name) 
		FROM enrollments e 
		JOIN students s ON e.student = s.matricula
		WHERE e.grupo = ?`

		// Execute query
		rows, err := mysql.Query(query, group)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		// Iterate over all returned students and stored them
		var enrolledStudents []structs.Student
		for rows.Next() {
			var student structs.Student
			if err := rows.Scan(&student.ID, &student.Name); err != nil {
				http.Error(w, "Error reading results", http.StatusInternalServerError)
				return
			}
			enrolledStudents = append(enrolledStudents, student)
		}

		// Encode students slice into JSON
		studentsJSON, err := json.Marshal(enrolledStudents)
		if err != nil {
			http.Error(w, "Error parsing response", http.StatusInternalServerError)
			return
		}

		// Return response and close connection
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(studentsJSON)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
