package util

import (
	"database/sql"
	"elPadrino/RIDDLE/packages/structs"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

// Retornar un error y un statusOK para mostrar resultados
func PostJson(w http.ResponseWriter, r *http.Request, mysqlDB *sql.DB) {

	//Leer el body de la conexion
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "chispas", http.StatusBadRequest)
		return
	}

	//Tomar del JSON la informacion
	var req structs.RequestQuestion
	if err := json.Unmarshal(body, &req); err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return
	}

	//Query de inserciona la base de datos
	baseQuery := "INSERT INTO questions(id_question,module, q_type, info, created_by, submittedOn, current_status) VALUES (?, ?, ?, ?, ?, ?, ?)"

	//Prepara genera un puntero
	stmt, err := mysqlDB.Prepare(baseQuery)
	if err != nil {
		http.Error(w, "Error preparing query", http.StatusInternalServerError)
		return
	}
	defer stmt.Close()

	//Generate Id_Question
	idQuestion, _ := GenerateID("CQ", 18)
	//Generate the time of submittion
	now := time.Now()

	//if the q_type isnt a correct value
	if req.QType != `codep` && req.QType != `multi` {
		http.Error(w, fmt.Sprintf("The Type Question '%s' does not exist", req.QType), http.StatusBadRequest)
		return
	}

	_, err = stmt.Exec(idQuestion, req.Module, req.QType, req.Info, req.CreatedBy, now, "PEN")
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		if strings.HasPrefix(err.Error(), "Error 1062 (23000): Duplicate entry") {
			http.Error(w, fmt.Sprintf("'%s' already existe in the questions", idQuestion), http.StatusConflict)
			return
		} else if err.Error() == "Error 1452 (23000): Cannot add or update a child row: a foreign key constraint fails (`icode`.`questions`, CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `professors` (`nomina`) ON DELETE CASCADE)" {
			http.Error(w, fmt.Sprintf("The professor'%s' does not exist", req.CreatedBy), http.StatusBadRequest)
			return
		} else if err.Error() == "Error 1452 (23000): Cannot add or update a child row: a foreign key constraint fails (`icode`.`questions`, CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`module`) REFERENCES `modules` (`id_module`) ON DELETE CASCADE)" {
			http.Error(w, fmt.Sprintf("Student '%s' does not exist", req.Module), http.StatusBadRequest)
			return
		}
		//Falta revisar que la estructura del Info este completa en cada uno de sus elementos
	}

	// Enviar respuesta
	w.WriteHeader(http.StatusOK)
}
