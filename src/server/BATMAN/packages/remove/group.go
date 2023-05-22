package remove

import (
	"database/sql"
	"net/http"

	"github.com/gorilla/mux"
)

// Delete group
func Group(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")

		groupID := mux.Vars(r)["groupID"]

		query := `DELETE FROM grupos
		WHERE id_group = ?`

		_, err := mysqlDB.Exec(query, groupID)
		if err != nil {
			http.Error(w, "Error deleting group", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
