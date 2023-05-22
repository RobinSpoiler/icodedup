package util

import (
	"crypto/rand"
	"encoding/binary"
	"errors"
	"fmt"
	"math"
	"strconv"
)

// Generates an ID of length n and returns the concatenation of the prefix with the ID
func GenerateID(prefix string, n int) (string, error) {
	if prefix == "" {
		return "", errors.New("prefix cannot be an empty string")
	}
	if n <= 0 {
		return "", errors.New("length must be greater than 0")
	}

	// Create and fill slice with random bytes
	b := make([]byte, 8)
	if _, err := rand.Read(b); err != nil {
		return "", fmt.Errorf("error generating random number: %s", err)
	}

	// Transform 'b' slice into a positive integer and transform it into a string
	randNum := int(math.Abs(float64(int64(binary.BigEndian.Uint64(b)))))
	randNumStr := strconv.Itoa(randNum)
	// Add filling 0s to make the ID of length n
	for len(randNumStr) < n {
		randNumStr = "0" + randNumStr
	}

	return prefix + randNumStr[len(randNumStr)-n:], nil
}
