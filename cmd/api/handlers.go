package main

import (
	"backend/internal/models"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

func (app *application) Home(w http.ResponseWriter, r *http.Request) {
	// send a JSON response
	var payload = struct {
		Status  string `json:"status"`
		Message string `json:"message"`
		Version string `json:"version"`
	}{
		Status:  "active",
		Message: "Go Movies up and running",
		Version: "1.0.0",
	}

	toJson(payload, w)
}

func (app *application) AllMovies(w http.ResponseWriter, r *http.Request) {
	var movies []models.Movie

	rd, _ := time.Parse("2006-01-02", "1986-03-07")

	highLander := models.Movie{
		ID:           1,
		Title:        "Highlander",
		ResealseDate: rd,
		RunTime:      116,
		MPAARating:   "R",
		Description:  "A very nice movie",
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}

	movies = append(movies, highLander)

	rd, _ = time.Parse("2006-01-02", "1981-06-12")
	rtola := models.Movie{
		ID:           2,
		Title:        "Raiders of the Lost Ark",
		ResealseDate: rd,
		RunTime:      115,
		MPAARating:   "PG-13",
		Description:  "Another very nice movie",
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}
	movies = append(movies, rtola)

	toJson(movies, w)
}

func toJson(payload interface{}, w http.ResponseWriter) {
	out, err := json.Marshal(payload)
	if err != nil {
		fmt.Println(err)
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
}
