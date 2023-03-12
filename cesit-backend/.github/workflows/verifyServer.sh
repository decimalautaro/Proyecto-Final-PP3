#!/bin/bash
SERVER=$1
PORT=$2

sleep 15

echo Esperando que inicie el servidor $SERVER : $PORT
while ! nc -z -v $SERVER $PORT; do
  sleep 15
done

echo "El servidor ya inicio"
