USE iCode;

INSERT INTO campus VALUES
    ("PUE", "Puebla"),
    ("CSF", "Santa Fe"),
    ("MTY", "Monterrey"),
    ("GDL", "Guadalajara"),
    ("HID", "Hidalgo");

INSERT INTO terms VALUES
    ("IV22", "Invierno 2022", '2022-01-5 00:00:00', '2022-02-12 23:59:59'), 
    ("FJ22", "Febrero-Junio 2022", '2022-02-15 00:00:00', '2022-06-26 23:59:59'),
    ("VE22", "Verano 2022", '2022-07-5 00:00:00', '2022-08-25 23:59:59'),
    ("AD22", "Agosto-Diciembre 2022", '2022-08-28 00:00:00', '2022-12-12 23:59:59'),
    ("IV23", "Invierno 2023", '2023-01-5 00:00:00', '2023-02-12 23:59:59'), 
    ("FJ23", "Febrero-Junio 2023", '2023-02-15 00:00:00', '2023-06-26 23:59:59'),
    ("VE23", "Verano 2023", '2023-07-5 00:00:00', '2023-08-25 23:59:59'),
    ("AD23", "Agosto-Diciembre 2023", '2023-08-28 00:00:00', '2023-12-12 23:59:59');

INSERT INTO professors VALUES
    ("L00000001", "PUE", "Daniel", "Perez", "Rojas"),
    ("L00000002", "MTY", "Claudia", "Perez", "Lezama"),
    ("L00000003", "GDL", "Rosa", "Paredes", "Juarez"),
    ("L00000004", "CSF", "Alba", "Romero", "Garcia");


INSERT INTO courses VALUES
    ("TC1028", "Pensamiento computacional"),
    ("TC1030", "Programacion orientada a objetos"),
    ("TC1031", "Estructuras de datos y algoritmos");

INSERT INTO admins VALUES
    ("S00000001", "PUE", "Sam", "Sepiol", NULL),
    ("S00000002", "GDL", "Kanye", "Omari", "West"),
    ("S00000003", "MTY", "Galactus", "Lider", "Supremo");

INSERT INTO students VALUES
    ("A01551955", "PUE", "Jorge", "Delgado", "Morales"),
    ("A01731511", "PUE", "Karla", "Sanchez", "Olivares"),
    ("A00157831", "PUE", "Jose", "Cardoza", "Mendez"),
    ("A08787803", "PUE", "Maria", "Ortiz", "Reyes"),
    ("A01712734", "PUE", "Adriana", "Fernandez", "Rojas"),
    ("A06615812", "CSF", "Juan", "Ortega", "Vasquez"),
    ("A09707892", "CSF", "Aldo", "Pacheco", "Morales"),
    ("A00102193", "CSF", "Carlos", "Villasenor", "Pacheco"),
    ("A01212321", "MTY", "Carolina", "Martinez", "Gutierrez"),
    ("A01212121", "MTY", "Patricio", "Ramirez", "Sandoval"),
    ("AO6612193", "MTY", "Mauricio", "Oropeza", "Ruiz"),
    ("A01552812", "MTY", "Ramiro", "Hernandez", "Villasenor"),
    ("A01730092", "MTY", "Ana", "Lopez", "Garcia"),
    ("A00871372", "MTY", "Sofia", "Garcia", "Jimenez"),
    ("A07136662", "GDL", "Fernando", "Gonzalez", "Cortes"),
    ("A09123312", "GDL", "Julio", "Castillo", "Sanchez"),
    ("A01112341", "GDL", "Paulina", "Rojas", "Torres"),
    ("A09707662", "GDL", "Diego", "Valle", "Gutierrez"),
    ("A08062912", "GDL", "Luis", "Mendez", "Hernandez"),
    ("A04281593", "HID", "Mariana", "Alvarez", "Torres"),
    ("A09753149", "HID", "Rafael", "Diaz", "Castillo"),
    ("A06149233", "HID", "Miguel", "Ramirez", "Martinez");

INSERT INTO grupos VALUES
    ("G000000001", "TC1028", "L00000001", "FJ23"),
    ("G000000002", "TC1031", "L00000001", "FJ23"),
    ("G000000003", "TC1028", "L00000001", "IV23"),
    ("G000000004", "TC1028", "L00000002", "FJ23"),
    ("G000000005", "TC1030", "L00000002", "FJ23"),
    ("G000000006", "TC1031", "L00000003", "IV23"),
    ("G000000007", "TC1028", "L00000004", "FJ23");

