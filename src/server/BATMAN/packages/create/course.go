package create

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/jorgedel4/iCode/packages/structs"
	"github.com/jorgedel4/iCode/packages/util"
)

func Course(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Read request body
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		// Cast body into struct
		var req structs.NewCourseReq
		if err = json.Unmarshal(body, &req); err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		tx, err := mysqlDB.Begin()
		if err != nil {
			http.Error(w, "Error creating course", http.StatusInternalServerError)
			return
		}

		// Check that no other course has the same name
		count := 0
		duplicatesQuery := `SELECT COUNT(*) FROM courses
		WHERE course_name = ?`

		// Get the count of courses with the request name
		err = tx.QueryRow(duplicatesQuery, req.Name).Scan(&count)
		if err != nil {
			tx.Rollback()
			http.Error(w, err.Error(), http.StatusConflict)
			return
		}

		// There is already a course with the request name
		if count != 0 {
			tx.Rollback()
			http.Error(w, fmt.Sprintf("Course with name '%s' already exists", req.Name), http.StatusConflict)
			return
		}

		// Create course
		courseQuery := `INSERT INTO courses (id_course, course_name)
		VALUES (?, ?)`

		_, err = tx.Exec(courseQuery, req.ID, req.Name)
		if err != nil {
			tx.Rollback()
			if strings.Contains(err.Error(), req.ID){
				http.Error(w, fmt.Sprintf("Course with ID '%s' already exists", req.ID), http.StatusConflict)
			} else {
				http.Error(w, "Error creating course", http.StatusInternalServerError)
			}
			return
		}

		// Create modules
		for _, module := range req.Modules {
			moduleID, err := util.GenerateID("M", 19)
			if err != nil {
				tx.Rollback()
				http.Error(w, "Error creating course", http.StatusInternalServerError)
				return
			}

			// Insert module
			moduleQuery := `INSERT INTO modules (id_module, course, nombre)
			VALUES (?, ?, ?)`

			_, err = tx.Exec(moduleQuery, moduleID, req.ID, module)
			if err != nil {
				tx.Rollback()
				http.Error(w, "Error creating course", http.StatusInternalServerError)
				return
			}
		}

		err = tx.Commit()
		if err != nil {
			tx.Rollback()
			http.Error(w, "Error creating course", http.StatusInternalServerError)
			return
		}

		// Return response and close connection
		w.WriteHeader(http.StatusCreated)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
