// temperature-listener.js

const { spawn } = require('child_process');
const temperatures = []; // Store readings

sensor = spawn('python', ['/home/pi/vlc-http-controller-main/brightness.py']);
sensor.stdout.on('data', function (data) {

    // convert Buffer object to Float
    temperatures.push(parseFloat(data));
    console.log(temperatures);
});
