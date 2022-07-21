export default function (qlik) {
  return function () {
    const $scope = this.$scope;
    const table = qlik.table(this);
    const backendApi = this.backendApi;
    const measures = backendApi.getMeasureInfos();
    const dimensions = backendApi.getDimensionInfos();
    const arr = table.rows.map((item) => {
      return {
        word: item.dimensions[0].qText || undefined,
        count: item.measures[0].qNum || 0,
      }
    });
    const list = arr.map(({word}) => {
      return [word, wordCount(word, arr)];
    });
    Object.assign($scope.options, {
      list,
      fontSizeFactor: 0.1,
      maxFontSize: 60,
      minFontSize: 12,
      tooltip: {
        show: true,
        backgroundColor: 'rgba(0, 0, 0, 0.701961)',
        formatter: function(item) {
          return `${dimensions[0].qFallbackTitle}: ${item[0]}; ${measures[0].qFallbackTitle}: ${item[1]}`;
        }
      },
      gridSize: Math.round(16 * $scope.$el.offsetWidth / 1024),
      weightFactor: function (size) {
        return Math.pow(size, 2.3) * $scope.$el.offsetWidth / 1024;
      },
      rotateRatio: 0.75,
    });
    $scope.WordCloud.showLoading({
      backgroundColor: '#eeeeee',
      text: 'Loading...',
      effect: 'spin',
    })
    $scope.WordCloud.setOption($scope.options);
    $scope.WordCloud.hideLoading();
  };
}

/**
 * word count
 * @param {*} word 
 * @param {*} arr 
 * @returns 
 */
function wordCount(w, arr) {
  let res = 0;
  arr.map(({word, count}) => {
    if (w === word) res = res + count;
  });
  return res;
}