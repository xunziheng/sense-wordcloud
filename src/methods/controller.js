import Js2WordCloud from 'js2wordcloud';

export default [
  "$scope",
  "$element",
  function ($scope) {
    $scope.$el = document.getElementById('word-cloud');
    $scope.options = {};
    $scope.WordCloud = new Js2WordCloud($scope.$el);
  },
];
