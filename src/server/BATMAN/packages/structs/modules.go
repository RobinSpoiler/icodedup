package structs

type Module struct {
	ID         string `json:"id"`
	Name       string `json:"name"`
	Locked     bool   `json:"locked"`
	NQuestions int    `json:"n_questions"`
}

type ModuleStudent struct {
	ID         string `json:"id"`
	Name       string `json:"name"`
	Locked     bool   `json:"locked"`
	NQuestions int    `json:"n_questions"`
	NAnswered  int    `json:"n_answered"`
	Progress   int    `json:"progress"`
}

type CourseModule struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type ModuleConf struct {
	ModuleID   string `json:"module_id"`
	NQuestions int    `json:"n_questions"`
}

type ModuleQuestion struct {
	Module string `json:"module"`
	NQuestions int `json:"n_questions"`
}

type SwitchModStatusReq struct {
	Group string `json:"group"`
	Module string `json:"module"`
}