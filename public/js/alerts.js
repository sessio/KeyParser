function AppAlerts() {}

AppAlerts.Error = function(msg) {
  $("#app-alerts").append('<div class="alert alert-danger" role="alert">' + msg + '</div>');
};
