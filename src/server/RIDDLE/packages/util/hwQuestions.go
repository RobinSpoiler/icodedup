package util

/*
import (
	"database/sql"
	"elPadrino/RIDDLE/packages/structs"
	"net/http"
)

// 1. Check last question attempt
// 2. If it was successful
//     1. Get all questions englobed by the homework
//     2. Return a random one
// 3. If it was not
//     1. Check how many continuos attempts where made for that question
//         1. 3
//             1. Get new question
//         2. < 3
//             1. Return same question

// Function to obtain Questions from Homeworks
func HwQuestions(w http.ResponseWriter, req structs.SelectQuestion, mysqlDB *sql.DB) (structs.ResultQuestion, error) {

	//Permitir que cualquier origen ingrese a este recurso
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Checar ultima pregunta
	queryBase := `SELECT id_question`

	var selectors []string
	var values []interface{}

	values = append(values, req.Student)
	values = append(values, req.Assigment)


}

/*
Quiero seleccionar la informacion de cada pregunta,

ya cuento con una funcion que checa el status de cada pregunta en base
a los intentos de cada tarea, es decir, toma todos los intentos de esa pregunta
y posteriormente me regresa el status del ultimo intento de cada pregunta


(Puedo para lo de abajo mejor, hacer: generar una query secundaria que me de la cantidad de intentos con FAI
por cada pregunta, y genero desde go un tope ante esta condicion, para que si la pregunta recibida cuenta
con ya 3 intentos en FAI, solo ejecute una nueva peticion y me de otra pregunta.)

Seria viable crear un contador en la misma funcion de status para determinar la cantidad de
intentos fallidos por cada tarea, de este modo se podria crear una funcion o condicion que solo regrese
una pregunta cuando esta tenga un status de FAI, pero solo mientras no se alcancen 3 intentos con FAI,
si ya tine 3 intents con FAI en hw_questionAttempts, ya no la regresa a pesar de que su ultimo status sea
FAI

ahora necesito que solo me de tantas preguntas como existan en el modulo para cada
tarea, para esto debo utilizar la informacion en homeworkConfigs y checar todos los regitros que coincidan
con el id de la tarea, revisar de que modulo se trata con su id y finalmente la cantidad de preguntas para ese
modulo dentro de la tarea.
Para lo anterior una forma de lograrlo seria con un contador por cada modulo identificado dentro de la tarea,
y por cada pregunta dada al usuario, este contador se compare en base a la cantidad de preguntas por modulo
de la tabla homeworkConfigs, de este modo se limitaran las preguntas a la cantidad admitida por modulo.


mi primer aproximacion es desde el where, generar una funcion que sea capaz de crear un cntador que
contabilice

puedo crear otra query para recibir la cantidad de preguntas por modulo:

Puedo primero usar un cur para tomar todos los registros de una tarea especifica de homeworkConfigs, despues
le puedo decir que por cada registro lea el numero de preguntas, de una por una, entonces al pedir una pregunta con
la query principal, le digo que con un count cuente la cantidad de preguntas que coincidan con un modulo

Iluminacion aparente

Ya esta la funcion para revisar el ultimo status de una pregunta que se llama desde el SELECT

Ya esta la funcion para contar los intentos con FAI status para cada pregunta, la debo llamar tambien en el select

Debo desarrollar la funcion para contar las preguntas para los modulos, la cual tambien se agregara desde select

Estas 3 funciones seran llamadas de nueva cuenta en el WHERE bajo condiciones


Para completar la ultima query, puedo recibir el id de la tarea y el estudiante, tambien podria recibir el id de la
pregunta, como en la funcion del ultimo estatus, con estos 3 parametros puedo seleccionar dentro de la funcion esta pregunta
desde questions, despues debo revisar en la tabla de homeworkConfigs cual es la cantidad de preguntas admitidas segun el modulo
de la pregunta seleccionada, una vez que ya sepa cuantas preguntas estan admitidas en ese modulo en particular, debo
revisar en hw_questionAttempts la cantidad de intentos para preguntas de ese modulo, como en esa tabla no esta el modulo
debo usar el id para revisar el modulo desde questions, la funcion me regresara un entero que representa la cantidad de preguntas
ya realizadas de ese modulo, entonces en el where podria

generar la relacion
desde questions hago un tipo de join a hw_questionAttempts a traves del id_question donde ya me sirven los id de
tarea y estudiante, despues desde questions tambien hago un join con homeworkConfigs a traves del id del modulo.

entonces ya puedo acceder al numero de preguntas segun el modulo y la tarea, en este punto puedo tomar ese dato y
reservarlo en una variable de tipo INT, despues hago un conteo de intentos en hw_questionAttempts con el id de la pregunta,
tarea y estudiante donde el status sea de FAI o PEN (aqui probablemente deba pasar la funcion de numero de intentos
fallidos, para que si hay un registro o dos con FAI de una pregunta, no lo tome como dos preguntas diferentes, si no como
una sola pregunta con diferentes intentos), y mientras la cantidad de intentos registrados en la tabla no supere la
cantidad de preguntas por modulo dada la tarea y el id de la pregunta, admitire mas preguntas de ese modulo, pero si ya es igual
al numero permitido, no se admitira esa pregunta como un resultado valido.
*/
