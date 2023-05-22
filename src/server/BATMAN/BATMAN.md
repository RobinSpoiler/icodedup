# BATMAN API
BATMAN (Basic API for Transactional Management And Navigation) es una API cuya principal funcionalidad es la de realizar operaciones CRUD.
Funciona como un conector entre la BBDD en MySQL y el cliente, incorporando la logica necesaria para que el front-end reciba la informacion de la manera mas simple posible.

## URL Base

`34.16.137.250:8002`

## Endpoints de creacion

### `/enrollstudent`
#### Descripcion
Enrolar un estudiante a un grupo

#### Metodo de HTTP
`POST`

#### Parametros
(Mediante el body de la peticion)
| Parametro   | Tipo        | Obligatorio | Descripcion                                   |
|------------ | ----------- | ----------- | --------------------------------------------- |
| student     | string      | si          | ID del estudiante a enrolar                   |
| group       | string      | si          | ID del grupo al que se enrolara al estudiante |

#### Respuesta
En caso de que se haya enrolado al estudiante de forma exitosa, se regresa unicamente un codigo HTTP 201 (Created)

#### Ejemplo
**Peticion**
POST 34.16.137.250:8002/enrollstudent
Content-Type: application/json
``` json
{
    "student": "A01551955",
    "group": "G000000000"
}
```

**Respuesta**
HTTP/1.1 201 Created

---

### `/createhw`
#### Descripcion
Crear una nueva tarea para un grupo

#### Metodo de HTTP
`POST`

#### Parametros
(Mediante el body de la peticion)
| Parametro         | Tipo                  | Obligatorio | Descripcion                                                     |
|------------------ | --------------------- | ----------- | --------------------------------------------------------------- |
| group             | [ string ]            | si          | Arreglo de IDs de los grupos a los que se agregara la tarea     |
| hw_name           | string                | si          | Nombre de la tarea                                              |
| open_date         | string                | si          | Fecha de apertura de la tarea                                   |
| close_date        | string                | si          | Fecha de cierre de la tarea                                     |
| modules_questions | [ modulesQuestions ]  | si          | Arreglo que representa las preguntas de cada modulo en la tarea |

El arreglo `modulesQuestions` debiese de contener unicamente objetos con las siguientes propiedades
| Parametro     | Tipo        | Obligatorio | Descripcion                                                           |
|-------------- | ----------- | ----------- | --------------------------------------------------------------------- |
| module        | string      | si          | Modulo que se quiere agregar a la tarea                               |
| n_questions   | int         | si          | Numero de preguntas requeridas para completar este modulo en la tarea |

#### Respuesta
En caso de que se haya creado la tarea de forma exitosa, se regresa unicamente un codigo HTTP 201 (Created)
Nota: Se genera una tarea (con ID unico) por cada grupo dado, pero todas estas tienen la misma configuracion inicial

#### Ejemplo
**Peticion**
POST 34.16.137.250:8002/createhw
Content-Type: application/json
``` json
{
    "groups": [
        "G000000001",
        "G000000002"
    ],
    "hw_name": "Tarea 3: Mas practicas :)",
    "open_date": "2023-05-11T00:00:00Z",
    "close_date": "2023-05-14T00:00:00Z",
    "modules_questions": [
        {
            "module": "M0000000000000000002",
            "n_questions": 1
        },
        {
            "module": "M0000000000000000003",
            "n_questions": 2
        }
    ]
}
```

**Respuesta**
HTTP/1.1 201 Created

---

### `/registercampus`
#### Descripcion
Registrar un nuevo campus

#### Metodo de HTTP
`POST`

#### Parametros
(Mediante el body de la peticion)
| Parametro   | Tipo        | Obligatorio | Descripcion            |
|------------ | ----------- | ----------- | ---------------------- |
| campus_id   | string      | si          | ID del campus a crear  |
| campus_name | string      | si          | Nombre del campus      |

#### Respuesta
En caso de que se haya enrolado al estudiante de forma exitosa, se regresa unicamente un codigo HTTP 201 (Created)

#### Ejemplo
**Peticion**
POST 34.16.137.250:8002/registercampus
Content-Type: application/json
``` json
{
    "campus_id": "OAX",
    "campus_name": "Oaxaca"
}
```

**Respuesta**
HTTP/1.1 201 Created

---

### `/registerterm`
#### Descripcion
Registrar un nuevo periodo

#### Metodo de HTTP
`POST`

