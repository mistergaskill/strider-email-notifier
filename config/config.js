var app = window.app
app.controller('LvEmailNotifierCtrl', ['$scope', function ($scope) {

  $scope.config = $scope.pluginConfig('lvemailnotifier')

  $scope.$watch('config.notify', function(newValue, oldValue) {
    if (newValue !== oldValue) {
      $scope.saving = true;
      $scope.pluginConfig('lvemailnotifier', $scope.config, function () {
        $scope.saving = false
      })
    }
  });

}]);
