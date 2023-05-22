<h1 style="color:#93e5ab; font-size: 40px">RIDDLE API</h1>

RIDDLE (Question Resource Interface for Developing, Deploying, and Logging Exams) es una API con el
propósito de mostrar preguntas cuando el estudiante las solicite, siguiendo el siguiente orden:
1. Primero le dará las preguntas que no se hayan completado como correctas.
2. Después le dará las preguntas que haya contestado de manera incorrecta para que intente resolverlas nuevamente.

Nunca se le darán preguntas repetidas, en caso de no existir más preguntas se le notificará al usuario.
Funcionando como un conector entre las BBDDs (MongoDB y MySQL) y el cliente.

<h2 style="color:#65b891;">URL BASE</h2>
34.16.137.250:8003

<h2 style="color:#65b891;">ENDPOINT de solicitud de preguntas de modulo</h2>

<h3 style="color:#0000FF;">/questions</h3>

<h3 style="color:#b5ffe1;">Descripción</h3>
Solicitar el tipo de pregunta e informacion JSON de cada pregunta de un modulo

<h3 style="color:#b5ffe1;">Metodo de HTTP</h3>
GET

<h3 style="color:#b5ffe1;">Parámetros</h3>
(Mediante el URL)

| Parametro    | Tipo      | Obligatorio                                  | Decripcion                                             |
| :---------:  | :-------: | :------------------------------------------: | :----------------------------------------------------: |
| id_student   | string    | si                                           | ID del estudiante que pide preguntas                   |
| id_assigment | string    | si                                           | ID del modulo desde la que se hace la peticion         | 
| id_group     | string    | si                                           | ID del grupo al que pertene el estudiante              |

<h3 style="color:#b5ffe1;">Respuesta</h3>
En caso de realizar una busqueda exitosa, se desplegara el tipo de pregunta, seguido del JSON que contiene
la informacion de la pregunta a resolver.

<h3 style="color:#b5ffe1;">Ejemplo</h3>
<p style= "font-weight: bold;">Peticion</p>


GET 
34.16.137.250:8003/questions?id_student=A01551955&id_assigment=M0000000000000000001&id_group=G000000001

<h3 style="color:#b5ffe1;">Respuesta</h3>
<p style= "font-weight: bold;">Respuesta</p>

HTTP/1.1 200 OK Content-Type: application/json
``` json
[
    {
        "IdPregunta": "CQ000000000000000001",
        "Type": "codep",
        "Info": "{\"hinputs\": [[\"2\"], [\"4\"]], \"sinputs\": [[\"3\"], [\"6\"]], \"houtputs\": [\"4\", \"16\"], \"language\": \"python\", \"soutputs\": [\"9\", \"36\"], \"timeoutSec\": 10, \"description\": \"Double a number\", \"initialCode\": \"\", \"forbiddenFunctions\": []}",
        "Status": "FAI"
    }
]
```

_____________________________________________________
<h2 style="color:#65b891;">ENDPOINT de solicitud de preguntas de tareas</h2>

<h3 style="color:#0000FF;">/questions</h3>

<h3 style="color:#b5ffe1;">Descripción</h3>
Solicitar el tipo de pregunta e informacion JSON de cada pregunta de un modulo

<h3 style="color:#b5ffe1;">Metodo de HTTP</h3>
GET

<h3 style="color:#b5ffe1;">Parámetros</h3>
(Mediante el URL)

| Parametro    | Tipo      | Obligatorio                                  | Decripcion                                              |
| :---------:  | :-------: | :------------------------------------------: | :-----------------------------------------------------: |
| id_student   | string    | si                                           | ID del estudiante que pide preguntas                    |
| id_assigment | string    | si                                           | ID de la tarea desde la que se hace la peticion         | 
| id_module    | string    | si                                           | ID del grupo al que pertene el estudiante               |

<h3 style="color:#b5ffe1;">Respuesta</h3>
En caso de realizar una busqueda exitosa, se desplegara el tipo de pregunta, seguido del JSON que contiene
la informacion de la pregunta a resolver y su status.

<h3 style="color:#b5ffe1;">Ejemplo</h3>
<p style= "font-weight: bold;">Peticion</p>


GET 
34.16.137.250:8003/questions?id_student=A01551955&id_assigment=H0000000000000000001&id_module=M0000000000000000001

<h3 style="color:#b5ffe1;">Respuesta</h3>
<p style= "font-weight: bold;">Respuesta</p>

HTTP/1.1 200 OK Content-Type: application/json
``` json

[
    {
        "IdPregunta": "CQ000000000000000003",
        "Type": "codep",
        "Info": "{\"hinputs\": [[\"4\", \"3\", \"1\", \"9\", \"2\"], [\"2\", \"0\", \"7\"]], \"sinputs\": [[\"4\", \"3\", \"1\", \"9\", \"2\"], [\"2\", \"0\", \"7\"]], \"houtputs\": [\"9\", \"7\"], \"language\": \"python\", \"soutputs\": [\"9\", \"7\"], \"timeoutSec\": 10, \"description\": \"create a function that returns the biggest number\", \"initialCode\": \"\", \"forbiddenFunctions\": [\"sum\"]}",
        "Status": "PEN"
    }
]

```



