var synaptic = require('synaptic');
var fs = require('fs');
var analyize = require('./analysis').analyize;

function network() {
    return new synaptic.Architect.LSTM(105, 71, 15, 7, 7, 7, 1);
}

function train(msgs) {
    console.log("D");
    var net = network();
    console.log("C");
    var trainer = new synaptic.Trainer(net);
    console.log("A");
    trainer.train(msgs);
    console.log("B");
    return net;
}

function objValues(obj) {
    var keys = Object.keys(obj);
    var vals = [];

    for ( var key in keys ) {
        vals.push(obj[keys[key]]);
    }

    return vals;
}

function test(msgs) {
    var t = [];

    for ( var msg in msgs ) {
        msg = msgs[msg];
        var m = fs.readFileSync(msg["file"]).toString();

        t.push({
            input: objValues(analyize(m)),
            output: msg["grade"]
        });
    }

    return t;
}

var tests = test([
    {
        file: "example.txt",
        grade: 100
    },
]);
var test = train(tests);
console.log(JSON.stringify(test.toJSON(), null, 4));
