package remove

import (
	"database/sql"
	"net/http"

	"github.com/gorilla/mux"
)

// Delete course
func Course(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")

		courseID := mux.Vars(r)["courseID"]

		query := `DELETE FROM courses
		WHERE id_course = ?`

		_, err := mysqlDB.Exec(query, courseID)
		if err != nil {
			http.Error(w, "Error deleting course", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
