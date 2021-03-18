package main

import (
	"fmt"
	"net/http"
)

/*Index executes when the URL is "/"  */
func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to Index.")
}
