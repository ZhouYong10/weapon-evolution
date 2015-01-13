var m = require('jsmockito').JsMockito;
//var Player = require('../src/player.js');
// about jsmockito : https://github.com/cleishm/jsmockito

var People = require('../models/People');
var fight_ctrl = require('../controllers/fight_ctrl');

describe("weapon-evolution", function(){
    describe('people fight each other.',function() {
       it('first fight people die.',function() {
           var zhangsan = new People('张三', 10, 3);
           var lisi = new People('李四', 10, 5);
           expect(fight_ctrl.fight_each_other(zhangsan, lisi)).toBe('张三被打败了.');
       });

        it('second fight people die.', function () {
            var zhangsan = new People('张三', 10, 5);
            var lisi = new People('李四', 10, 3);
            expect(fight_ctrl.fight_each_other(zhangsan, lisi)).toBe('李四被打败了.');
        });
    });

    describe('the method fight of people.',function() {
        it('the blood should be reduce of people who was fighted.',function() {
            var zhangsan = new People('张三', 10, 3);
            var lisi = new People('李四', 10, 6);
            zhangsan.fight(lisi);
            expect(lisi.blood).toBe(7);
        })
    });

    describe('the method is_alive of people.',function() {
       it('people should be alive.',function() {
           var zhangsan = new People('张三', 3, 2);
           expect(zhangsan.is_alive()).toBe('alive');
       });
        it('people should be dead.', function () {
            var lisi = new People('李四', 0, 4);
            expect(lisi.is_alive()).toBe('李四被打败了.');
        })
    });

    describe('the method all_alive of fight_ctrl.',function() {
        var zhangsan = new People('张三', 10, 3);
        var lisi = new People('李四', -2, 5);
        var wangwu = new People('王五', 1, 3);

        it('all people should be alive.',function() {
            expect(fight_ctrl.all_alive(zhangsan, wangwu)).toBe('allAlive');
        });

        it('lisi should be dead.',function() {
            expect(fight_ctrl.all_alive(zhangsan, lisi, wangwu)).toBe('李四被打败了.');
        })
    })
});
