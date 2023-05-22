package consts

// To obtain account type given the prefix of an user's ID
var AccountTypes = map[byte]string{
    'L': "professor",
	'A': "student",
	'S': "admin",
}

// Column with user's id depending on account type
var DBUsersIDColumn = map[string]string{
	"professor": "nomina",
	"student": "matricula",
	"admin": "id_admin",
}