package update

import (
	"database/sql"
	"net/http"

	"github.com/gorilla/mux"
)

// Delete question from questions table
func UpdateStatus(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")

		//Obtain the questionID to delete from the URL
		//Example: localhost:8003/aproveQuestionRequest/CQ000000000000001
		questionID := mux.Vars(r)["questionID"]

		query := `UPDATE questions
		SET current_status = "APP"
		WHERE id_question = ?`

		result, err := mysqlDB.Exec(query, questionID)
		if err != nil {
			http.Error(w, "Error deleting question", http.StatusInternalServerError)
			return
		}

		// Check the number of affected rows
		rowsAffected, err := result.RowsAffected()
		if err != nil {
			http.Error(w, "Error updating question", http.StatusInternalServerError)
			return
		}

		//Check if the question exist
		// If no rows were affected, the questionID doesn't exist
		if rowsAffected == 0 {
			http.Error(w, "Question not found", http.StatusNotFound)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
