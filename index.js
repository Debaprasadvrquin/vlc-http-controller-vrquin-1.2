const express = require("express");
const app = express();
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
var exec = require('child_process').exec;
/* LOAD LIBRARY */
const { media } = require("./library.json");

var m = 0;
var bri = 5;
var vlc;
const temperatures = [];

const introduction = "/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4"
/* LISTENING PARAMETERS */
// const length = fs.readdirSync("/videos").length
vlc = spawn('vlc', ['-I', 'rc', '--rc-fake-tty']);

var stdout_queue = new Array();
var stdouts = new Array();

vlc.stdin.on('data', (data) => {
    console.log(`VLC received:\n${data.toString()}`);
});

vlc.stdout.on("data", (chunk) => {
    if (stdout_queue.length > 0) {
        console.log("THERE IS A CB", stdout_queue[0])
        const cb = stdout_queue[0];
        stdout_queue.splice(0, 1)
        cb(chunk.toString())
    }
    console.log("CB QUEUE", stdout_queue)
    stdouts.push(chunk.toString())
    process.stdout.write("BANG" + chunk, (_err) => { });
})

vlc.stderr.on('data', (data) => {
    console.log(`VLC ERROR:\n${data.toString()}`);
});

app.get("/library", (req, res) => {
    res.sendFile(__dirname + '/library.json');
});
app.get("/library1", (req, res) => {
    res.sendFile(__dirname + '/public/json/library1.json');
});
app.get("/library2", (req, res) => {
    res.sendFile(__dirname + '/public/json/library2.json');
});
app.get("/library3", (req, res) => {
    res.sendFile(__dirname + '/public/json/library3.json');
});
app.get("/library4", (req, res) => {
    res.sendFile(__dirname + '/public/json/library4.json');
});

app.get("/manifest", (req, res) => {
    res.sendFile(__dirname + '/public/json/manifest.json');
});
app.get("/vrquin-64", (req, res) => {
    res.sendFile(__dirname + '/public/images/vrquin-64.png');
});
app.get("/vrquin-128", (req, res) => {
    res.sendFile(__dirname + '/public/images/vrquin-128.png');
});
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/vrquin.html');
});
app.get("/vrquin1", (req, res) => {
    res.sendFile(__dirname + '/public/html/vrquin1.html');
});
app.get("/vrquin2", (req, res) => {
    res.sendFile(__dirname + '/public/html/vrquin2.html');
});
app.get("/vrquin3", (req, res) => {
    res.sendFile(__dirname + '/public/html/vrquin3.html');
});
app.get("/vrquin4", (req, res) => {
    res.sendFile(__dirname + '/public/html/vrquin4.html');
});

app.get("/rc", (req, res) => {
    res.sendFile(__dirname + '/rc.html');
});

app.get("/holotube3.72.html", (req, res) => {
    res.sendFile(__dirname + '/public/html/holotube3.72.html');
});
app.get("/instructions.html", (req, res) => {
    res.sendFile(__dirname + '/public/html/instructions.html');
});

app.get("/BeoPlayH6fromDimensivaXR.45.html", (req, res) => {
    res.sendFile(__dirname + '/public/html/BeoPlay H6 from Dimensiva XR.45.html');
});
app.get("/BeoPlayH6fromDimensivaXR.46.html", (req, res) => {
    res.sendFile(__dirname + '/public/html/BeoPlay H6 from Dimensiva XR.46.html');
});
app.get("/BeoPlayH6fromDimensiva.43.html", (req, res) => {
    res.sendFile(__dirname + '/public/html/BeoPlay H6 from Dimensiva.43.html');
});
async function findMedia(id) {
    return new Promise((resolve, reject) => {
        const found = media.filter((v) => {
            return (v.id == id);
        })
        console.log("FOUND", found)
        if (found.length == 1) {
            resolve(found[0])
        } else {
            reject("TOO FEW OR TOO MANY!")
        }
    })
}

