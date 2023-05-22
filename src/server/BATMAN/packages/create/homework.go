package create

import (
	"database/sql"
	"encoding/json"
	"io"
	"net/http"

	"github.com/jorgedel4/iCode/packages/structs"
	"github.com/jorgedel4/iCode/packages/util"
)

// Create new homework
func Homework(mysql *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Read request body
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		// Parse into struct
		var req structs.NewHWReq
		if err := json.Unmarshal(body, &req); err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		// Start transaction
		tx, err := mysql.Begin()
		if err != nil {
			http.Error(w, "Error creating homework", http.StatusInternalServerError)
			return
		}

		// Create homework for each one of the given groups
		for _, group := range req.Groups {
			// Create ID for individual homework
			hwID, err := util.GenerateID("H", 19)
			if err != nil {
				tx.Rollback()
				http.Error(w, "Error creating homework", http.StatusInternalServerError)
				return
			}

			// Create homework
			_, err = tx.Exec("INSERT INTO homework VALUES (?, ?, ?, ?, ?)", hwID, group, req.HWName, req.OpenDate, req.CloseDate)
			if err != nil {
				tx.Rollback()
				http.Error(w, "Error creating homework", http.StatusInternalServerError)
				return
			}

			// Add all of the module configurations for each module of the homework
			for _, moduleQuestion := range req.ModulesQuestions {
				_, err = tx.Exec("INSERT INTO homeworkConfigs VALUES (?, ?, ?)", hwID, moduleQuestion.Module, moduleQuestion.NQuestions)
				if err != nil {
					tx.Rollback()
					http.Error(w, "Error saving configurations", http.StatusInternalServerError)
					return
				}
			}
		}

		// Commit transaction
		if err := tx.Commit(); err != nil {
			tx.Rollback()
			http.Error(w, "Error commiting transaction", http.StatusInternalServerError)
			return
		}

		// Send response and close connection
		w.WriteHeader(http.StatusCreated)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
