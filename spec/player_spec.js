var m = require('jsmockito').JsMockito;
//var Player = require('../src/player.js');
// about jsmockito : https://github.com/cleishm/jsmockito

describe("player", function(){
    it("game spec", function(){
        var mocked_console = m.spy(console);
        mocked_console.log("李四被打败了.");
        m.verify(mocked_console).log("李四被打败了.");
    });
});