_____________________________________________________
<h2 style="color:#65b891;">ENDPOINT de solicitud de carga de Preguntas a Administrador desde interfaz</h2>

<h3 style="color:#0000FF;">/requestQuestion</h3>

<h3 style="color:#b5ffe1;">Descripción</h3>
SOlicitud para agregar una pregunta a la base de datos

<h3 style="color:#b5ffe1;">Metodo de HTTP</h3>
POST

<h3 style="color:#b5ffe1;">Parámetros</h3>
(Mediante el Body)

| Parametro    | Tipo      | Obligatorio                                  | Decripcion                                              |
| :---------:  | :-------: | :------------------------------------------: | :-----------------------------------------------------: |
| module       | string    | si                                           | ID del modulo al que pertenece la pregunta              |
| q_type       | string    | si                                           | Tipo de pregunta a cargar                               | 
| info         | string    | si                                           | String con info de toda la pregunta                     |
| created_by   | string    | si                                           | ID del profesor que realiza la peticion                 |

<h3 style="color:#b5ffe1;">Respuesta</h3>
En caso de que se haya creado la tarea de forma exitosa, se regresa unicamente un codigo HTTP 201 (Created) Nota: Se agrega la pregunta a la tabla de questions, con un current_status de "PEN" para que el administrador pueda aceptar o rechazarla

<h3 style="color:#b5ffe1;">Ejemplo</h3>
<p style= "font-weight: bold;">Peticion</p>


POST
Peticion POST 34.16.137.250:8003/requestQuestion Content-Type: application/json 

```json
{
    "module": "M0000000000000000001",
    "q_type": "codep",
    "info": "{\"hinputs\": [[\"4\", \"3\", \"1\", \"9\", \"2\"], [\"2\", \"0\", \"7\"]], \"sinputs\": [[\"4\", \"3\", \"1\", \"9\", \"2\"], [\"2\", \"0\", \"7\"]], \"houtputs\": [\"9\", \"7\"], \"language\": \"python\", \"soutputs\": [\"9\", \"7\"], \"timeoutSec\": 10, \"description\": \"create a sefunction that returns the biggest number\", \"initialCode\": \"\", \"forbiddenFunctions\": [\"sum\"]}",
    "created_by": "L00000003"
}
```

<h3 style="color:#b5ffe1;">Respuesta</h3>
<p style= "font-weight: bold;">Respuesta</p>

HTTP/1.1 201 Created

_____________________________________________________
<h2 style="color:#65b891;">ENDPOINT de solicitud de carga de Preguntas a Administrador desde file.json</h2>

<h3 style="color:#0000FF;">/requestQuestion</h3>

<h3 style="color:#b5ffe1;">Descripción</h3>
Solicitud para agregar una pregunta o preguntas a la base de datos a traves de un file.json

<h3 style="color:#b5ffe1;">Metodo de HTTP</h3>
POST

<h3 style="color:#b5ffe1;">Parámetros</h3>
(Mediante el Body)

Se recibe un archivo llamado "file.json" el cual puede contener 1 o mas objetos de tipo json, donde cada uno de estos representa
una pregunta en especifico.

El contenido del archivo file.json debe contener una estructura de arreglos como el siguiente:

```json
[
    {
        "module": "M0000000000000000001",
        "q_type": "codep",
        "info": "{\"hinputs\": [[\"4\", \"3\", \"1\", \"9\", \"2\"], [\"2\", \"0\", \"7\"]], \"sinputs\": [[\"4\", \"3\", \"1\", \"9\", \"2\"], [\"2\", \"0\", \"7\"]], \"houtputs\": [\"9\", \"7\"], \"language\": \"python\", \"soutputs\": [\"9\", \"7\"], \"timeoutSec\": 10, \"description\": \"create a sefunction that returns the biggest number\", \"initialCode\": \"\", \"forbiddenFunctions\": [\"sum\"]}",
        "created_by": "L00000003"
    },
    {
        "module": "M0000000000000000002",
        "q_type": "multi",
        "info": "{\"hinputs\": [[\"4\", \"3\", \"1\", \"9\", \"2\"], [\"2\", \"0\", \"7\"]], \"sinputs\": [[\"4\", \"3\", \"1\", \"9\", \"2\"], [\"2\", \"0\", \"7\"]], \"houtputs\": [\"9\", \"7\"], \"language\": \"python\", \"soutputs\": [\"9\", \"7\"], \"timeoutSec\": 10, \"description\": \"create a sefunction that returns the biggest number\", \"initialCode\": \"\", \"forbiddenFunctions\": [\"sum\"]}",
        "created_by": "L00000003"
    }
]
```

Donde cada arreglo representa una pregunta, y cada arrgelo contiene la siguiente informacion:

