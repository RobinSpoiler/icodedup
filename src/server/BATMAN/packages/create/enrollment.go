package create

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/jorgedel4/iCode/packages/structs"
)

// Enroll student to group
func Enrollment(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Read request body
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		// Cast into struct
		var req structs.EnrollmentReq
		if err := json.Unmarshal(body, &req); err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		// Query to insert into the enrollments table
		baseQuery := "INSERT INTO enrollments(grupo, student) VALUES (?, ?)"

		// Execute insertion
		_, err = mysqlDB.Exec(baseQuery, req.Group, req.Student)
		if err != nil {
			// Student already enrolled in given group
			if strings.HasPrefix(err.Error(), "Error 1062 (23000): Duplicate entry") {
				http.Error(w, fmt.Sprintf("'%s' already enrolled in '%s'", req.Student, req.Group), http.StatusConflict)
				return
			// Group does not exist
			} else if strings.Contains(err.Error(), "grupos"){
				http.Error(w, fmt.Sprintf("Group '%s' does not exist", req.Group), http.StatusBadRequest)
				return
			// Student does not exist
			} else if strings.Contains(err.Error(), "students"){
				http.Error(w, fmt.Sprintf("Student '%s' does not exist", req.Student), http.StatusBadRequest)
				return
			}
		}

		// Send response and close connection
		w.WriteHeader(http.StatusCreated)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
