FROM google/cadvisor:v0.25.0

# add gnu find 
RUN apk add --update findutils && rm -rf /var/cache/apk/*

CMD ["-logtostderr", "-docker_only"]