#### Parametros
(Mediante el body de la peticion)
| Parametro     | Tipo        | Obligatorio | Descripcion                |
|-------------- | ----------- | ----------- | -------------------------- |
| id            | string      | si          | ID del periodo a crear     |
| name          | string      | si          | Nombre del periodo         |
| start_date    | string      | si          | Fecha de inicio (ISO 8601) |
| end_date      | string      | si          | Fecha de fin (ISO 8601)    |


#### Respuesta
En caso de que se haya registrado el periodo de forma exitosa, se regresa unicamente un codigo HTTP 201 (Created)

#### Ejemplo
**Peticion**
POST 34.16.137.250:8002/registerterm
Content-Type: application/json
``` json
{
    "id": "IV25",
    "name": "Invierno 2024",
    "start_date": "2023-01-05T13:30:00+03:00",
    "end_date": "2023-02-12T13:30:00+03:00"
}
```

**Respuesta**
HTTP/1.1 201 Created

---

### `/registergroup`
#### Descripcion
Crear un nuevo grupo

#### Metodo de HTTP
`POST`

#### Parametros
(Mediante el body de la peticion)
| Parametro     | Tipo        | Obligatorio | Descripcion                                    |
|-------------- | ----------- | ----------- | ---------------------------------------------- |
| course_id     | string      | si          | ID del curso al que pertenece el grupo a crear |
| term_id       | string      | si          | ID del periodo del grupo                       |
| professor_id  | string      | si          | Nomina del profesor que imparte el grupo       |
| modules_confs | [ configs ] | si          | Configuraciones de los modulos del grupo       |

El arreglo `modules_confs` debiese de contener unicamente objetos con las siguientes propiedades
| Parametro     | Tipo        | Obligatorio | Descripcion                                     |
|-------------- | ----------- | ----------- | ----------------------------------------------- |
| module_id     | string      | si          | ID del modulo a configurar                      |
| n_questions   | int         | si          | Numero de preguntas requeridas para el modulo   |

#### Respuesta
En caso de que se haya creado el grupo de forma exitosa, se regresa unicamente un codigo HTTP 201 (Created)

#### Ejemplo
**Peticion**
POST 34.16.137.250:8002/registergroup
Content-Type: application/json
``` json
{
    "course_id": "TC1028",
    "term_id": "FJ23",
    "professor_id": "L00000001",
    "modules_confs": [
        {
            "module_id": "M0000000000000000001",
            "n_questions": 3
        },
        {
            "module_id": "M0000000000000000002",
            "n_questions": 3
        },
        {
            "module_id": "M0000000000000000003",
            "n_questions": 3
        }
    ]
}
```

**Respuesta**
HTTP/1.1 201 Created

---

### `/registeruser`
#### Descripcion
Registrar a un nuevo usuario

#### Metodo de HTTP
`POST`

#### Parametros
(Mediante el body de la peticion)
| Parametro     | Tipo        | Obligatorio | Descripcion                                    |
|-------------- | ----------- | ----------- | ---------------------------------------------- |
| id            | string      | si          | ID (matricula o nomina) del usuario a crear    |
| campus        | string      | si          | ID del campus al que pertenece                 |
| name          | string      | si          | Nombre del usuario                             |
| flast_name    | string      | si          | Apellido paterno                               |
| slast_name    | string      | si          | Apellido materno                               |

#### Respuesta
En caso de que se haya registrado al usuario de forma exitosa, se regresa unicamente un codigo HTTP 201 (Created)

#### Ejemplo
**Peticion**
POST 34.16.137.250:8002/registeruser
Content-Type: application/json
``` json
{
    "id": "A01551957",
    "campus": "PUE",
    "name": "Jaime",
    "flast_name": "Estrada",
    "slast_name": "Calleros"
}
```

**Respuesta**
HTTP/1.1 201 Created

---

### `/course`
#### Descripcion
Registrar un nuevo curso

#### Metodo de HTTP
`POST`

#### Parametros
(Mediante el body de la peticion)
| Parametro     | Tipo        | Obligatorio | Descripcion                     |
|-------------- | ----------- | ----------- | ------------------------------- |
| id            | string      | si          | ID del curso a crear            |
| name          | string      | si          | Nombre del curso                |
| modules       | [ string ]  | si          | Nombre de los modulos del curso |

#### Respuesta
En caso de que se haya registrado al curso de forma exitosa, se regresa unicamente un codigo HTTP 201 (Created)

#### Ejemplo
**Peticion**
POST 34.125.0.99:8002/course
Content-Type: application/json
``` json
{
    "id": "TC1021",
    "name": "Sepultura de batos",
    "modules": [
        "Intro a leetcode",
        "Leetcode 2"
    ]
}
```

**Respuesta**
HTTP/1.1 201 Created



