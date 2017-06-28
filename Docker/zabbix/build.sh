#!/bin/bash

set -ex

docker build -t="cm/cm-zabbix-server" .
docker build -t="cm/cm-postgresql" ../postgresql
docker build -t="cm/cm-zabbix-agent" zabbix-agent
docker build -t="cm/cm-zabbix-web" zabbix-web