app.post("/load", async (req, res) => {
    const { fileid } = req.body;
    await findMedia(fileid)
        .then((file) => {
            vlc.stdin.write("clear\n");
            vlc.stdin.write('add ' + file['src'] + '\n')
            var id_No = file['id']
            var length = file['Length']
            if (id_No < 8) {
                setTimeout(() => {
                    vlc.stdin.write("clear\n");
                    vlc.stdin.write('add ' + '/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4' + '\n')
                }, length)
            } else if ((id_No > 7) & (id_No > 15)) {
                setTimeout(() => {
                    vlc.stdin.write("clear\n");
                    vlc.stdin.write('add ' + '/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4' + '\n')
                }, length)
            } else if ((id_No > 14) & (id_No < 22)) {
                setTimeout(() => {
                    vlc.stdin.write("clear\n");
                    vlc.stdin.write('add ' + '/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4' + '\n')
                }, length)
            } else if ((id_No > 21) & (id_No < 28)) {
                setTimeout(() => {
                    vlc.stdin.write("clear\n");
                    vlc.stdin.write('add ' + '/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4' + '\n')
                }, length)
            }
            res.send({ status: "OK" })
        })
});
vlc.stdin.write('add ' + introduction + '\n')
vlc.stdin.write("loop\n")


app.post("/black_button1", (req, res) => {
    vlc.stdin.write("clear\n");
    vlc.stdin.write('add ' + "/home/pi//vlc-http-controller-vrquin-1.2/public/116.mp4" + '\n')
    setTimeout(() => {
        vlc.stdin.write("clear\n");
        vlc.stdin.write('add ' + '/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4' + '\n')
    }, 19000)
    res.send({ status: "OK" })
});
app.post("/yellow_button1", (req, res) => {
    vlc.stdin.write("clear\n");
    vlc.stdin.write('add ' + "/home/pi//vlc-http-controller-vrquin-1.2/public/113.mp4" + '\n')
    setTimeout(() => {
        vlc.stdin.write("clear\n");
        vlc.stdin.write('add ' + '/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4' + '\n')
    }, 33000)
    res.send({ status: "OK" })
});
app.post("/white_button1", (req, res) => {
    vlc.stdin.write("clear\n");
    vlc.stdin.write('add ' + "/home/pi//vlc-http-controller-vrquin-1.2/public/115.mp4" + '\n')
    setTimeout(() => {
        vlc.stdin.write("clear\n");
        vlc.stdin.write('add ' + '/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4' + '\n')
    }, 29000)
    res.send({ status: "OK" })
});

app.post("/black_button2", (req, res) => {
    vlc.stdin.write("clear\n");
    vlc.stdin.write('add ' + "/home/pi//vlc-http-controller-vrquin-1.2/public/116.mp4" + '\n')
    setTimeout(() => {
        vlc.stdin.write("clear\n");
        vlc.stdin.write('add ' + '/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4' + '\n')
    }, 19000)
    res.send({ status: "OK" })
});
app.post("/yellow_button2", (req, res) => {
    vlc.stdin.write("clear\n");
    vlc.stdin.write('add ' + "/home/pi//vlc-http-controller-vrquin-1.2/public/113.mp4" + '\n')
    setTimeout(() => {
        vlc.stdin.write("clear\n");
        vlc.stdin.write('add ' + '/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4' + '\n')
    }, 33000)
    res.send({ status: "OK" })
});
app.post("/white_button2", (req, res) => {
    vlc.stdin.write("clear\n");
    vlc.stdin.write('add ' + "/home/pi//vlc-http-controller-vrquin-1.2/public/115.mp4" + '\n')
    setTimeout(() => {
        vlc.stdin.write("clear\n");
        vlc.stdin.write('add ' + '/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4' + '\n')
    }, 29000)
    res.send({ status: "OK" })
});

app.post("/black_button3", (req, res) => {
    vlc.stdin.write("clear\n");
    vlc.stdin.write('add ' + "/home/pi//vlc-http-controller-vrquin-1.2/public/116.mp4" + '\n')
    setTimeout(() => {
        vlc.stdin.write("clear\n");
        vlc.stdin.write('add ' + '/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4' + '\n')
    }, 19000)
    res.send({ status: "OK" })
});
app.post("/yellow_button3", (req, res) => {
    vlc.stdin.write("clear\n");
    vlc.stdin.write('add ' + "/home/pi//vlc-http-controller-vrquin-1.2/public/113.mp4" + '\n')
    setTimeout(() => {
        vlc.stdin.write("clear\n");
        vlc.stdin.write('add ' + '/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4' + '\n')
    }, 33000)
    res.send({ status: "OK" })
});
app.post("/white_button3", (req, res) => {
    vlc.stdin.write("clear\n");
    vlc.stdin.write('add ' + "/home/pi//vlc-http-controller-vrquin-1.2/public/115.mp4" + '\n')
    setTimeout(() => {
        vlc.stdin.write("clear\n");
        vlc.stdin.write('add ' + '/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4' + '\n')
    }, 29000)
    res.send({ status: "OK" })
});