## Endpoints de lectura

### `/courses`
#### Descripcion
Todos los cursos que se tienen registrados

#### Metodo de HTTP
`GET`

#### Parametros
No se necesitan parametros

#### Respuesta
(En formato JSON) Arreglo de objetos que representan los cursos. Cada curso cuenta con los siguientes campos
| Campo          | Tipo                  | Descripcion                               |
| -------------- | --------------------- | ----------------------------------------- |
| id             | string                | Identificador del curso                   |
| name           | string                | Nombre completo del curso                 |
| n_modules      | int                   | Numero de modulos pertenecientes al curso |

#### Ejemplo
**Peticion**
GET 34.16.137.250:8002/courses

**Respuesta**
HTTP/1.1 200 OK
Content-Type: application/json
``` json
[
    {
        "id": "TC1028",
        "name": "Pensamiento computacional",
        "n_modules": 3
    },
    {
        "id": "TC1030",
        "name": "Programacion orientada a objetos",
        "n_modules": 3
    },
    {
        "id": "TC1031",
        "name": "Estructuras de datos y algoritmos",
        "n_modules": 3
    }
]
```

---

### `/enrolledstudents/{groupID}`
#### Descripcion
Estudiantes inscritos en un grupo

#### Metodo de HTTP
`GET`

#### Parametros
* `groudID` (obligatorio): ID del grupo del cual se desea la lista de estudiantes

#### Respuesta
(En formato JSON) Arreglo de objetos que representan a los estudiantes. Cada estudiante cuenta con los siguientes campos
| Campo          | Tipo                  | Descripcion            |
| -------------- | --------------------- | ---------------------- |
| id             | string                | Matricula del alumno   |
| name           | string                | Nombre del alumno      |

#### Ejemplo
**Peticion**
GET 34.16.137.250:8002/enrolledstudents/G000000001

**Respuesta**
HTTP/1.1 200 OK
Content-Type: application/json
``` json
[
    {
        "id": "A00157831",
        "name": "Jose Cardoza Mendez"
    },
    {
        "id": "A01551955",
        "name": "Jorge Delgado Morales"
    },
    {
        "id": "A01712734",
        "name": "Adriana Fernandez Rojas"
    },
    {
        "id": "A01731511",
        "name": "Karla Sanchez Olivares"
    }
]
```

---

### `/groups`
#### Descripcion
Grupos que impate e/o impatio un profesor. O en los que esta/estaba inscrito un estudiante

#### Metodo de HTTP
`GET`

#### Parametros
(Mediante parametros de url)
* `id` (obligatorio): ID del estudiante/profesor del cual se desean consultar sus grupos
* `term` (obligatorio): Periodo del que se desean los grupos. Se puede mandar el ID del periodo (4 caracteres. Ej: IV23), 'all' para todos los periodos y 'current' para el periodo actual

#### Respuesta
(En formato JSON) Arreglo de objetos que representan a los grupos. Cada grupo cuenta con los siguientes campos
| Campo          | Tipo                  | Descripcion                                  |
| -------------- | --------------------- | ----------------------                       |
| id_group       | string                | ID del grupo                                 |
| id_course      | string                | ID del curso                                 |
| course_name    | string                | Nombre del curso                             |
| start_date     | string                | Fecha de inicio del grupo (formato ISO 8601) |
| end_date       | string                | Fecha de fin del grupo (formato ISO 8601)    |
| first_name     | string                | Nombre del profesor que impate el grupo      |
| flast_name     | string                | Apellido paterno del profesor                |
| slast_name     | string                | Apellido materno del profesor                |


#### Ejemplo
**Peticion**
GET 34.16.137.250:8002/groups?id=A01551955&term=current

**Respuesta**
HTTP/1.1 200 OK
Content-Type: application/json
``` json
[
    {
        "id_group": "G000000001",
        "id_course": "TC1028",
        "course_name": "Pensamiento computacional",
        "start_date": "2023-02-15T00:00:00Z",
        "end_date": "2023-06-26T23:59:59Z",
        "first_name": "Daniel",
        "flast_name": "Perez",
        "slast_name": "Rojas"
    },
    {
        "id_group": "G000000005",
        "id_course": "TC1030",
        "course_name": "Programacion orientada a objetos",
        "start_date": "2023-02-15T00:00:00Z",
        "end_date": "2023-06-26T23:59:59Z",
        "first_name": "Claudia",
        "flast_name": "Perez",
        "slast_name": "Lezama"
    }
]
```

---

### `/homework`
#### Descripcion
Tareas que un estudiante tiene asignadas. O tareas que un profesor ha asignado a sus grupos

