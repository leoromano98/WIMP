package models

import (
	"log"
	"os"
)

// Use log.New() to create a logger for writing information and error messages.
var InfoLog = log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
var ErrorLog = log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)
