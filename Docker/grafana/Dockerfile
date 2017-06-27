FROM grafana/grafana:4.3.2

RUN mkdir -p /etc/grafana/custom_dashboards && \
    chown -R grafana:grafana /etc/grafana/custom_dashboards

COPY dashboards/ /etc/grafana/custom_dashboards

COPY bin/create-datasource.sh /usr/local/bin
RUN chmod +x /usr/local/bin/create-datasource.sh

ENTRYPOINT ["/usr/local/bin/create-datasource.sh"]