#### Metodo de HTTP
`GET`

#### Parametros
(Mediante parametros de url)
* `id` (obligatorio): ID del estudiante/profesor del cual se desean consultar sus tareas
* `time` (obligatorio): Intervalo de tiempo del cual se desean las tareas. 'week' para las tareas que se cierran de la fecha de solicitud a una semana en adelante, 'future' para todas las tareas que aun no se han cerrado.
* `group` (obligatorio): ID del grupo del que se desean las tareas. En caso de que se deseen las tareas de todos los grupos usar 'all'
* `group_by` (obligatorio): Formato en el que se agruparan las tareas. 'group' para regresar un mapa donde la llave es el ID del grupo y el contenido un arreglo de tareas, 'week' regresa un arreglo de tareas, el indice 0 representa las tareas del mismo dia de la solicitud, indice 1 el del dia despues y asi consecutivamente hasta el indice 6

#### Respuestas
(En formato JSON) Independientemente de la forma en la que se agrupan las tareas, cada una tiene los siguientes campos
| Campo          | Tipo                  | Descripcion                                  |
| -------------- | --------------------- | ----------------------                       |
| hw_id          | string                | ID de la tarea                               |
| hw_name        | string                | Nombre de la tarea                           |
| course_id      | string                | ID del curso                                 |
| course_name    | string                | Nombre del curso                             |
| group_id       | string                | ID del grupo                                 |
| opening        | string                | Fecha de apertuda de la tarea                |
| closing        | string                | Fecha de cierre de la tarea                  |
| needed         | int                   | Numero de preguntas necesitadas para terminar|
| done           | int                   | Numero de preguntas hechas por el alumno     |

#### Ejemplo (group_by=group)
**Peticion**
GET 34.16.137.250:8002/homework?id=A01551955&time=week&group=all&group_by=group

**Respuesta**
HTTP/1.1 200 OK
Content-Type: application/json
``` json
{
    "G000000001": [
        {
            "hw_id": "H0000000000000000001",
            "hw_name": "Tarea 1: Condicionales",
            "course_id": "TC1028",
            "course_name": "Pensamiento computacional",
            "group_id": "G000000001",
            "opening": "2023-04-20T00:00:00Z",
            "closing": "2023-04-28T23:59:59Z",
            "needed": 2,
            "done": 1
        }
    ]
}
```

#### Ejemplo (group_by=week)
**Peticion**
GET 34.16.137.250:8002/homework?id=A01551955&time=week&group=all&group_by=week

**Respuesta**
HTTP/1.1 200 OK
Content-Type: application/json
``` json
{
    [
        {
            "hw_id": "H0000000000000000001",
            "hw_name": "Tarea 1: Condicionales",
            "course_id": "TC1028",
            "course_name": "Pensamiento computacional",
            "group_id": "G000000001",
            "opening": "2023-04-20T00:00:00Z",
            "closing": "2023-04-28T23:59:59Z",
            "needed": 2,
            "done": 1
        }
    ]
}
```

---

### `/questionrequests`
#### Descripcion
Listado de preguntas que han sido solicitadas para ser agregadas al banco de preguntas

#### Metodo de HTTP
`GET`

#### Parametros
(Mediante parametros de url)
* `question_type` (obligatorio): Tipo de pregunta de las solicitudes. 'all' para todos los tipos, 'multi' para preguntas de opcion multiple y 'codep' para preguntas de codigo
* `requested_by` (obligatorio): ID del profesor que solicito agregar dicha pregunta. 'all' para todos los profesores
* `course` (obligatorio): ID del curso del que se desean las peticiones. 'all' para todos los cursos
* `status` (obligatorio): Estatus en el que se encuentran las preguntas. 'all' para todas, 'passed' para las aprovadas, 'rejected' para las rechazadas y 'pending' para las que aun no han sido evaluadas

#### Respuestas
(En formato JSON) Independientemente de la forma en la que se agrupan las tareas, cada una tiene los siguientes campos
| Campo            | Tipo                  | Descripcion                                  |
| ---------------- | --------------------- | ----------------------                       |
| id               | string                | ID de la pregunta en la BBDD                 |
| type             | string                | Tipo de la pregunta                          |
| info             | string                | JSON que contiene informacion de la pregunta |
| requesters_id    | string                | Nomina del profesor que hizo la peticion     |
| requesters_name  | string                | Nombre completo del profesor                 |
| course           | string                | ID del curso al que se quiere agregar la pregunta |
| course_name      | string                | Nombre del curso                             |
| module           | string                | Modulo al que se quiere agregar la pregunta  |
| status           | string                | Estatus en el que se encuentra la solicitud  |
| submitted_on     | string                | Fecha en la que se hizo la solicitud         |


