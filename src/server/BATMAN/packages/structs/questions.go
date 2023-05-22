package structs

import "time"

type QuestionReqsReq struct {
	QuestionsType string `json:"questions_type"`
	RequestedBy   string `json:"requested_by"`
	Course        string `json:"course"`
	Status        string `json:"status"`
}

type QuestionReq struct {
	ID             string    `json:"id"`
	Type           string    `json:"type"`
	Info           string    `json:"info"`
	RequestersID   string    `json:"requesters_id"`
	RequestersName string    `json:"requesters_name"`
	Course         string    `json:"course"`
	CourseName     string    `json:"course_name"`
	Module         string    `json:"module"`
	Status         string    `json:"status"`
	SubmittedOn    time.Time `json:"submitted_on"`
}
