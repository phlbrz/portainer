angular.module('portainer.helpers')
.factory('TemplateHelper', ['$filter', function TemplateHelperFactory($filter) {
  'use strict';
  var helper = {};

  helper.getDefaultContainerConfiguration = function() {
    return {
      Env: [],
      OpenStdin: false,
      Tty: false,
      ExposedPorts: {},
      HostConfig: {
        RestartPolicy: {
          Name: 'no'
        },
        PortBindings: {},
        Binds: [],
        Privileged: false
      },
      Volumes: {}
    };
  };

  helper.portArrayToPortConfiguration = function(ports) {
    var portConfiguration = {
      bindings: {},
      exposedPorts: {}
    };
    ports.forEach(function (p) {
      if (p.containerPort) {
        var key = p.containerPort + "/" + p.protocol;
        var binding = {};
        if (p.hostPort) {
          binding.HostPort = p.hostPort;
          if (p.hostPort.indexOf(':') > -1) {
            var hostAndPort = p.hostPort.split(':');
            binding.HostIp = hostAndPort[0];
            binding.HostPort = hostAndPort[1];
          }
        }
        portConfiguration.bindings[key] = [binding];
        portConfiguration.exposedPorts[key] = {};
      }
    });
    return portConfiguration;
  };

  helper.EnvToStringArray = function(templateEnvironment, containerMapping) {
    var env = [];
    templateEnvironment.forEach(function(envvar) {
      if (envvar.value || envvar.set) {
        var value = envvar.set ? envvar.set : envvar.value;
        if (envvar.type && envvar.type === 'container') {
          if (containerMapping === 'BY_CONTAINER_IP') {
            var container = envvar.value;
            value = container.NetworkSettings.Networks[Object.keys(container.NetworkSettings.Networks)[0]].IPAddress;
          } else if (containerMapping === 'BY_CONTAINER_NAME') {
            value = $filter('containername')(envvar.value);
          } else if (containerMapping === 'BY_SWARM_CONTAINER_NAME') {
            value = $filter('swarmcontainername')(envvar.value);
          }
        }
        env.push(envvar.name + "=" + value);
      }
    });
    return env;
  };

  return helper;
}]);