#### Ejemplo
**Peticion**
GET 34.16.137.250:8002/questionrequests?question_type=all&requested_by=all&course=all&status=all

**Respuesta**
HTTP/1.1 200 OK
Content-Type: application/json
``` json
[
    {
        "id": "CQ000000000000000009",
        "type": "codep",
        "info": "{\"hinputs\": [[\"4\", \"3\", \"1\", \"9\", \"2\"], [\"2\", \"0\", \"7\"]], \"sinputs\": [[\"4\", \"3\", \"1\", \"9\", \"2\"], [\"2\", \"0\", \"7\"]], \"houtputs\": [\"9\", \"7\"], \"language\": \"python\", \"soutputs\": [\"9\", \"7\"], \"timeoutSec\": 10, \"description\": \"create a function that returns the biggest number\", \"initialCode\": \"\", \"forbiddenFunctions\": [\"sum\"]}",
        "requesters_id": "L00000001",
        "requesters_name": "Daniel Perez Rojas",
        "course": "TC1028",
        "course_name": "Pensamiento computacional",
        "module": "For loops",
        "status": "APP",
        "submitted_on": "2023-04-15T00:00:00Z"
    },
    {
        "id": "CQ000000000000000008",
        "type": "codep",
        "info": "{\"hinputs\": [[\"4\", \"3\", \"1\", \"9\", \"2\"], [\"2\", \"0\", \"7\"]], \"sinputs\": [[\"4\", \"3\", \"1\", \"9\", \"2\"], [\"2\", \"0\", \"7\"]], \"houtputs\": [\"9\", \"7\"], \"language\": \"python\", \"soutputs\": [\"9\", \"7\"], \"timeoutSec\": 10, \"description\": \"create a function that returns the biggest number\", \"initialCode\": \"\", \"forbiddenFunctions\": [\"sum\"]}",
        "requesters_id": "L00000001",
        "requesters_name": "Daniel Perez Rojas",
        "course": "TC1028",
        "course_name": "Pensamiento computacional",
        "module": "For loops",
        "status": "APP",
        "submitted_on": "2023-04-15T00:00:00Z"
    },
    {
        "id": "CQ000000000000000007",
        "type": "codep",
        "info": "{\"hinputs\": [[\"4\", \"3\", \"1\", \"9\", \"2\"], [\"2\", \"0\", \"7\"]], \"sinputs\": [[\"4\", \"3\", \"1\", \"9\", \"2\"], [\"2\", \"0\", \"7\"]], \"houtputs\": [\"9\", \"7\"], \"language\": \"python\", \"soutputs\": [\"9\", \"7\"], \"timeoutSec\": 10, \"description\": \"create a function that returns the biggest number\", \"initialCode\": \"\", \"forbiddenFunctions\": [\"sum\"]}",
        "requesters_id": "L00000001",
        "requesters_name": "Daniel Perez Rojas",
        "course": "TC1028",
        "course_name": "Pensamiento computacional",
        "module": "For loops",
        "status": "APP",
        "submitted_on": "2023-04-15T00:00:00Z"
    }
]
```

---

### `/users`
#### Descripcion
Usarios que estan dados de alta en la plataforma

#### Metodo de HTTP
`GET`

#### Parametros
(Mediante parametros de url)
* `user_type` (obligatorio): Tipo de usuarios a buscar. 'all' para todos, 'student' para alumnos, 'professor' para profesores
* `campus` (obligatorio): Campus de usuarios a buscar. 'all' para todos
* `id` (obligatorio): ID usuario a buscar. 'all' para todos
* `name` (obligatorio): Nombre del usuario a buscar. 'all' para todos

#### Respuestas
(En formato JSON) Se regresa un arreglo de estudiantes. Cada estudiante tiene los siguientes campos
| Campo            | Tipo                  | Descripcion                                  |
| ---------------- | --------------------- | ----------------------                       |
| first_name       | string                | Nombre del usuario                           |
| flast_name       | string                | Apellido paterno                             |
| slast_name       | string                | Apellido materno                             |
| id               | string                | ID del usuario                               |
| campus           | string                | Campus del usuario                           |
| email            | string                | Correo del usuario                           |


#### Ejemplo
**Peticion**
GET 34.16.137.250:8002/users?user_type=student&campus=all&id=all&name=all