| Parametro    | Tipo      | Obligatorio                                  | Decripcion                                              |
| :---------:  | :-------: | :------------------------------------------: | :-----------------------------------------------------: |
| module       | string    | si                                           | ID del modulo al que pertenece la pregunta              |
| q_type       | string    | si                                           | Tipo de pregunta a cargar                               | 
| info         | string    | si                                           | String con info de toda la pregunta                     |
| created_by   | string    | si                                           | ID del profesor que realiza la peticion                 |

<h3 style="color:#b5ffe1;">Respuesta</h3>
En caso de que se haya creado la tarea de forma exitosa, se regresa unicamente un codigo HTTP 201 (Created) Nota: Se agrega la pregunta o preguntas a la tabla de questions, con un current_status de "PEN" para que el administrador pueda aceptar o rechazarla

<h3 style="color:#b5ffe1;">Ejemplo</h3>
<p style= "font-weight: bold;">Peticion</p>


POST
Peticion POST 34.125.0.99:8003/requestQuestion Content-Type: application/json 

<h3>file.json</h3>


<h3 style="color:#b5ffe1;">Respuesta</h3>
<p style= "font-weight: bold;">Respuesta</p>

HTTP/1.1 201 Created

_____________________________________________________
<h2 style="color:#65b891;">ENDPOINT carga de intento de pregunta de Tarea</h2>

<h3 style="color:#0000FF;">/hwQuestionAttempt</h3>

<h3 style="color:#b5ffe1;">Descripción</h3>
Carga de intentos de preguntas de tareas

<h3 style="color:#b5ffe1;">Metodo de HTTP</h3>
POST

<h3 style="color:#b5ffe1;">Parámetros</h3>
(Mediante el Body)
student, homework, question, attempt_status

| Parametro        | Tipo      | Obligatorio                                  | Decripcion                                              |
| :-------------:  | :-------: | :------------------------------------------: | :-----------------------------------------------------: |
| student          | string    | si                                           | ID del estudiante que pide preguntas                    |
| homework         | string    | si                                           | ID de la tarea desde la que se hace la peticion         | 
| question         | string    | si                                           | ID de la pregunta que se intenta                        |
| attempt_status   | string    | si                                           | status del intento de la pregunta ("PAS", "FAI")        |


<h3 style="color:#b5ffe1;">Respuesta</h3>
En caso de que el intento de la pregunta de una tarea se registre de manera exitosa, se regresa unicamente un codigo HTTP 201 (Created) Nota: Se agrega el intento de la pregunta a la tabla de hw_questionAtempts.

<h3 style="color:#b5ffe1;">Ejemplo</h3>
<p style= "font-weight: bold;">Peticion</p>


POST
Peticion POST 34.125.0.99:8003/hwQuestionAttempt Content-Type: application/json 

```json
{
    "student": "A01731511",
    "homework": "H0000000000000000002",
    "question": "CQ000000000000000002",
    "attempt_status": "FAI"
}
```

<h3 style="color:#b5ffe1;">Respuesta</h3>
<p style= "font-weight: bold;">Respuesta</p>

HTTP/1.1 201 Created

_____________________________________________________
<h2 style="color:#65b891;">ENDPOINT carga de intento de pregunta de Modulo</h2>

<h3 style="color:#0000FF;">/modQuestionAttempt</h3>

<h3 style="color:#b5ffe1;">Descripción</h3>
Carga de intentos de preguntas de Modulos

<h3 style="color:#b5ffe1;">Metodo de HTTP</h3>
POST

<h3 style="color:#b5ffe1;">Parámetros</h3>
(Mediante el Body)
student, grupo, question, attempt_status

| Parametro        | Tipo      | Obligatorio                                  | Decripcion                                              |
| :-------------:  | :-------: | :------------------------------------------: | :-----------------------------------------------------: |
| student          | string    | si                                           | ID del estudiante que pide preguntas                    |
| grupo            | string    | si                                           | ID del grupo                                            | 
| question         | string    | si                                           | ID de la pregunta que se intenta                        |
| attempt_status   | string    | si                                           | status del intento de la pregunta ("PAS", "FAI")        |


<h3 style="color:#b5ffe1;">Respuesta</h3>
En caso de que el intento de la pregunta de un modulo se registre de manera exitosa, se regresa unicamente un codigo HTTP 201 (Created) Nota: Se agrega el intento de la pregunta a la tabla de questionAtempts.

<h3 style="color:#b5ffe1;">Ejemplo</h3>
<p style= "font-weight: bold;">Peticion</p>


POST
Peticion POST 34.125.0.99:8003/modQuestionAttempt Content-Type: application/json 

```json
{
    "student": "A01731511",
    "grupo": "G000000003",
    "question": "CQ000000000000000002",
    "attempt_status": "FAI"
}
```

<h3 style="color:#b5ffe1;">Respuesta</h3>
<p style= "font-weight: bold;">Respuesta</p>

HTTP/1.1 201 Created