INSERT INTO enrollments VALUES
    ("G000000001", "A01551955"),
    ("G000000001", "A01731511"),
    ("G000000001", "A00157831"),
    ("G000000001", "A08787803"),
    ("G000000001", "A01712734"),
    ("G000000002", "A01551955"),
    ("G000000002", "A01731511"),
    ("G000000002", "A00157831"),
    ("G000000003", "A01712734"),
    ("G000000003", "A01551955"),
    ("G000000003", "A00157831"),
    ("G000000004", "A01212321"),
    ("G000000004", "A01212121"),
    ("G000000004", "A00871372"),
    ("G000000004", "AO6612193"),
    ("G000000005", "A01552812"),
    ("G000000005", "A01730092"),
    ("G000000006", "A07136662"),
    ("G000000006", "A09123312"),
    ("G000000006", "A01112341"),
    ("G000000006", "A09707662"),
    ("G000000007", "A04281593"),
    ("G000000007", "A06149233");

INSERT INTO modules VALUES
    ("M0000000000000000001", "TC1028", "Basics"),
    ("M0000000000000000002", "TC1028", "Conditionals"),
    ("M0000000000000000003", "TC1028", "For loops"),
    ("M0000000000000000004", "TC1030", "Atributos"),
    ("M0000000000000000005", "TC1030", "Metodos"),
    ("M0000000000000000006", "TC1030", "Polimorfismo"),
    ("M0000000000000000007", "TC1031", "Complejidades"),
    ("M0000000000000000008", "TC1031", "Busqueda binaria"),
    ("M0000000000000000009", "TC1031", "Arbol binario");

INSERT INTO moduleConfigs VALUES
    ("M0000000000000000001", "G000000001", 3, TRUE),
    ("M0000000000000000002", "G000000001", 3, TRUE),
    ("M0000000000000000003", "G000000001", 3, TRUE),
    ("M0000000000000000001", "G000000003", 2, TRUE),
    ("M0000000000000000002", "G000000003", 3, FALSE),
    ("M0000000000000000003", "G000000003", 1, TRUE);