app.post("/black_button4", (req, res) => {
    vlc.stdin.write("clear\n");
    vlc.stdin.write('add ' + "/home/pi//vlc-http-controller-vrquin-1.2/public/116.mp4" + '\n')
    setTimeout(() => {
        vlc.stdin.write("clear\n");
        vlc.stdin.write('add ' + '/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4' + '\n')
    }, 19000)
    res.send({ status: "OK" })
});
app.post("/yellow_button4", (req, res) => {
    vlc.stdin.write("clear\n");
    vlc.stdin.write('add ' + "/home/pi//vlc-http-controller-vrquin-1.2/public/113.mp4" + '\n')
    setTimeout(() => {
        vlc.stdin.write("clear\n");
        vlc.stdin.write('add ' + '/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4' + '\n')
    }, 33000)
    res.send({ status: "OK" })
});
app.post("/white_button4", (req, res) => {
    vlc.stdin.write("clear\n");
    vlc.stdin.write('add ' + "/home/pi//vlc-http-controller-vrquin-1.2/public/115.mp4" + '\n')
    setTimeout(() => {
        vlc.stdin.write("clear\n");
        vlc.stdin.write('add ' + '/home/pi//vlc-http-controller-vrquin-1.2/public/111.mp4' + '\n')
    }, 29000)
    res.send({ status: "OK" })
});

app.post("/seek", async (req, res) => {
    const { time } = req.body;
    console.log("SEEK", time)
    if (time) {
        vlc.stdin.write('seek ' + time + '\n')
        res.send({ status: "OK" })
    }
});
app.post("/brip", (req, res) => {
    bri += 1;
    if (bri > 10) {
        bri = 10;
    } else {
        if (bri == 1) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_1.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else if (bri == 2) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_2.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else if (bri == 3) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_3.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else if (bri == 4) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_4.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else if (bri == 5) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_5.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else if (bri == 6) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_6.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else if (bri == 7) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_7.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else if (bri == 8) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_8.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else if (bri == 9) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_9.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_10.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        }
    }
    res.send({ status: "OK" })
});
app.post("/brim", (req, res) => {
    bri -= 1;
    if (bri < 1) {
        bri = 1;
    } else {
        if (bri == 1) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_0.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else if (bri == 2) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_1.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else if (bri == 3) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_2.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else if (bri == 4) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_3.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else if (bri == 5) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_4.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else if (bri == 6) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_5.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else if (bri == 7) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_6.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else if (bri == 8) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_7.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else if (bri == 9) {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_8.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        } else {
            sensor = spawn('python', ['/home/pi/vlc-http-controller-vrquin-1.1/public/python/bright_9.py']);
            sensor.stdout.on('data', function (data) {

                // convert Buffer object to Float
                temperatures.push(parseFloat(data));
                console.log(temperatures);
            });
        }
    }
    res.send({ status: "OK" })
});
app.post("/enqueue", async (req, res) => {
    const { fileid } = req.body;
    console.log("ADD")
    findMedia(fileid).then((file) => {
        vlc.stdin.write('enqueue ' + file['src'] + '\n')
        res.send({ status: "OK" })
    })
});
app.post("/reboot", (req, res) => {
    function shutdown(callback) {
        exec('sudo reboot', function (error, stdout, stderr) { callback(stdout); });
    }
    shutdown(function (output) {
        console.log(output);
    });
    res.send({ status: "OK" })
});
app.post("/shutdown", (req, res) => {
    function shutdown(callback) {
        exec('sudo poweroff', function (error, stdout, stderr) { callback(stdout); });
    }
    shutdown(function (output) {
        console.log(output);
    });
    res.send({ status: "OK" })
});
app.post("/pause", (req, res) => {
    vlc.stdin.write("pause\n")
    res.send({ status: "OK" })
});

app.post("/play", (req, res) => {
    vlc.stdin.write("play\n")
    res.send({ status: "OK" })
});
app.post("/loop", (req, res) => {
    vlc.stdin.write("loop\n")
    res.send({ status: "OK" })
});
app.post("/mute", (req, res) => {
    if (m == 0) {
        vlc.stdin.write("volume 0\n")
        m = 1;
    } else {
        vlc.stdin.write("volume 256\n")
        m = 0;
    }
    res.send({ status: "OK" })
});
app.post("/volp", (req, res) => {
    vlc.stdin.write("volup\n")
    res.send({ status: "OK" })
});
app.post("/volm", (req, res) => {
    vlc.stdin.write("voldown\n")
    res.send({ status: "OK" })
});
app.post("/stop", (req, res) => {
    vlc.stdin.write("stop\n")
    res.send({ status: "OK" })
});

