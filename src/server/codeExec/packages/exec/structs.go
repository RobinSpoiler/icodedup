package exec

type Problem struct {
	HiddenInputs   [][]string `json:"hinputs"`
	HiddenOutputs  []string   `json:"houtputs"`
	ShownInputs    [][]string `json:"sinputs"`
	ShownOutputs   []string   `json:"soutputs"`
	TimeOutSec     int        `json:"timeoutSec"`
	Language       string     `json:"language"`
	ForbiddenFuncs []string   `json:"forbidden_funcs"`
}

type RequestBody struct {
	ID   string `json:"id"`
	Code string `json:"code"`
}

type Result struct {
	Error        string                   `json:"error"`
	ShownTests   []map[string]interface{} `json:"shownTests"`
	ShownPassed  int                      `json:"shownPassed"`
	ShownFailed  int                      `json:"shownFailed"`
	HiddenTests  map[string]int           `json:"hiddenTests"`
	Passed       bool                     `json:"passed"`
}
