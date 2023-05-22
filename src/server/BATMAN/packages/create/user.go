package create

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/jorgedel4/iCode/packages/consts"
	"github.com/jorgedel4/iCode/packages/structs"
)

func User(mysql *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Read request body
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		// Cast into struct
		var req structs.NewUser
		if err := json.Unmarshal(body, &req); err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		// Get user type
		accountType, ok := consts.AccountTypes[req.ID[0]]
		if !ok {
			http.Error(w, "Invalid user type", http.StatusBadRequest)
			return
		}

		// Query to insert user into corresponding table
		query := fmt.Sprintf("INSERT INTO %ss VALUES (?, ?, ?, ?, ?)", accountType)

		// Execute query
		_, err = mysql.Exec(query, req.ID, req.Campus, req.Name, req.FLastName, req.SLastName)
		if err != nil {
			http.Error(w, "Error creating user", http.StatusInternalServerError)
			return
		}

		// Send response and close connection
		w.WriteHeader(http.StatusCreated)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