**Respuesta**
HTTP/1.1 200 OK
Content-Type: application/json
``` json
[
    {
        "name": "Carlos Villasenor Pacheco",
        "id": "A00102193",
        "campus": "CSF",
        "email": "A00102193@tec.mx"
    },
    {
        "name": "Jose Cardoza Mendez",
        "id": "A00157831",
        "campus": "PUE",
        "email": "A00157831@tec.mx"
    },
    {
        "name": "Sofia Garcia Jimenez",
        "id": "A00871372",
        "campus": "MTY",
        "email": "A00871372@tec.mx"
    },
    {
        "name": "Paulina Rojas Torres",
        "id": "A01112341",
        "campus": "GDL",
        "email": "A01112341@tec.mx"
    }
]
```

---

### `/terms`
#### Descripcion
Periodos academicos registrados

#### Metodo de HTTP
`GET`

#### Parametros
(Mediante parametros de url)
* `has_started` (opcional): 'true' para periodos que ya empezaron. 'false' para periodos que aun no empiezan. No dar este parametro regresa todos los periodos sin importar sus fechas. Los periodos se regresan en orden descendiente de acuerdo a sus fechas.

#### Respuestas
(En formato JSON) Se regresa un arreglo de periodos. Cada periodo tiene los siguientes campos
| Campo            | Tipo                  | Descripcion                |
| ---------------- | --------------------- | -------------------------- |
| id               | string                | ID del periodo             |
| name             | string                | Nombre entero del periodo  |
| start_date       | string                | Campus del usuario         |
| end_date         | string                | Correo del usuario         |


#### Ejemplo
**Peticion**
GET 34.16.137.250:8002/terms?has_started=false

**Respuesta**
HTTP/1.1 200 OK
Content-Type: application/json
``` json
[
    {
        "id": "AD23",
        "name": "Agosto-Diciembre 2023",
        "start_date": "2023-08-28T00:00:00Z",
        "end_date": "2023-12-12T23:59:59Z"
    },
    {
        "id": "VE23",
        "name": "Verano 2023",
        "start_date": "2023-07-05T00:00:00Z",
        "end_date": "2023-08-25T23:59:59Z"
    }
]
```

---

### `/groupmodules/{groupID}`
#### Descripcion
Modulos de un grupo

#### Metodo de HTTP
`GET`

#### Parametros
(Mediante variables de url)
* `groupID` (obligatorio): ID del grupo del cual se desean ver los modulos.

(Mediante parametros de url)
* `user_id` (opcional): ID del estudiante del cual se quieren ver los modulos. Para profesores no es necesario dar este parametro.

#### Respuestas
(En formato JSON) Se regresa un arreglo de modulos. Cada modulo tiene los siguientes campos
| Campo            | Tipo                  | Descripcion                   |
| ---------------- | --------------------- | ----------------------------- |
| id               | string                | ID del modulo                 |
| name             | string                | Nombre del modulo             |
| status           | string                | Estatus (abierto o bloqueado) |
| open_date        | string                | Fecha de inicio del modulo    |
| close_date       | string                | Fecha de cierre del modulo    |
| n_questions      | int                   | Numero de preguntas requeridas|
| n_answered       | int                   | Numero de preguntas resueltas (solo para estudiantes) |
| progress         | int                   | Porcentaje de progreso del modulo (solo para estudiantes) |


#### Ejemplo
**Peticion**
GET 34.16.137.250:8002/groupmodules/G000000001?user_id=A01551955

**Respuesta**
HTTP/1.1 200 OK
Content-Type: application/json
``` json
[
    {
        "id": "M0000000000000000001",
        "name": "Basics",
        "status": "closed",
        "open_date": "2023-04-20T00:00:00Z",
        "close_date": "2023-04-30T00:00:00Z",
        "n_questions": 3,
        "n_answered": 1,
        "progress": 33
    },
    {
        "id": "M0000000000000000002",
        "name": "Conditionals",
        "status": "open",
        "open_date": "2023-05-01T00:00:00Z",
        "close_date": "2023-05-10T00:00:00Z",
        "n_questions": 3,
        "n_answered": 0,
        "progress": 0
    },
    {
        "id": "M0000000000000000003",
        "name": "For loops",
        "status": "closed",
        "open_date": "2023-05-11T00:00:00Z",
        "close_date": "2023-05-20T00:00:00Z",
        "n_questions": 3,
        "n_answered": 0,
        "progress": 0
    }
]
```

---

### `/coursemodules/{courseID}`
#### Descripcion
Modulos de un grupo

#### Metodo de HTTP
`GET`

#### Parametros
(Mediante variables de url)
* `courseID` (obligatorio): ID del curso del cual se desean ver los modulos.

