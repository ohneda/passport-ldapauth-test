#!/bin/bash

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <username> <password>"
  exit 1
fi

USERNAME=$1
PASSWORD=$2

curl -X POST http://localhost:8080/login -d "username=$USERNAME&password=$PASSWORD" -H "Content-Type: application/x-www-form-urlencoded"
