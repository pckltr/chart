var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    commaInput = document.getElementById('comma-input'),
    headingInput = document.getElementById('heading-input'),
    otherDelimiter = document.getElementById('other-delimiter'),
    otherInput = document.getElementById('other-input'),
    tabInput = document.getElementById('tab-input'),
    tableInput = document.getElementById('table-input');


(function() {
    // has to be before canvas starts drawing or else
    window.addEventListener('resize', canvasResize);
    window.addEventListener('load', canvasResize);
    function canvasResize() {
        var left = document.getElementById('left');
        var chartTitle = document.getElementById('chart-title');
        canvas.height = left.clientHeight - chartTitle.clientHeight - parseInt(window.getComputedStyle(chartTitle, null).getPropertyValue("margin-top")) - parseInt(window.getComputedStyle(chartTitle, null).getPropertyValue("margin-bottom"));
        canvas.width = window.innerWidth - left.clientWidth;
        plotChart();
    }

})();

tableInput.addEventListener('input', function() {
    plotChart();
});

tableInput.addEventListener('focus', function() {
    plotChart();
});

headingInput.addEventListener('change', function() {
    plotChart();
});

tabInput.addEventListener('change', function() {
    plotChart();
});

commaInput.addEventListener('change', function() {
    plotChart();
});

otherInput.addEventListener('change', function() {
    plotChart();
});

otherDelimiter.addEventListener('input', function() {
    otherInput.checked = 'true';
    plotChart();
});
otherDelimiter.addEventListener('focus', function() {
    otherInput.checked = 'true';
});
window.addEventListener('load', function() {

    commaInput.checked = 'true';
    tableInput.value = 'prod,size\na,100\nb,300\nc,300\nd,400';
    plotChart();
});

function plotChart() {

    var arr = tableInput.value.split('\n'),
        x = [],
        y = [],
        startX = 0,
        startY = canvas.height,
        delimiter = '\t',
        nameX,
        nameY;

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (headingInput.checked) {
        delimiter = '\t';
    }
    if (tabInput.checked) {
        delimiter = '\t';
    }
    if (commaInput.checked) {
        delimiter = ',';
    }
    if (otherInput.checked) {
        delimiter = otherDelimiter.value;
    }
    if (headingInput.checked) {
        nameX = arr[0].split(delimiter)[0];
        nameY = arr[0].split(delimiter)[1];
        context.font = '14px Roboto';
        context.fillStyle = '#226E9B';
        context.fillText(nameX, 10, canvas.height / 2 - 10);
        context.fillText(nameY, (canvas.width - context.measureText(nameY).width) / 2, canvas.height - 10);
        arr.splice(0, 1);
    }


    for (var i = 0; i < arr.length; i += 1) {
        x.push(arr[i].split(delimiter)[0]);
        y.push(arr[i].split(delimiter)[1]);
    }

    var sortedY = y.slice().sort(function(a,b){
        return a - b;
    });

    var largestNumber = sortedY[sortedY.length - 1];

    var percentY = [];

    context.beginPath();
    for (var i = 0; i < y.length; i += 1) {
        var stepX = canvas.width / x.length;
        percentY[i] = y[i] * (canvas.height) / largestNumber;
        context.moveTo(startX, startY);
        startX = startX + stepX;
        startY = canvas.height - percentY[i];
        context.lineTo(startX, startY);
    }
    context.closePath();
    context.lineWidth = '4';
    context.lineCap = 'round';
    context.strokeStyle = '#FF9A39';
    context.stroke();
}