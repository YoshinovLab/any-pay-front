package main

import (
	"net/http"
	"net/http/cgi"
	"os"
	"time"
)

func main() {
	now := time.Now()
	timeStr := now.Format("2006-01-02 15:04:05")
	secret := os.Getenv("ANY_PAY_FRONT_WEBHOOK_SECRET")
	cgi.Serve(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Hello from CGI!\n"))
		w.Write([]byte(timeStr + "\n"))
	}))
}
