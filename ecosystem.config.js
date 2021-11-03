module.exports = {
  apps : [{
	name   : "LTDStats Webserver",
	script : "webserver.js",
	instances: "max",
	exec_mode: "cluster"
  }]
}
