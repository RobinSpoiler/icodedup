package update

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
	"github.com/jorgedel4/iCode/packages/consts"
	"github.com/jorgedel4/iCode/packages/structs"
)

// Update an user's information
func User(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")

		userID := mux.Vars(r)["userID"]
		if userID == "" {
			http.Error(w, "No user given", http.StatusBadRequest)
			return
		}

		userType, ok := consts.AccountTypes[userID[0]]
		if !ok {
			http.Error(w, "Invalid account type", http.StatusBadRequest)
			return
		}

		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		var req structs.NewUser
		if err = json.Unmarshal(body, &req); err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		var columnsToChange []string
		var values []interface{}

		// Get all columns that will be changed
		if req.Campus != "" {
			columnsToChange = append(columnsToChange, "campus = ?")
			values = append(values, req.Campus)
		}

		if req.Name != "" {
			columnsToChange = append(columnsToChange, "first_name = ?")
			values = append(values, req.Name)
		}

		if req.FLastName != "" {
			columnsToChange = append(columnsToChange, "flast_name = ?")
			values = append(values, req.FLastName)
		}

		if req.SLastName != "" {
			columnsToChange = append(columnsToChange, "slast_name = ?")
			values = append(values, req.SLastName)
		}

		if len(columnsToChange) != 0 {
			// Turn selected columns into SQL string
			columnsToChangeSQL := strings.Join(columnsToChange, ", ")
			idColumn := consts.DBUsersIDColumn[userType]

			query := fmt.Sprintf(`UPDATE %ss
			SET %s
			WHERE %s = ?`,
			userType, columnsToChangeSQL, idColumn)

			values = append(values, userID)
			_, err = mysqlDB.Exec(query, values...)
			if err != nil {
				http.Error(w, "Error updating user's info", http.StatusInternalServerError)
				return
			}
		}

		// Return response and close connection
		w.WriteHeader(http.StatusOK)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
