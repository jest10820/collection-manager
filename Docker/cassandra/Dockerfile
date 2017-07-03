FROM cassandra:3.11

ENV JMX_EXPORTER_VERSION 0.9

RUN apt-get update && apt-get install -y wget && \
    rm -rf /var/lib/apt/lists/*
# Get jmx exporter for Prometheus
RUN wget http://central.maven.org/maven2/io/prometheus/jmx/jmx_prometheus_javaagent/${JMX_EXPORTER_VERSION}/jmx_prometheus_javaagent-${JMX_EXPORTER_VERSION}.jar
COPY prom-java-exporter/cassandra-config.yml cassandra-config.yml

# Set as JVM_OPTS in Cassandra env file
RUN echo 'JVM_OPTS="$JVM_OPTS -javaagent:'$PWD/jmx_prometheus_javaagent-$JMX_EXPORTER_VERSION.jar=7070:$PWD/cassandra-config.yml'"' >> $CASSANDRA_CONFIG/cassandra-env.sh

EXPOSE 7070
