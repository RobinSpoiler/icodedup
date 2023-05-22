package update

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
	"github.com/jorgedel4/iCode/packages/structs"
)

// Update a homework's configuration
func Homework(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")

		homeworkID := mux.Vars(r)["homeworkID"]
		if homeworkID == "" {
			http.Error(w, "No homework", http.StatusBadRequest)
			return
		}

		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		var req structs.UpdateHWReq
		if err = json.Unmarshal(body, &req); err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		var hwConfigs []string
		var values []interface{}

		// New homework settings
		if req.Name != "" {
			hwConfigs = append(hwConfigs, "hw_name = ?")
			values = append(values, req.Name)
		}

		if !req.OpenDate.IsZero() {
			hwConfigs = append(hwConfigs, "open_date = ?")
			values = append(values, req.OpenDate)
		}

		if !req.CloseDate.IsZero() {
			hwConfigs = append(hwConfigs, "close_date = ?")
			values = append(values, req.CloseDate)
		}

		tx, err := mysqlDB.Begin()
		if err != nil {
			http.Error(w, "Error updating homework", http.StatusInternalServerError)
			return
		}

		// Update homework info
		if len(hwConfigs) > 0 {
			hwConfigsSQL := strings.Join(hwConfigs, ", ")
			updateHWquery := fmt.Sprintf(`UPDATE homework
			SET %s
			WHERE id_homework = ?`, hwConfigsSQL)

			values = append(values, homeworkID)
			_, err = tx.Exec(updateHWquery, values...)
			if err != nil {
				tx.Rollback()
				http.Error(w, "Error updating homework", http.StatusInternalServerError)
				return
			}
		}

		// Update the modules configuration for the homework
		if len(req.ModulesQuestions) > 0 {
			// Delete previos hw module configs
			deleteQuery := `DELETE FROM homeworkConfigs 
			WHERE homework = ?`

			_, err = mysqlDB.Exec(deleteQuery, homeworkID)
			if err != nil {
				tx.Rollback()
				http.Error(w, "Error updating homework", http.StatusInternalServerError)
				return
			}

			// Add new hw module configs
			for _, moduleQuestion := range req.ModulesQuestions {
				_, err = tx.Exec("INSERT INTO homeworkConfigs VALUES (?, ?, ?)", homeworkID, moduleQuestion.Module, moduleQuestion.NQuestions)
				if err != nil {
					tx.Rollback()
					http.Error(w, "Error updating homework", http.StatusInternalServerError)
					return
				}
			}
		}

		if err = tx.Commit(); err != nil {
			http.Error(w, "Error updating homework", http.StatusInternalServerError)
			return
		}


		// Return response and close connection
		w.WriteHeader(http.StatusOK)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
