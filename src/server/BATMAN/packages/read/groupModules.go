package read

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jorgedel4/iCode/packages/structs"
)

// Get all the modules of a group
func GroupModules(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Get group and course IDs from router variables
		groupID := mux.Vars(r)["groupID"]
		userID := r.URL.Query().Get("user_id")

		var baseQuery string
		// Array of either Module or ModuleStudent
		// Module student has an additional field "progress"
		results := make([]interface{}, 0)
		// Values to replace placeholders when the query is executed
		var values []interface{}

		// Modules for a student
		if len(userID) > 0 && userID[0] == 'A' {
			// Query to select all modules from a group as well as the students progress of those modules
			baseQuery = `SELECT id_module, nombre, locked, n_question, successful_mod_attempts(?, id_module, grupo) AS answered
			FROM moduleConfigs mc
			JOIN modules m ON mc.module = m.id_module 
			WHERE mc.grupo = ?`

			values = append(values, userID)
			values = append(values, groupID)

			// Execute query
			rows, err := mysqlDB.Query(baseQuery, values...)
			if err != nil {
				http.Error(w, "Error executing query", http.StatusInternalServerError)
				return
			}
			defer rows.Close()

			// Iterate over the returned modules
			for rows.Next() {
				var result structs.ModuleStudent
				err = rows.Scan(&result.ID, &result.Name, &result.Locked, &result.NQuestions, &result.NAnswered)

				// Calculate user's progress
				result.Progress = int((float32(result.NAnswered) / float32(result.NQuestions)) * 100)

				if err != nil {
					http.Error(w, "Error reading results", http.StatusInternalServerError)
					return
				}

				results = append(results, result)
			}
		// Modules for a professor
		} else {
			baseQuery = `SELECT id_module, nombre, locked, n_question
			FROM moduleConfigs mc
			JOIN modules m ON mc.module = m.id_module 
			WHERE mc.grupo = ?`

			values = append(values, groupID)

			// Execute query
			rows, err := mysqlDB.Query(baseQuery, values...)
			if err != nil {
				http.Error(w, "Error executing query", http.StatusInternalServerError)
				return
			}
			defer rows.Close()

			// Iterate over the returned modules
			for rows.Next() {
				var result structs.Module
				err = rows.Scan(&result.ID, &result.Name, &result.Locked, &result.NQuestions)

				if err != nil {
					http.Error(w, "Error reading results", http.StatusInternalServerError)
					return
				}

				results = append(results, result)
			}
		}

		// Encode modules slice into JSON
		modulesJSON, err := json.Marshal(results)
		if err != nil {
			http.Error(w, "Error parsing response", http.StatusInternalServerError)
			return
		}

		// Return response and close connection
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(modulesJSON)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
