package structs

import "time"

type HWReq struct {
	ID      string `json:"id"`
	Time    string `json:"time"`     // should support: week (hw for the next 7 days), all (past and future), future (u know what this does)
	Group   string `json:"group"`    // should support: all (al enrolled groups) and the ID of the group
	GroupBy string `json:"group_by"` // group or day (7)
}

type HWStudent struct {
	HW_ID      string    `json:"hw_id"`
	HW_Name    string    `json:"hw_name"`
	CourseID   string    `json:"course_id"`
	CourseName string    `json:"course_name"`
	GroupID    string    `json:"group_id"`
	Opening    time.Time `json:"opening"`
	Closing    time.Time `json:"closing"`
	Needed     int       `json:"needed"`
	Done       int       `json:"done"`
}

type HWProfessor struct {
	HW_ID      string    `json:"hw_id"`
	HW_Name    string    `json:"hw_name"`
	CourseID   string    `json:"course_id"`
	CourseName string    `json:"course_name"`
	GroupID    string    `json:"group_id"`
	Opening    time.Time `json:"opening"`
	Closing    time.Time `json:"closing"`
}

type NewHWReq struct {
	Groups           []string         `json:"groups"`
	HWName           string           `json:"hw_name"`
	OpenDate         time.Time        `json:"open_date"`
	CloseDate        time.Time        `json:"close_date"`
	ModulesQuestions []ModuleQuestion `json:"modules_questions"`
}

type UpdateHWReq struct {
	Name             string           `json:"name"`
	OpenDate         time.Time        `json:"open_date"`
	CloseDate        time.Time        `json:"close_date"`
	ModulesQuestions []ModuleQuestion `json:"modules_questions"`
}
