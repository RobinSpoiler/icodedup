package structs

type HwQuestionAttempt struct {
	Student       string `json:"student"`
	Homework      string `json:"homework"`
	IdQuestion    string `json:"question"`
	AttemptStatus string `json:"attempt_status"`
}
