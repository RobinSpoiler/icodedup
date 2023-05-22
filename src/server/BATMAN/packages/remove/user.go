package remove

import (
	"database/sql"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jorgedel4/iCode/packages/consts"
)

// Delete user and all of its dependencies
func User(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")

		userID := mux.Vars(r)["userID"]

		if userID == "" {
			http.Error(w,"User ID was not given", http.StatusBadRequest)
			return
		}

		accountType := consts.AccountTypes[userID[0]]

		// Deletion on cascade from SQL, must be a transaction
		tx, err := mysqlDB.Begin()
		if err != nil {
			http.Error(w, "Error deleting user", http.StatusInternalServerError)
			return
		}

		switch accountType {
		case "student":
			{
				_, err = tx.Exec("DELETE FROM students WHERE matricula = ?", userID)
				if err != nil {
					tx.Rollback()
					http.Error(w, "Error deleting user", http.StatusInternalServerError)
					return
				}
			}
		case "professor":
			{
				_, err = tx.Exec("DELETE FROM professors WHERE nomina = ?", userID)
				if err != nil {
					tx.Rollback()
					http.Error(w, "Error deleting user", http.StatusInternalServerError)
					return
				}
			}
		case "admin":
			{
				_, err = tx.Exec("DELETE FROM admins WHERE id_admin = ?", userID)
				if err != nil {
					tx.Rollback()
					http.Error(w, "Error deleting user", http.StatusInternalServerError)
					return
				}
			}
		}

		err = tx.Commit()
		if err != nil {
			http.Error(w, "Error deleting user", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()

	}
}
