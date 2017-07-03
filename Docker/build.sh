#!/bin/bash

set -ex

docker build -t="cm/cm-grafana" grafana
docker build -t="cm/cm-prometheus" prometheus 
docker build -t="cm/cm-cadvisor" cadvisor
docker build -t="cm/cm-cassandra" cassandra
docker build -t="cm/cm-node-exporter" prometheus/node-exporter
