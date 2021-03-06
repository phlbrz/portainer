function NodeViewModel(data) {
  this.Model = data;
  this.Id = data.ID;
  this.Version = data.Version.Index;
  this.Name = data.Spec.Name;
  this.Role = data.Spec.Role;
  this.CreatedAt = data.CreatedAt;
  this.UpdatedAt = data.UpdatedAt;
  this.Availability = data.Spec.Availability;

  var labels = data.Spec.Labels;
  if (labels) {
    this.Labels = Object.keys(labels).map(function(key) {
      return { key: key, value: labels[key], originalKey: key, originalValue: labels[key], added: true };
    });
  } else {
    this.Labels = [];
  }

  this.Hostname = data.Description.Hostname;
  this.PlatformArchitecture = data.Description.Platform.Architecture;
  this.PlatformOS = data.Description.Platform.OS;
  this.CPUs = data.Description.Resources.NanoCPUs;
  this.Memory = data.Description.Resources.MemoryBytes;
  this.EngineVersion = data.Description.Engine.EngineVersion;
  this.EngineLabels = data.Description.Engine.Labels;
  this.Plugins = data.Description.Engine.Plugins;
  this.Status = data.Status.State;

  if (data.ManagerStatus) {
    this.Leader = data.ManagerStatus.Leader;
    this.Reachability = data.ManagerStatus.Reachability;
    this.ManagerAddr = data.ManagerStatus.Addr;
  }
}
