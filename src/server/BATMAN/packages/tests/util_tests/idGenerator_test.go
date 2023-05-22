package util_test

import (
	"strings"
	"testing"
	"unicode"

	"github.com/jorgedel4/iCode/packages/util"
)

// aux test function to check that string only contains digits
func isNumeric(s string) bool {
	for _, r := range s {
		if !unicode.IsDigit(r) {
			return false
		}
	}
	return true
}

func TestGenerateID(t *testing.T) {
	tests := []struct {
		prefix string
		n      int
		errMsg string
	}{
		// No errors
		{prefix: "H", n: 5, errMsg: ""},
		{prefix: "A", n: 9, errMsg: ""},
		{prefix: "S", n: 8, errMsg: ""},
		// Prefix errors
		{prefix: "", n: 5, errMsg: "prefix cannot be an empty string"},
		{prefix: "", n: 2, errMsg: "prefix cannot be an empty string"},
		// Length errors
		{prefix: "ID", n: 0, errMsg: "length must be greater than 0"},
		{prefix: "M", n: -5, errMsg: "length must be greater than 0"},
	}

	for _, tc := range tests {
		// Run function with test case
		got, err := util.GenerateID(tc.prefix, tc.n)

		if err == nil && tc.errMsg != "" {
			t.Errorf("prefix=%q, length=%d: expected error %q, but got none", tc.prefix, tc.n, tc.errMsg)
		}
		if err != nil && err.Error() != tc.errMsg {
			t.Errorf("prefix=%q, length=%d: expected error %q, but got %q", tc.prefix, tc.n, tc.errMsg, err.Error())
		}

		if err == nil && (len(got) != len(tc.prefix)+tc.n || !strings.HasPrefix(got, tc.prefix) || !isNumeric(got[len(tc.prefix):])) {
			t.Errorf("prefix=%q, length=%d: got %q, want %q with prefix and only numeric characters", tc.prefix, tc.n, got, tc.prefix)
		}
	}
}
