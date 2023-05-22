package write

import (
	"database/sql"
	"elPadrino/RIDDLE/packages/util"
	"net/http"
	"strings"
)

/* Function to post questions */
func RequestQuestion(mysqlDB *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")

		//Revisar el metodo
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		contentType := r.Header.Get("Content-Type")
		if strings.HasPrefix(contentType, "application/json") {
			// La solicitud contiene un JSON en el cuerpo
			util.PostJson(w, r, mysqlDB)
			//Llamar a jsonReqQuestion

		} else {
			// Se supone que se ha enviado un archivo JSON
			// Llamar a funcion de lectura de archivos
			util.PostFileJson(w, r, mysqlDB)
			// Hacer algo con el archivo JSON
		}

		w.(http.Flusher).Flush()
		w.(http.CloseNotifier).CloseNotify()

	}
}
