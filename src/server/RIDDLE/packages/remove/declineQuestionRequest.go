package remove

import (
	"database/sql"
	"net/http"

	"github.com/gorilla/mux"
)

// Delete question from questions table
func DeclineRequest(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")

		//Obtain the questionID to delete from the URL
		//Example: localhost:8003//declineQuestionRequest/CQ000000000000001
		questionID := mux.Vars(r)["questionID"]

		query := `DELETE FROM questions
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

		//Check if the questions
		if rowsAffected == 0 {
			http.Error(w, "Question is already deleted", http.StatusNotFound)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
