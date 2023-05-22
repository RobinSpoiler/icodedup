package util

import (
	"database/sql"
	"elPadrino/RIDDLE/packages/structs"

	"fmt"
	"net/http"
	"strings"
)

func MoQuestions(w http.ResponseWriter, req structs.SelectQuestion, mysqlDB *sql.DB) ([]structs.ResultQuestion, error) {
	//Permitir que cualquier origen ingrese a este recurso
	w.Header().Set("Access-Control-Allow-Origin", "*")

	/* 	selec := fmt.Sprintf("SELECT id_question, q_type, info, mod_question_status(%s, id_question, %s)", req.Group, req.Student)
	 */ //Query de base para preguntas de
	baseQuery := `SELECT q.id_question, q.q_type, q.info, mod_question_status(?, q.id_question, ?) AS status
	FROM questions q`

	var selectors []string
	var values []interface{}

	values = append(values, req.Group)
	values = append(values, req.Student)

	selectors = append(selectors, "current_status = ?")
	values = append(values, "APP")

	selectors = append(selectors, "module = ?")
	values = append(values, req.Assigment)

	selectors = append(selectors, "mod_question_status(?, id_question, ?) = ? OR mod_question_status23(?, id_question, ?) = ?")
	//Primer chequeo con PEN
	values = append(values, req.Group)
	values = append(values, req.Student)
	values = append(values, "PEN")
	//Segunda revision con "FAI"
	values = append(values, req.Group)
	values = append(values, req.Student)
	values = append(values, "FAI")

	/* 	selectors = append(selectors, "attempt_status = ?")
	   	values = append(values, "PEN") */

	//Complete the Query
	var query string
	if len(selectors) > 0 {
		query = fmt.Sprintf("%s WHERE %s LIMIT 1", baseQuery, strings.Join(selectors, " AND "))
	} else {
		query = baseQuery
	}

	//Launch the query to the DB
	rows, err := mysqlDB.Query(query, values...)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return []structs.ResultQuestion{}, err
	}
	defer rows.Close() //Close the conection

	var results []structs.ResultQuestion
	for rows.Next() {
		var result structs.ResultQuestion
		if err = rows.Scan(&result.IdPregunta, &result.Type, &result.Info, &result.Status); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return []structs.ResultQuestion{}, err
		}
		results = append(results, result)
	}

	return results, nil
}
