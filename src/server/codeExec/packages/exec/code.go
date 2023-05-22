package exec

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/jorgedel4/iCode/packages/python"
)

func Code(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Allow CORS (not needed after application has been fully deployed)
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Reading requests body
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		// Parsing the body into a struct
		var reqBody RequestBody
		if err := json.Unmarshal(body, &reqBody); err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		var problemJSON string

		query := "SELECT info FROM questions WHERE id_question = ?"
		err = db.QueryRow(query, reqBody.ID).Scan(&problemJSON)
		if err != nil {
			http.Error(w, "Error executing query", http.StatusInternalServerError)
			return
		}

		// Parsing the body into a struct
		var problem Problem
		err = json.Unmarshal([]byte(problemJSON), &problem)
		if err != nil {
			http.Error(w, "Error parsing result from db", http.StatusInternalServerError)
			return
		}

		// Check if code contains forbidden functions
		// function returns a slice with all the functions that were found
		forbiddenFuncsFound := findForbiddenFunctions(reqBody.Code, problem.ForbiddenFuncs)
		if len(forbiddenFuncsFound) != 0 {
			http.Error(w, fmt.Sprintf("Found forbidden functions in code [%s]", strings.Join(forbiddenFuncsFound, ", ")), http.StatusForbidden)
			return
		}

		// Determine what function will be used to run the code
		var exec func(code string, inputs []string) (string, error)
		switch problem.Language {
		case "python":
			{
				exec = python.Execute
			}
		}

		var result Result
		// Initializing values
		result.Passed = true
		result.ShownTests = make([]map[string]interface{}, 0)
		result.HiddenTests = make(map[string]int)
		result.HiddenTests["passed"] = 0
		result.HiddenTests["failed"] = 0

		// No code given
		if len(strings.TrimSpace(reqBody.Code)) == 0 {
			result.Error = "Código vacío. Hechate unas líneas"
			result.Passed = false
		} else {
			// Running hidden tests
			for i := 0; i < len(problem.HiddenInputs); i++ {
				input := problem.HiddenInputs[i]
				expected := problem.HiddenOutputs[i]
				output, err := exec(reqBody.Code, input)
				if err != nil {
					result = Result{
						Error:       err.Error(),
						ShownTests:  make([]map[string]interface{}, 0),
						HiddenTests: make(map[string]int),
						Passed:      false,
					}
					// return json here
					break
				} else {
					addOutput(output, expected, input, &result, false)
				}
			}

			// Running shown tests
			for i := 0; i < len(problem.ShownInputs); i++ {
				input := problem.ShownInputs[i]
				expected := problem.ShownOutputs[i]
				output, err := exec(reqBody.Code, input)
				if err != nil {
					result = Result{
						Error:       err.Error(),
						ShownTests:  make([]map[string]interface{}, 0),
						HiddenTests: make(map[string]int),
						Passed:      false,
					}
					// return json here
					break
				} else {
					addOutput(output, expected, input, &result, true)
				}
			}
		}

		resultJSON, err := json.Marshal(result)
		if err != nil {
			http.Error(w, "Error formatting response", http.StatusInternalServerError)
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(resultJSON)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
