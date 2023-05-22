package structs

type RequestQuestion struct {
	/* IdQuestion  = con la idgenerator lo agrego*/
	Module    string `json:"module"`
	QType     string `json:"q_type"`
	Info      string `json:"info"`
	CreatedBy string `json:"created_by"`
	/* SubmittedOn agrego el tiempo en el que se agrega realmente */
	/* CurrentStatus = a todos se les da PEN por default */
}
