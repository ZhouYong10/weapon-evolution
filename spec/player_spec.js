var m = require('jsmockito').JsMockito;
//var Player = require('../src/player.js');
// about jsmockito : https://github.com/cleishm/jsmockito

var People = require('../models/People');
var fight_ctrl = require('../controllers/fight_ctrl');

describe("weapon-evolution", function(){
    describe('people fight each other.',function() {

       it('first fight people die.',function() {
           var zhangsan = new People('张三', 10, 3);
           zhangsan.fight = function(people) {
               people.blood -= this.hurt;
               return '张三出击\n';
           };
           var lisi = new People('李四', 10, 5);
           lisi.fight = function(people) {
                people.blood -= this.hurt;
               return '李四出击\n';
           };
           expect(fight_ctrl.fight_each_other(zhangsan, lisi)).toBe('张三出击\n'+
                                                                       '李四出击\n'+
                                                                       '张三出击\n'+
                                                                       '李四出击\n'+
                                                                       '张三被打败了.');
       });

        it('second fight people die.', function () {
            var zhangsan = new People('张三', 10, 5);
            zhangsan.fight = function(people) {
                people.blood -= this.hurt;
                return '张三出击\n';
            };
            var lisi = new People('李四', 10, 3);
            lisi.fight = function(people) {
                people.blood -= this.hurt;
                return '李四出击\n';
            };
            expect(fight_ctrl.fight_each_other(zhangsan, lisi)).toBe('张三出击\n'+
                                                                        '李四出击\n'+
                                                                        '张三出击\n'+
                                                                        '李四被打败了.');
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

    it('people should be fighting,the blood of who was fighted should be reduce and output details.',function() {
        var zhangsan = new People('张三', 10, 4);
        var lisi = new People('李四', 20, 5);
        zhangsan.fight(lisi);
        lisi.fight(zhangsan);
        expect(lisi.blood).toBe(16);
        expect(zhangsan.blood).toBe(5);
    });

    it('the method output_fight_details of people should be output details of fight.',function() {
        var zhangsan = new People('张三', 10, 4);
        var lisi = new People('李四', 20, 5);
        zhangsan.fight(lisi);
        expect(zhangsan.output_fight_details(lisi)).toBe('张三攻击了李四,李四受到了4点伤害,李四剩余生命:16\n');
    })
});
