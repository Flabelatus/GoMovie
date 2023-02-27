package main

import (
	"fmt"
	"log"
	"net/http"
)

const port = 8080

type application struct {
	Domain string
}

func main() {
	// application config
	var app application
	// read from command line (convention to pass flags in the app)

	// connect to the DB

	app.Domain = "example.com"
	log.Println("Starting application on port 8080")

	// start the webserver
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())

	if err != nil {
		log.Fatal(err)
		return
	}
}
