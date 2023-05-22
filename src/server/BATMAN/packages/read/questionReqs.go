package read

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/jorgedel4/iCode/packages/structs"
)

// Get all question request form the questions pool
func QuestionReqs(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Get needed variables from URL parameters
		var req structs.QuestionReqsReq
		req.QuestionsType = r.URL.Query().Get("question_type")
		req.RequestedBy = r.URL.Query().Get("requested_by")
		req.Course = r.URL.Query().Get("course")
		req.Status = r.URL.Query().Get("status")

		// Check that they were given
		if req.QuestionsType == "" || req.RequestedBy == "" || req.Course == "" || req.Status == "" {
			http.Error(w, "Error reading parameters from url", http.StatusBadRequest)
			return
		}

		baseQuery := `SELECT q.id_question, q.q_type, q.info, q.created_by, CONCAT(p.first_name, ' ', p.flast_name, ' ', p.slast_name), c.id_course, c.course_name, m.nombre, q.current_status, q.submittedOn
		FROM questions q
		JOIN professors p ON q.created_by = p.nomina
		JOIN modules m ON q.module = m.id_module
		JOIN courses c ON m.course = c.id_course`

		var selectors []string
		var values []interface{}

		// Filter by question type
		if req.QuestionsType != "all" {
			selectors = append(selectors, "q.q_type = ?")
			values = append(values, req.QuestionsType)
		}

		// Filter by requester's ID
		if req.RequestedBy != "all" {
			selectors = append(selectors, "q.created_by = ?")
			values = append(values, req.RequestedBy)
		}

		// Filter by questions' course
		if req.Course != "all" {
			selectors = append(selectors, "c.id_course = ?")
			values = append(values, req.Course)
		}

		// Filter by questions' status
		if req.Status != "all" {
			selectors = append(selectors, "q.current_status = ?")
			values = append(values, req.Status)
		}

		var query string
		if len(selectors) > 0 {
			// Concatenate all filters into a string for SQL
			query = fmt.Sprintf("%s WHERE %s", baseQuery, strings.Join(selectors, " AND "))
		} else {
			query = baseQuery
		}

		// Execute query
		rows, err := mysqlDB.Query(query, values...)
		if err != nil {
			http.Error(w, "Error executing query", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		// Iterate over returned questions to store them
		var results []structs.QuestionReq
		for rows.Next() {
			var result structs.QuestionReq
			if err = rows.Scan(&result.ID, &result.Type, &result.Info, &result.RequestersID, &result.RequestersName, &result.Course, &result.CourseName, &result.Module, &result.Status, &result.SubmittedOn); err != nil {
				http.Error(w, "Error reading results", http.StatusInternalServerError)
				return
			}
			results = append(results, result)
		}

		// Encode questions slice into JSON
		hwreqsJSON, err := json.Marshal(results)
		if err != nil {
			http.Error(w, "Error parsing response", http.StatusInternalServerError)
			return
		}

		// Return response and close connection
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(hwreqsJSON)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