#### Respuestas
(En formato JSON) Se regresa un arreglo de modulos. Cada modulo tiene los siguientes campos
| Campo            | Tipo                  | Descripcion                   |
| ---------------- | --------------------- | ----------------------------- |
| id               | string                | ID del modulo                 |
| name             | string                | Nombre del modulo             |


#### Ejemplo
**Peticion**
GET 34.16.137.250:8002/coursemodules/TC1028

**Respuesta**
HTTP/1.1 200 OK
Content-Type: application/json
``` json
[
    {
        "id": "M0000000000000000001",
        "name": "Basics"
    },
    {
        "id": "M0000000000000000002",
        "name": "Conditionals"
    },
    {
        "id": "M0000000000000000003",
        "name": "For loops"
    }
]
```


## Endpoints de actualizacion

### `/togglemodulestate`
#### Descripcion
Cambia el estado del modulo de un grupo (bloqueado o desbloqueado)

#### Metodo de HTTP
`PATCH`

#### Parametros
(Mediante el body de la peticion)
| Parametro         | Tipo                  | Obligatorio | Descripcion     |
|------------------ | --------------------- | ----------- | --------------- |
| group             | string                | si          | ID del grupo    |
| module            | string                | si          | ID del modulo   |

#### Respuesta
En caso de que el estado del modulo haya sido cambiado de manera exitosa, se regresa unicamente un codigo HTTP 200 (OK)

#### Ejemplo
**Peticion**
PATCH 34.16.137.250:8002/togglemodulestate
Content-Type: application/json
``` json
{
    "module": "M0000000000000000003",
    "group": "G000000001"
}
```

**Respuesta**
HTTP/1.1 200 OK

---

### `/user/{userID}`
#### Descripcion
Modifica la informacion de un usuario

#### Metodo de HTTP
`PATCH`

#### Parametros
(Mediante el body de la peticion)
| Parametro    | Tipo        | Obligatorio | Descripcion            |
|------------- | ----------- | ----------- | ---------------------- |
| campus       | string      | no          | ID del nuevo campus    |
| name         | string      | no          | Nuevo nombre           |
| flast_name   | string      | no          | Nuevo apellido paterno |
| slast_name   | string      | no          | Nuevo apellido materno |

#### Respuesta
En caso de que se haya modificado la información del usuario de forma exitosa, se regresa unicamente un codigo HTTP 200 (OK)

#### Ejemplo
**Peticion**
PATCH 34.16.137.250:8002/user/S00000001
Content-Type: application/json
``` json
{
    "name": "Samuel",
    "flast_name": "Garcia"
}
```

**Respuesta**
HTTP/1.1 200 OK

---

### `/homework/{homeworkID}`
#### Descripcion
Modifica la configuracion de una tarea

#### Metodo de HTTP
`PATCH`

#### Parametros
(Mediante el body de la peticion)
| Parametro         | Tipo                 | Obligatorio | Descripcion            |
|------------------ | -------------------- | ----------- | ---------------------- |
| name              | string               | no          | Nombre de la tarea     |
| open_date         | string               | no          | Fecha de apertura      |
| close_date        | string               | no          | Fecha de cierre        |
| modules_questions | [ modulesQuestions ] | no          | Arreglo que representa las preguntas de cada modulo en la tarea |

El arreglo `modulesQuestions` debiese de contener unicamente objetos con las siguientes propiedades
| Parametro     | Tipo        | Obligatorio | Descripcion                                                           |
|-------------- | ----------- | ----------- | --------------------------------------------------------------------- |
| module        | string      | si          | Modulo que se quiere agregar a la tarea                               |
| n_questions   | int         | si          | Numero de preguntas requeridas para completar este modulo en la tarea |

#### Respuesta
En caso de que se haya modificado la configuración de la tarea de forma exitosa, se regresa únicamente un codigo HTTP 200 (OK)

#### Ejemplo
**Peticion**
PATCH 34.16.137.250:8002/homework/H0000000000000000001
Content-Type: application/json
``` json
{
    "name": "hello world",
    "modules_questions": [
        {
            "module": "M0000000000000000001",
            "n_questions": 12
        },
        {
            "module": "M0000000000000000002",
            "n_questions": 3
        }
    ]
}
```

**Respuesta**
HTTP/1.1 200 OK

## Endpoints de eliminacion

### `/homework/{homeworkID}`
#### Descripcion
Elimina una tarea, al igual que todas las configuraciones e intentos de los estudiantes de esta

#### Metodo de HTTP
`DELETE`

#### Parametros
(Mediante el variables de la URL)
* `homeworkID` (obligatorio): ID la tarea a eliminar.

