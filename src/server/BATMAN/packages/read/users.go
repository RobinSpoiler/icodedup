package read

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/jorgedel4/iCode/packages/consts"
	"github.com/jorgedel4/iCode/packages/structs"
)

// Get registered users
func Users(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Read needed variables from url parameters
		var req structs.UsersReq
		req.UserType = r.URL.Query().Get("user_type")
		req.Campus = r.URL.Query().Get("campus")
		req.ID = r.URL.Query().Get("id")
		req.Name = r.URL.Query().Get("name")

		// Select the users of a certain type
		baseQuery := fmt.Sprintf("SELECT * FROM %ss", req.UserType)
		var selectors []string
		var values []interface{}

		// Filter by campus
		if req.Campus != "all" {
			selectors = append(selectors, "campus = ?")
			values = append(values, req.Campus)
		}

		// Filter by ID
		if req.ID != "all" {
			selectors = append(selectors, fmt.Sprintf("%s = ?", consts.DBUsersIDColumn[req.UserType]))
			values = append(values, req.ID)
		}

		// Filter by name
		if req.Name != "all" {
			selectors = append(selectors, "CONCAT(first_name, ' ', flast_name, ' ', slast_name) = ?")
			values = append(values, req.Name)
		}

		var query string
		if len(selectors) > 0 {
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

		// Iterate over returned users and store them
		users := make([]structs.User, 0)
		
		for rows.Next() {
			var user structs.User
			if err := rows.Scan(&user.ID, &user.Campus, &user.FirstName, &user.FLastName, &user.SLastName); err != nil {
				http.Error(w, "Error reading results", http.StatusInternalServerError)
				return
			}
			// Fix this later :)
			user.Email = fmt.Sprintf("%s@tec.mx", user.ID)
			users = append(users, user)
		}

		// Encode users slice into JSON
		usersJSON, err := json.Marshal(users)
		if err != nil {
			http.Error(w, "Error parsing response", http.StatusInternalServerError)
			return
		}

		// Return response and close connection
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(usersJSON)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
