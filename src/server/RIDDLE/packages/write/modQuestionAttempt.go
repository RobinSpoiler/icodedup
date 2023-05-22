package write

import (
	"database/sql"
	"elPadrino/RIDDLE/packages/structs"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

/* Function to post questions */
func ModQuestAttempt(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")

		//Leer el body de la conexion
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "chispas", http.StatusBadRequest)
			return
		}

		//Tomar del JSON la informacion
		var req structs.ModQuestAttempt
		if err := json.Unmarshal(body, &req); err != nil {
			http.Error(w, "Error reading request body", http.StatusBadRequest)
			return
		}

		//Query de inserciona la base de datos
		baseQuery := "INSERT INTO questionAttempts(student, grupo, question, attempt_status, attempt_date) VALUES (?, ?, ?, ?, ?)"

		//Prepara genera un puntero
		stmt, err := mysqlDB.Prepare(baseQuery)
		if err != nil {
			http.Error(w, "Error preparing query", http.StatusInternalServerError)
			return
		}
		defer stmt.Close()

		//Generate the time of submittion
		now := time.Now()

		_, err = stmt.Exec(req.Student, req.Group, req.IdQuestion, req.AttemptStatus, now)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			if err.Error() == "Error 1452 (23000): Cannot add or update a child row: a foreign key constraint fails (`icode`.`questions`, CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `professors` (`nomina`) ON DELETE CASCADE)" {
				http.Error(w, fmt.Sprintf("The professor'%s' does not exist", req.IdQuestion), http.StatusBadRequest)
				return
			} else if err.Error() == "Error 1452 (23000): Cannot add or update a child row: a foreign key constraint fails (`icode`.`questions`, CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`module`) REFERENCES `modules` (`id_module`) ON DELETE CASCADE)" {
				http.Error(w, fmt.Sprintf("Student '%s' does not exist", req.Group), http.StatusBadRequest)
				return
			}
			//Falta revisar que la estructura del Info este completa en cada uno de sus elementos
		}

		// Enviar respuesta
		w.WriteHeader(http.StatusOK)

	}
}
