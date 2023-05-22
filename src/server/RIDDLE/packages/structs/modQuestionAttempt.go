package structs

type ModQuestAttempt struct {
	Student       string `json:"student"`
	Group         string `json:"grupo"`
	IdQuestion    string `json:"question"`
	AttemptStatus string `json:"attempt_status"`
}
