#!/bin/bash
set -e

echo "Starting Grafana"
/run.sh "$@" &

addDataSource() {
  curl 'http://localhost:3000/api/datasources' \
    -X POST \
    -H 'Content-Type: application/json;charset=UTF-8' \
    --data-binary \
    '{"name":"prometheus","type":"prometheus","url":"http://prometheus:9090","access":"proxy","isDefault":true}'
}

until addDataSource; do
  echo "Creating Prometheus' datasource for Grafana..."
  sleep 5
done
echo "Finished configuring Grafana"
wait
