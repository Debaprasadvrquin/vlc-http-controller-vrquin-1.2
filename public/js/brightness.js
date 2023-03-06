const brightness = require('brightness');

brightness.get().then(level => {
    console.log(level);
    //=> 0.5
});

brightness.set(0.1).then(() => {
    console.log('Changed brightness to 80%');
});