#### Respuesta
En caso de que se haya eliminado la tarea de manera exitosa, se regresa unicamente un codigo HTTP 200 (OK)

#### Ejemplo
**Peticion**
DELETE 34.16.137.250:8002/homework/H0000000000000000001

**Respuesta**
HTTP/1.1 200 OK

---

### `/user/{userID}`
#### Descripcion
Elimina a un usuario de la BBDD.
Importante: De momento se hace una eliminacion en cascada, es decir, todo lo relacionado (ya sea directa o indirectamente) al usuario que se borro.

#### Metodo de HTTP
`DELETE`

#### Parametros
(Mediante el variables de la URL)
* `userID` (obligatorio): ID del usuario a eliminar

#### Respuesta
En caso de que se haya eliminado al usuario de manera exitosa, se regresa unicamente un codigo HTTP 200 (OK)

#### Ejemplo
**Peticion**
DELETE 34.16.137.250:8002/user/A01231212

**Respuesta**
HTTP/1.1 200 OK

---

### `/unenrollstudent`
#### Descripcion
Desenrola a un estudiante de un grupo.
Nota: Al desenrolar a un estudiante de un grupo, se eliminan todos los intentos de preguntas de tareas y modulos que haya realizado para este grupo

#### Metodo de HTTP
`DELETE`

#### Parametros
(Mediante el body de la peticion)
| Parametro         | Tipo                  | Obligatorio | Descripcion                                         |
|------------------ | --------------------- | ----------- | --------------------------------------------------- |
| group             | string                | si          | ID del grupo del que se desea desenrolar al alumno  |
| student           | string                | si          | Matricula del alumno a desenrolar                   |

#### Respuesta
En caso de que se haya eliminado al usuario de manera exitosa, se regresa unicamente un codigo HTTP 200 (OK)

#### Ejemplo
**Peticion**
DELETE 34.16.137.250:8002/user/unenrollstudent

**Respuesta**
HTTP/1.1 200 OK

---

### `/group/{groupID}`
#### Descripcion
Elimina a un grupo
Nota: Al eliminar a un grupo, se eliminan en cascada los registros de las demas tablas que tengan alguna relacion con el grupo que se elimino (en cascada)

#### Metodo de HTTP
`DELETE`

#### Parametros
(Mediante el variables de la URL)
* `groupID` (obligatorio): ID del grupo a eliminar

#### Respuesta
En caso de que se haya eliminado al grupo de manera exitosa, se regresa unicamente un codigo HTTP 200 (OK)

#### Ejemplo
**Peticion**
DELETE 34.16.137.250:8002/group/G000000001

**Respuesta**
HTTP/1.1 200 OK

---

### `/course/{courseID}`
#### Descripcion
Elimina a un curso
Nota: La eliminación en la BBDD es en cascada, por lo que se borraran los contenidos de otras tablas que tengan alguna relación con el curso borrado. Esto incluye grupos, preguntas y modulos

#### Metodo de HTTP
`DELETE`

#### Parametros
(Mediante el variables de la URL)
* `courseID` (obligatorio): ID del curso a eliminar

#### Respuesta
En caso de que se haya eliminado al curso de manera exitosa, se regresa unicamente un codigo HTTP 200 (OK)

#### Ejemplo
**Peticion**
DELETE 34.16.137.250:8002/course/TC1028

**Respuesta**
HTTP/1.1 200 OK

---

### `/module/{moduleID}`
#### Descripcion
Elimina a un modulo
Nota: La eliminación en la BBDD es en cascada, por lo que se borraran los contenidos de otras tablas que tengan alguna relación con el modulo borrado. Esto incluye preguntas e intentos de estas

#### Metodo de HTTP
`DELETE`

#### Parametros
(Mediante el variables de la URL)
* `moduleID` (obligatorio): ID del modulo a eliminar

#### Respuesta
En caso de que se haya eliminado al curso de manera exitosa, se regresa unicamente un codigo HTTP 200 (OK)

#### Ejemplo
**Peticion**
DELETE 34.16.137.250:8002/module/M0000000000000000001

**Respuesta**
HTTP/1.1 200 OK

---

### `/campus/{campusID}`
#### Descripcion
Elimina a un campus

#### Metodo de HTTP
`DELETE`

#### Parametros
(Mediante el variables de la URL)
* `campusID` (obligatorio): ID del campus a eliminar

#### Respuesta
En caso de que se haya eliminado al campus de manera exitosa, se regresa unicamente un codigo HTTP 200 (OK)

#### Ejemplo
**Peticion**
DELETE 34.16.137.250:8002/campus/PUE

**Respuesta**
HTTP/1.1 200 OK