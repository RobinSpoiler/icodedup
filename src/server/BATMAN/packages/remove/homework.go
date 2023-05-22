package remove

import (
	"database/sql"
	"net/http"

	"github.com/gorilla/mux"
)

// Delete homework
func Homework(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")

		hwID := mux.Vars(r)["homeworkID"]

		// Start transaction
		// Needed since multiple operations are made in cascade from SQL
		tx, err := mysqlDB.Begin()
		if err != nil {
			http.Error(w, "Error deleting homework", http.StatusInternalServerError)
			return
		}

		_, err = tx.Exec("DELETE FROM homework WHERE id_homework = ?", hwID)
		if err != nil {
			tx.Rollback()
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		err = tx.Commit()
		if err != nil {
			http.Error(w, "Error deleting homework", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
