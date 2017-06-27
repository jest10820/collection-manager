FROM prom/node-exporter:v0.14.0

CMD ["-collector.procfs", "/host/proc", "-collector.sysfs", "/host/sys", "-collector.filesystem.ignored-mount-points", "\"^(/rootfs|/host|)/(sys|proc|dev|host|etc)($$|/)\"", "collector.filesystem.ignored-fs-types", "\"^(sys|proc|auto|cgroup|devpts|ns|au|fuse\.lxc|mqueue)(fs|)$$\""]
