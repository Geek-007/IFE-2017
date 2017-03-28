// 预处理函数，完成对数据的转换

exports.preprocess = preprocess;

function preprocess(file) {
    var arr = file.toString().split('\r\n');
    arr.splice(arr.length - 1, 1);
    for (var i=0; i<arr.length; i++) {
        arr[i] = arr[i].split(',');
        for (var j=2; j<7; j++) {
            arr[i][j] = parseFloat(arr[i][j]);
        }
    }
    arr.sort(cmpDate);

    var tmpDate = arr[0][0],
        cnt = 0,
        open = 0,
        high = 0,
        low = 0,
        close = 0,
        volumn = 0;
    var date = [],
        stick = [],
        aveStick = [],
        aveVol = [];
    for (i=0; i<arr.length; i++) {
        if (arr[i][0] !== tmpDate) {
            tmpDate = tmpDate.split('');
            tmpDate.splice(4, 0, '-');
            tmpDate.splice(7, 0, '-');
            tmpDate = tmpDate.join('');
            date.push(tmpDate);
            tmpDate = arr[i][0];
            stick.push(+(open / cnt).toFixed(2));    // open
            stick.push(+(close / cnt).toFixed(2));   // close
            stick.push(+(low / cnt).toFixed(2));     // low
            stick.push(+(high / cnt).toFixed(2));    // high
            aveStick.push(stick);
            stick = [];
            aveVol.push(parseInt(volumn / cnt));
            cnt = 0;
            open = 0;
            high = 0;
            low = 0;
            close = 0;
            volumn = 0;
        }
        cnt++;
        open += arr[i][2];
        high += arr[i][3];
        low += arr[i][4];
        close += arr[i][5];
        volumn += arr[i][6];
    }
    tmpDate = tmpDate.split('');
    tmpDate.splice(4, 0, '-');
    tmpDate.splice(7, 0, '-');
    tmpDate = tmpDate.join('');
    date.push(tmpDate);
    tmpDate = '';
    stick.push(+(open / cnt).toFixed(2));    // open
    stick.push(+(close / cnt).toFixed(2));   // close
    stick.push(+(low / cnt).toFixed(2));     // low
    stick.push(+(high / cnt).toFixed(2));    // high
    aveStick.push(stick);
    stick = [];
    aveVol.push(parseInt(volumn / cnt));
    cnt = 0;
    open = 0;
    high = 0;
    low = 0;
    close = 0;
    volumn = 0;

    return {
        date: date,
        aveStick: aveStick,
        aveVol: aveVol
    };
}

function cmpDate(a, b) {
    if (a[0] < b[0]) {
        return -1;
    } else if (a[0] > b[0]) {
        return 1;
    } else {
        return 0;
    }
}