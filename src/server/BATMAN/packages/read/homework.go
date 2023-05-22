package read

import (
	"database/sql"
	"fmt"
	"regexp"
	"strings"

	"net/http"

	"github.com/jorgedel4/iCode/packages/consts"
	"github.com/jorgedel4/iCode/packages/structs"
	"github.com/jorgedel4/iCode/packages/util"
)

// Return all the homework that a student has assigned or that a professor assigned
func Homework(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Enable CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")

		// Get needed variables from url parameters
		var hwReq structs.HWReq
		hwReq.ID = r.URL.Query().Get("id")
		hwReq.Time = r.URL.Query().Get("time")
		hwReq.Group = r.URL.Query().Get("group")
		hwReq.GroupBy = r.URL.Query().Get("group_by")

		// Verify that they were given
		if hwReq.ID == "" || hwReq.Time == "" || hwReq.Group == "" || hwReq.GroupBy == "" {
			http.Error(w, "Error reading parameters from url", http.StatusBadRequest)
			return
		}

		// Check user's account type
		accountType, ok := consts.AccountTypes[hwReq.ID[0]]
		if !ok {
			http.Error(w, "Invalid account type", http.StatusBadRequest)
			return
		}

		var baseQuery, query string
		var selectors []string
		var values []interface{}

		switch accountType {
		case "student":
			{
				baseQuery = `SELECT hw.id_homework, hw.hw_name, c.id_course, c.course_name, hw.grupo, hw.open_date, hw.close_date, successful_hw_attempts(e.student, hw.id_homework) as suc_attempts, hw_needed_questions(hw.id_homework) as needed
				FROM homework hw
				JOIN enrollments e ON hw.grupo = e.grupo
				JOIN grupos g ON hw.grupo = g.id_group
				JOIN courses c ON g.course = c.id_course`

				selectors = append(selectors, "e.student = ?")
				values = append(values, hwReq.ID)
			}
		case "professor":
			{
				baseQuery = `SELECT hw.id_homework, hw.hw_name, c.id_course, c.course_name, hw.grupo, hw.open_date, hw.close_date
				FROM homework hw
				JOIN grupos g ON hw.grupo = g.id_group
				JOIN courses c ON g.course = c.id_course`

				selectors = append(selectors, "g.main_professor = ?")
				values = append(values, hwReq.ID)
			}
		}

		switch hwReq.Time {
		case "week":
			{
				selectors = append(selectors, "hw.close_date BETWEEN CURRENT_TIMESTAMP AND DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 7 DAY)")
			}
		case "future":
			{
				selectors = append(selectors, "hw.close_date > CURRENT_TIMESTAMP")
			}
		}

		regex := regexp.MustCompile(`G\d{9}`)
		if regex.MatchString(hwReq.Group) {
			selectors = append(selectors, "hw.grupo = ?")
			values = append(values, hwReq.Group)
		}

		query = fmt.Sprintf("%s WHERE %s", baseQuery, strings.Join(selectors, " AND "))

		rows, err := mysqlDB.Query(query, values...)
		if err != nil {
			http.Error(w, "Error executing query", http.StatusInternalServerError)
			return
		}
		defer rows.Close()

		var results []interface{}
		var hwJSON []byte
		switch accountType {
		case "student":
			{
				for rows.Next() {
					var result structs.HWStudent
					if err := rows.Scan(&result.HW_ID, &result.HW_Name, &result.CourseID, &result.CourseName, &result.GroupID, &result.Opening, &result.Closing, &result.Needed, &result.Done); err != nil {
						http.Error(w, "Error reading results", http.StatusInternalServerError)
						return
					}
					results = append(results, result)
				}

				hwJSON, err = util.FormatHomework(results, "student", hwReq.GroupBy)
				if err != nil {
					http.Error(w, "Error formatting results", http.StatusInternalServerError)
					return
				}
			}
		case "professor":
			{
				for rows.Next() {
					var result structs.HWProfessor
					if err := rows.Scan(&result.HW_ID, &result.HW_Name, &result.CourseID, &result.CourseName, &result.GroupID, &result.Opening, &result.Closing); err != nil {
						http.Error(w, "Error reading results", http.StatusInternalServerError)
						return
					}
					results = append(results, result)
				}

				hwJSON, err = util.FormatHomework(results, "professor", hwReq.GroupBy)
				if err != nil {
					http.Error(w, "Error formatting results", http.StatusInternalServerError)
					return
				}
			}
		}

		// Return response and close connection
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(hwJSON)
		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()
	}
}