INSERT INTO questions VALUES
    ("CQ000000000000000001", "M0000000000000000001", "codep", '{"description": "Double a number", "hinputs": [["2"], ["4"]], "houtputs": ["4", "16"], "sinputs": [["3"], ["6"]], "soutputs": ["9", "36"], "timeoutSec": 10, "forbiddenFunctions": [], "initialCode": "", "language": "python"}', 'L00000001', '2023-04-15 00:00:00', "APP"),
    ("CQ000000000000000002", "M0000000000000000001", "codep", '{"description": "create a function that returns the biggest number", "hinputs": [["4", "3", "1", "9", "2"], ["2", "0", "7"]], "houtputs": ["9", "7"], "sinputs": [["4", "3", "1", "9", "2"], ["2", "0", "7"]], "soutputs": ["9", "7"], "timeoutSec": 10, "forbiddenFunctions": ["sum"], "initialCode": "", "language": "python"}', 'L00000001', '2023-04-15 00:00:00', "APP"),
    ("CQ000000000000000003", "M0000000000000000001", "codep", '{"description": "create a function that returns the biggest number", "hinputs": [["4", "3", "1", "9", "2"], ["2", "0", "7"]], "houtputs": ["9", "7"], "sinputs": [["4", "3", "1", "9", "2"], ["2", "0", "7"]], "soutputs": ["9", "7"], "timeoutSec": 10, "forbiddenFunctions": ["sum"], "initialCode": "", "language": "python"}', 'L00000001', '2023-04-15 00:00:00', "APP"),
    ("CQ000000000000000004", "M0000000000000000002", "codep", '{"description": "create a function that returns the biggest number", "hinputs": [["4", "3", "1", "9", "2"], ["2", "0", "7"]], "houtputs": ["9", "7"], "sinputs": [["4", "3", "1", "9", "2"], ["2", "0", "7"]], "soutputs": ["9", "7"], "timeoutSec": 10, "forbiddenFunctions": ["sum"], "initialCode": "", "language": "python"}', 'L00000001', '2023-04-15 00:00:00', "APP"),
    ("CQ000000000000000005", "M0000000000000000002", "codep", '{"description": "create a function that returns the biggest number", "hinputs": [["4", "3", "1", "9", "2"], ["2", "0", "7"]], "houtputs": ["9", "7"], "sinputs": [["4", "3", "1", "9", "2"], ["2", "0", "7"]], "soutputs": ["9", "7"], "timeoutSec": 10, "forbiddenFunctions": ["sum"], "initialCode": "", "language": "python"}', 'L00000001', '2023-04-15 00:00:00', "APP"),
    ("CQ000000000000000006", "M0000000000000000002", "codep", '{"description": "create a function that returns the biggest number", "hinputs": [["4", "3", "1", "9", "2"], ["2", "0", "7"]], "houtputs": ["9", "7"], "sinputs": [["4", "3", "1", "9", "2"], ["2", "0", "7"]], "soutputs": ["9", "7"], "timeoutSec": 10, "forbiddenFunctions": ["sum"], "initialCode": "", "language": "python"}', 'L00000001', '2023-04-15 00:00:00', "APP"),
    ("CQ000000000000000007", "M0000000000000000003", "codep", '{"description": "create a function that returns the biggest number", "hinputs": [["4", "3", "1", "9", "2"], ["2", "0", "7"]], "houtputs": ["9", "7"], "sinputs": [["4", "3", "1", "9", "2"], ["2", "0", "7"]], "soutputs": ["9", "7"], "timeoutSec": 10, "forbiddenFunctions": ["sum"], "initialCode": "", "language": "python"}', 'L00000001', '2023-04-15 00:00:00', "APP"),
    ("CQ000000000000000008", "M0000000000000000003", "codep", '{"description": "create a function that returns the biggest number", "hinputs": [["4", "3", "1", "9", "2"], ["2", "0", "7"]], "houtputs": ["9", "7"], "sinputs": [["4", "3", "1", "9", "2"], ["2", "0", "7"]], "soutputs": ["9", "7"], "timeoutSec": 10, "forbiddenFunctions": ["sum"], "initialCode": "", "language": "python"}', 'L00000001', '2023-04-15 00:00:00', "APP"),
    ("CQ000000000000000009", "M0000000000000000003", "codep", '{"description": "create a function that returns the biggest number", "hinputs": [["4", "3", "1", "9", "2"], ["2", "0", "7"]], "houtputs": ["9", "7"], "sinputs": [["4", "3", "1", "9", "2"], ["2", "0", "7"]], "soutputs": ["9", "7"], "timeoutSec": 10, "forbiddenFunctions": ["sum"], "initialCode": "", "language": "python"}', 'L00000001', '2023-04-15 00:00:00', "APP");

INSERT INTO homework VALUES
    ("H0000000000000000001", "G000000001", "Tarea 1: Condicionales", '2023-05-05 00:00:00', '2023-05-10 00:00:00'),
    ("H0000000000000000002", "G000000001", "Tarea 2: Condicionales", '2023-05-11 00:00:00', '2023-05-16 00:00:00');

INSERT INTO homeworkConfigs VALUES
    ("H0000000000000000001", "M0000000000000000001", 2),
    ("H0000000000000000001", "M0000000000000000002", 1),
    ("H0000000000000000002", "M0000000000000000003", 5);

INSERT INTO hw_questionAttempts VALUES
    ("A01551955", "H0000000000000000001", "CQ000000000000000001", "PAS", '2023-04-14 12:43:23'),
    ("A01551955", "H0000000000000000001", "CQ000000000000000002", "PAS", '2023-04-14 12:43:23'),
    ("A01731511", "H0000000000000000001", "CQ000000000000000001", "PAS", '2023-04-14 12:43:23');

INSERT INTO questionAttempts VALUES
    ("A01551955", "G000000001", "CQ000000000000000001", "FAI", '2023-04-14 12:43:03'),
    ("A01551955", "G000000001", "CQ000000000000000001", "FAI", '2023-04-14 12:43:03'),
    ("A01551955", "G000000001", "CQ000000000000000002", "PAS", '2023-04-14 12:43:03'),
    ("A01551955", "G000000001", "CQ000000000000000003", "PAS", '2023-04-14 12:43:23');