package update

import (
	"database/sql"
	"encoding/json"
	"io"
	"net/http"

	"github.com/jorgedel4/iCode/packages/structs"
)

// Toggles the status (locked or unlocked) of a module
func ModuleStatus(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")

		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		var req structs.SwitchModStatusReq
		if err = json.Unmarshal(body, &req); err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		// Query to switch the module's status
		query := `UPDATE moduleConfigs
		SET locked = NOT locked
		WHERE grupo = ?
		AND module = ?`

		tx, err := mysqlDB.Begin()
		if err != nil {
			http.Error(w, "Error updating module status", http.StatusInternalServerError)
			return
		}

		res, err := tx.Exec(query, req.Group, req.Module)
		if err != nil {
			http.Error(w, "Error updating module status", http.StatusInternalServerError)
			return
		}

		// Check that 1 row was affected
		count, err := res.RowsAffected()
		if err != nil {
			http.Error(w, "Error updating module status", http.StatusInternalServerError)
			return
		}

		if count != 1 {
			tx.Rollback()
			http.Error(w, "Error updating module status", http.StatusInternalServerError)
			return
		}

		tx.Commit()

		// Return response and close connection
		w.WriteHeader(http.StatusOK)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
