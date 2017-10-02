'use strict';

const client = require('prom-client');
const promgc = require('prometheus-gc-stats');
promgc();
const defaultLabels = {taskName: process.env.HOSTNAME};
client.register.setDefaultLabels(defaultLabels);
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });
const labels = require('./labels');
const metric = {
  http: {
    requests: {
      duration: new client.Summary({name: 'http_request_duration_milliseconds', help: 'request duration in milliseconds', labelNames: ['method', 'path', 'code', 'status']}),
      buckets: new client.Histogram({name: 'http_request_buckets_milliseconds', help: 'request duration buckets in milliseconds. Bucket size set to 500 and 2000 ms to enable apdex calculations with a T of 300ms', labelNames: ['method', 'path', 'code', 'status'], buckets: [500, 2000]}),
      counter: new client.Counter({name: 'http_request_counter', help: 'number of requests. This counter is reset when the process restarts', labelNames: ['method', 'path', 'code', 'status']})
    }
  }
};

function ms (start) {
  let diff = process.hrtime(start);
  return Math.round((diff[0] * 1e9 + diff[1]) / 1000000);
}

function observe (method, path, statusCode, respStatus, start) {
  path = path ? path.toLowerCase() : '';

  if (path !== '/metrics' && path !== '/metrics/' && path !== '/health-check' && path !== '/health-check/') {
    let duration = ms(start);
    method = method.toLowerCase();
    let split = labels.parse(path);
    metric.http.requests.duration.labels(method, split.path, statusCode, respStatus).observe(duration);
    metric.http.requests.buckets.labels(method, split.path, statusCode, respStatus).observe(duration);
    metric.http.requests.counter.labels(method, split.path, statusCode, respStatus).inc();
  }
}

module.exports = {
  client: client,
  observe: observe,
  summary: () => client.register.metrics()
};

