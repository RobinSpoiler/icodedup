package read

import (
	"database/sql"
	"elPadrino/RIDDLE/packages/structs"
	"elPadrino/RIDDLE/packages/util"
	"encoding/json"
	"log"
	"net/http"
)

func Questions(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		//Permitir que cualquier origen ingrese a este recurso
		w.Header().Set("Access-Control-Allow-Origin", "*")

		//Leer el contenido del body de la peticion, si hay error lo guarda en unavariable
		var req structs.SelectQuestion
		req.Student = r.URL.Query().Get("id_student")     //Matricula
		req.Assigment = r.URL.Query().Get("id_assigment") //Modulo o Tarea
		req.Group = r.URL.Query().Get("id_group")         //Grupo
		req.Module = r.URL.Query().Get("id_module")       //Modulo

		// parametro de grupo

		//Verificar que los params sean cumplidos
		if req.Student == "" || req.Assigment == "" {
			http.Error(w, "Error reading parameters from url", http.StatusBadRequest)
			return
		}

		/* 		var res structs.ResultQuestion
		 */
		//Tomar primer caracter de un string
		if req.Assigment[0] == 'M' {

			if req.Group == "" {
				http.Error(w, "Error reading Group", http.StatusBadRequest)
				return
			}

			//Llamar funcion para preguntas de modulos
			res, err := util.MoQuestions(w, req, mysqlDB)
			if err != nil {
				log.Println(err.Error())
				return
			}

			//convertir las estructuras
			hwreqsJSON, err := json.Marshal(res)
			if err != nil {
				http.Error(w, "Error parsing response", http.StatusInternalServerError)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			w.Write(hwreqsJSON)
			w.(http.Flusher).Flush()
			w.(http.CloseNotifier).CloseNotify()

		} else if req.Assigment[0] == 'H' {

			if req.Module == "" {
				http.Error(w, "Error reading Group", http.StatusBadRequest)
				return
			}

			log.Println("SIuiuiu")
			//Llamar funcion para preguntas de grupos
			res, _ := util.HwQuestions(w, req, mysqlDB)

			//convertir las estructuras
			hwreqsJSON, err := json.Marshal(res)
			if err != nil {
				http.Error(w, "Error parsing response", http.StatusInternalServerError)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			w.Write(hwreqsJSON)
			w.(http.Flusher).Flush()
			w.(http.CloseNotifier).CloseNotify()

		}

	}
}
