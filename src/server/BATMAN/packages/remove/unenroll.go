package remove

import (
	"database/sql"
	"encoding/json"
	"io"
	"net/http"

	"github.com/jorgedel4/iCode/packages/structs"
)

// Unenroll student from group and remove anything related to them in the group
func Unenroll(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")

		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		var req structs.EnrollmentReq
		if err := json.Unmarshal(body, &req); err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		tx, err := mysqlDB.Begin()
		if err != nil {
			http.Error(w, "Error deleting user", http.StatusInternalServerError)
			return
		}

		// Remove user from group
		query := `DELETE FROM enrollments
		WHERE student = ?
		AND grupo = ?`
		_, err = tx.Exec(query, req.Student, req.Group)
		if err != nil {
			tx.Rollback()
			http.Error(w, "Error unenrolling student", http.StatusInternalServerError)
			return
		}

		// Remove user's module question attempts
		query = `DELETE FROM questionAttempts
		WHERE student = ?
		AND grupo = ?`
		_, err = tx.Exec(query, req.Student, req.Group)
		if err != nil {
			tx.Rollback()
			http.Error(w, "Error unenrolling student", http.StatusInternalServerError)
			return
		}

		// Remove user's homework question attempts
		query = `DELETE hqa FROM hw_questionAttempts hqa
		JOIN homework hw ON hqa.homework = hw.id_homework
		WHERE hqa.student = ?
		AND hw.grupo = ?`
		_, err = tx.Exec(query, req.Student, req.Group)
		if err != nil {
			tx.Rollback()
			http.Error(w, "Error unenrolling student", http.StatusInternalServerError)
			return
		}

		err = tx.Commit()
		if err != nil {
			http.Error(w, "Error unenrolling student", http.StatusInternalServerError)
			return
		}

		// Return response and close connection
		w.WriteHeader(http.StatusOK)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
