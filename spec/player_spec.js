var m = require('jsmockito').JsMockito;
//var Player = require('../src/player.js');
// about jsmockito : https://github.com/cleishm/jsmockito

var People = require('../models/People');
var fight_ctrl = require('../controllers/fight_ctrl');

describe("weapon-evolution", function(){
    describe('people fight each other.',function() {
       it('first fight people die.',function() {
           var zhangsan = new People('张三', 10, 3);
           zhangsan.is_alive = function() {
               return false;
           };
           zhangsan.fight = function() {
               return '张三出击';
           };
           var lisi = new People('李四', 10, 5);
           lisi.is_alive = function() {
               return true;
           };
           lisi.fight = function() {
               return '李四出击';
           };
           expect(fight_ctrl.fight_each_other(zhangsan, lisi)).toBe('张三被打败了.');
       });

        it('second fight people die.', function () {
            var zhangsan = new People('张三', 10, 5);
            zhangsan.is_alive = function() {
                return true;
            };
            zhangsan.fight = function() {
                return '张三出击';
            };
            var lisi = new People('李四', 10, 3);
            lisi.is_alive = function() {
                return false;
            };
            lisi.fight = function() {
                return '李四出击';
            };
            expect(fight_ctrl.fight_each_other(zhangsan, lisi)).toBe('李四被打败了.');
        });
    });

    describe('the method is_alive of people.',function() {

        it('people should be die.',function() {
            var people = new People('张三', 0, 3);
            var people2 = new People('李四', -1, 4);
            expect(people.is_alive()).toBe(false);
            expect(people2.is_alive()).toBe(false);
        });

        it('people should be alive.',function() {
            var people = new People('李四', 1, 2);
            expect(people.is_alive()).toBe(true);
        })
    });

    it('people should be fighting,the blood of who was fighted should be reduce.',function() {
        var zhangsan = new People('张三', 10, 4);
        var lisi = new People('李四', 20, 5);
        zhangsan.fight(lisi);
        lisi.fight(zhangsan);
        expect(lisi.blood).toBe(16);
        expect(zhangsan.blood).toBe(5);
    })
});
