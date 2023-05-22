package structs

import "time"

type GroupsReq struct {
	ID   string `json:"id"`
	Term string `json:"term"`
}

type Group struct {
	GroupID       string    `json:"id_group"`
	CourseID      string    `json:"id_course"`
	CourseName    string    `json:"course_name"`
	StartDate     time.Time `json:"start_date"`
	EndDate       time.Time `json:"end_date"`
	ProfName      string    `json:"first_name"`
	ProfFLastName string    `json:"flast_name"`
	ProfSLastName string    `json:"slast_name"`
}

type NewGroupReq struct {
	CourseID     string       `json:"course_id"`
	TermID       string       `json:"term_id"`
	ProfessorID  string       `json:"professor_id"`
	ModulesConfs []ModuleConf `json:"modules_confs"`
}
