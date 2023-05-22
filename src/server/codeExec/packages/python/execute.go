package python

import (
	"bytes"
	"fmt"
	"os/exec"
	"strings"
)

func Execute(code string, inputs []string) (string, error) {
	// Define the Docker command to run
	cmd := exec.Command("docker", "run", "--rm", "-i", "python:latest", "python", "-c", code)

	// Create a buffer to store the output
	var output bytes.Buffer

	// Redirect both stdout and stderr to the buffer
	cmd.Stdout = &output
	cmd.Stderr = &output

	// Open a pipe to the command's stdin
	stdin, err := cmd.StdinPipe()
	if err != nil {
		return "", err
	}

	// Start the command
	if err := cmd.Start(); err != nil {
		return "", err
	}

	// Write inputs to the command's stdin
	for _, input := range inputs {
		if _, err := fmt.Fprintln(stdin, input); err != nil {
			return "", err
		}
	}

	// Close the command's stdin
	if err := stdin.Close(); err != nil {
		return "", err
	}

	// Wait for the command to complete
	if err := cmd.Wait(); err != nil {
		// Get the error message from the output buffer
		outputStr := strings.TrimRight(output.String(), "\n")
		if outputStr == "" {
			// If there is no output, return the exit status as the error
			return "", fmt.Errorf("command failed with exit status %d", cmd.ProcessState.ExitCode())
		} else {
			// Otherwise, return the output as the error message
			return "", fmt.Errorf("%s", outputStr)
		}
	}

	// Remove any trailing newline characters from the output
	outputStr := strings.TrimRight(output.String(), "\n")

	// Return the output as a string
	return outputStr, nil
}
