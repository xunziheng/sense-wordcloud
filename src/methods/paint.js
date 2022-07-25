export default function (qlik) {
  return function ($element, layout) {
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
      fontFamily: layout.font.fontFamily === 'default' ? undefined : layout.font.fontFamily,
      backgroundColor: layout.background.backgroundColor.color,
      tooltip: {
        show: true,
        backgroundColor: 'rgba(0, 0, 0, 0.701961)',
        formatter: function(item) {
          return `
            <div>${dimensions[0].qFallbackTitle}: ${item[0]}</div>
            <div>${measures[0].qFallbackTitle}: ${item[1]}</div>
          `;
        }
      },
      gridSize: Math.round(16 * $scope.$el.offsetWidth / 1024),
      weightFactor: function (size) {
        return Math.pow(size, 2.3) * $scope.$el.offsetWidth / 1024;
      },
      shrinkToFit: true,
      drawOutOfBound: false,
      drawMask: false, // debugger
      wait: 30,
      abortThreshold: 3000,
      shuffle: true,
      rotateRatio: 1,
      shape: 'circle',
      ellipticity: 1,
      hover: (item, dimension, event) => {
      },
      click: (item, dimension, event) => {
      },
    });
    $scope.WordCloud.showLoading({
      backgroundColor: '#eeeeee',
      text: 'Loading...',
      effect: 'spin',
    })
    setTimeout(() => {
      $scope.WordCloud.setOption($scope.options);
      $scope.WordCloud.hideLoading();
    }, 300);
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