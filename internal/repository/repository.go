package repository

import (
	"backend/internal/models"
	"database/sql"
)

type DatabaseRepo interface {
	// interface like how its used in OOP for a database of choice. Can be used for several databases
	// such as PosgreSQL or MangoDB etc.
	// list the functions this type must have
	Connection() *sql.DB
	AllMovies() ([]*models.Movie, error)
	GetUserByEmail(email string) (*models.User, error)
	GetUserByID(id int) (*models.User, error)
}