app.post("/next", (req, res) => {
    vlc.stdin.write("next\n")
    res.send({ status: "OK" })
});

app.post("/prev", (req, res) => {
    vlc.stdin.write("prev\n")
    res.send({ status: "OK" })
});

app.post("/clear", (req, res) => {
    vlc.stdin.write("clear\n")
    res.send({ status: "OK" })
});

app.post("/fastforward", (req, res) => {
    vlc.stdin.write("fastforward\n")
    res.send({ status: "OK" })
});

app.post("/rewind", (req, res) => {
    vlc.stdin.write("rewind\n")
    res.send({ status: "OK" })
});

app.post("/faster", (req, res) => {
    vlc.stdin.write("faster\n")
    res.send({ status: "OK" })
});

app.post("/slower", (req, res) => {
    vlc.stdin.write("slower\n")
    res.send({ status: "OK" })
});

app.post("/normal", (req, res) => {
    vlc.stdin.write("normal\n")
    res.send({ status: "OK" })
});

app.post("/frame", (req, res) => {
    vlc.stdin.write("frame\n")
    res.send({ status: "OK" })
});

app.post("/fullscreen", (req, res) => {
    vlc.stdin.write("fullscreen\n")
    res.send({ status: "OK" })
});

function handleCurrenttime(data) {
    console.log("Handletime called: ", data);
    const parts = data.split("\r\n")
    parameters["currenttime"] = parts[0];
}

function handlePlaylist(data) {
    console.log("Handleplaylist called: ")
    const parts = data.split("\r\n")
    parameters["playlist"] = parts;
}

function handleCurrentlength(data) {
    console.log("HandleCurrentlength called: ", data)
    //parameters["currentlength"] = data;
    const parts = data.split("\r\n")
    parameters["currentlength"] = parts[0];
}

async function awaitParameter(param) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (parameters[param] != null) {
                resolve(parameters[param])
            } else {
                reject("TIMEOUT on await " + param)
            }
        }, 100)
    })
}

app.post("/gettime", async (req, res) => {
    parameters["currenttime"] = null;
    stdout_queue.push(handleCurrenttime);
    vlc.stdin.write("get_time\n")
    const value = await awaitParameter("currenttime")
        .then((data) => {
            res.send({ status: "OK", data })
        })
})

app.post("/getplaylist", async (req, res) => {
    parameters["playlist"] = null;
    stdout_queue.push(handlePlaylist);
    vlc.stdin.write("playlist\n")
    const value = await awaitParameter("playlist")
        .then((data) => {
            res.send({ status: "OK", data })
        })
})

async function updateParameter(vlccmd, paramname, cb) {
    return new Promise(async (resolve, reject) => {
        parameters[paramname] = null;
        stdout_queue.push(cb);
        vlc.stdin.write(vlccmd + "\n")
        await awaitParameter(paramname).then(async (data) => {
            resolve(data)
        })
    })
}

app.post("/gettimeline", async (req, res) => {
    updateParameter("get_time", "currenttime", handleCurrenttime)
        .then(() => {
            updateParameter("get_length", "currentlength", handleCurrentlength)
                .then(() => {
                    res.send({ status: "OK", parameters })
                })
        })
})

app.post("/info", async (req, res) => {
    parameters["currentlength"] = null;
    parameters["currenttime"] = null;

    stdout_queue.push(handleCurrenttime);
    vlc.stdin.write("get_time\n")

    stdout_queue.push(handleCurrentlength);
    vlc.stdin.write("get_length\n")

    Promise.all([awaitParameter("currenttime"), awaitParameter("currentlength")])
        .then((data) => {
            res.send({ status: "OK", parameters })
        })
})

app.post("/getlength", async (req, res) => {
    parameters["currentlength"] = null;
    stdout_queue.push(handleCurrentlength);
    vlc.stdin.write("get_length\n")
    const value = await awaitParameter("currentlength")
        .then((data) => {
            res.send({ status: "OK", data })
        })
})


app.post("/help", (req, res) => {
    const test = vlc.stdin.write("help\n")
    res.send({ status: "OK" })
})

app.listen(8000, () => {
    console.log("Listen on the port 8000...");
});
