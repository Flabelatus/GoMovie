package main

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
)

// helper methods for JSON readings and writings etc.

type JSONResponse struct {
	Error   bool   `json:"error"`
	Message string `json:"message"`
	// omitempty -> If the data is not specified, then dont include it in the JSON
	Data interface{} `json:"data,omitempty"`
}

func (app *application) writeJSON(w http.ResponseWriter, status int, data interface{}, headers ...http.Header) error {
	// A function as a means of writting JSON files

	out, err := json.Marshal(data)
	if err != nil {
		return err
	}

	if len(headers) > 0 {
		for key, value := range headers[0] {
			w.Header()[key] = value
		}
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_, err = w.Write(out)
	if err != nil {
		return err
	}

	return nil
}

func (app *application) readJSON(w http.ResponseWriter, r *http.Request, data interface{}) error {
	// A function as a means of reading JSON files

	maxBytes := 1024 * 1024 // 1 MB size
	// limiting the response body to be not more than 1 MB
	r.Body = http.MaxBytesReader(w, r.Body, int64(maxBytes))

	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()

	err := dec.Decode(data)
	if err != nil {
		return err
	}

	// deconde information into the throwaway variable
	err = dec.Decode(&struct{}{})
	if err != io.EOF {
		// Throw an exception
		return errors.New("Body must only contain a single JSON value")
	}

	return nil
}

func (app *application) errorJSON(w http.ResponseWriter, err error, status ...int) error {
	// A function as a means of specifying JSON Error messages
	statusCode := http.StatusBadRequest

	if len(status) > 0 {
		statusCode = status[0]
	}

	var payload JSONResponse
	payload.Error = true
	payload.Message = err.Error()

	return app.writeJSON(w, statusCode, payload)
}
