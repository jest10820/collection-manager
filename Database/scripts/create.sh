#!/bin/bash

set -e

cqlsh -u cassandra -p cassandra -f /Database/baseline/keyspace_users.cql
cqlsh -u cassandra -p cassandra -f /Database/baseline/permissions.cql
