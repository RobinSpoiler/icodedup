package util

import (
	"database/sql"
	"elPadrino/RIDDLE/packages/structs"
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"
	"strings"
	"time"
)

// Retornar un error y un statusOK para mostrar resultados
func PostFileJson(w http.ResponseWriter, r *http.Request, mysqlDB *sql.DB) {
	// Parseamos el multipart form
	err := r.ParseMultipartForm(32 << 20) // limitamos el tamaño del archivo a 32MB
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Obtenemos el archivo
	file, handler, err := r.FormFile("file")
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Verificamos que sea un archivo JSON
	if filepath.Ext(handler.Filename) != ".json" {
		http.Error(w, "El archivo debe ser de tipo JSON", http.StatusBadRequest)
		return
	}

	// Leemos el contenido del archivo JSON
	var data []structs.RequestQuestion
	err = json.NewDecoder(file).Decode(&data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	for _, req := range data {
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
		}
	}

	// Retornamos una respuesta
	w.WriteHeader(http.StatusOK)
	fmt.Fprintln(w, "Archivo procesado correctamente")
}
