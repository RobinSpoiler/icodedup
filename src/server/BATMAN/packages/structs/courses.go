package structs

type Course struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	NModules int    `json:"n_modules"`
}

type NewCourseReq struct {
	ID      string   `json:"id"`
	Name    string   `json:"name"`
	Modules []string `json:"modules"`
}
