package main

import (
	"database/sql"
	"log"

	_ "github.com/jackc/pgconn"
	_ "github.com/jackc/pgx/v4"
	_ "github.com/jackc/pgx/v4/stdlib"
)

func openDB(dsn string) (*sql.DB, error) {
	// Open the database using the builtin method of sql.Open() and give it
	// the driver name of pgx. 
	db, err := sql.Open("pgx", dsn)
	if err != nil {
		return nil, err
	}

	// ping the database to see if there is a connection
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, err
}

func (app *application) connectToDB() (*sql.DB, error) {
	connection, err := openDB(app.DSN)
	if err != nil {
		return nil, err
	}

	log.Println("Connected to PostgreSQL")
	return connection, nil

}
