var m = require('jsmockito').JsMockito;
//var Player = require('../src/player.js');
// about jsmockito : https://github.com/cleishm/jsmockito

var People = require('../models/People');
var fight_ctrl = require('../controllers/fight_ctrl');
var Soldier = require('../models/roles/Soldier');
var OrdinaryBeing = require('../models/roles/OrdinaryBeing');
var Weapon = require('../models/weapons/Weapon');
var Defense = require('../models/defenses/Defense');

describe("weapon-evolution", function(){
    describe('people fight each other.',function() {

       it('first fight people die.',function() {
           var soldierZhangsan = new Soldier(new People('张三', 10, 4),'战士',
               new Weapon('优质木棒',3),
               new Defense('护盾',2));
           soldierZhangsan.fight = function(role) {
               role.reduce_blood(this.hurt());
               return '张三出击\n';
           };
           var ordinaryBeingLisi = new OrdinaryBeing(new People('李四', 10, 3),'普通人');
           ordinaryBeingLisi.fight = function(role) {
               role.reduce_blood(this.hurt());
               return '李四出击\n';
           };
           expect(fight_ctrl.fight_each_other(soldierZhangsan, ordinaryBeingLisi))
               .toBe('张三出击\n'+
                       '李四出击\n'+
                       '张三出击\n'+
                       '普通人李四被打败了.');
       });

        it('second fight people die.', function () {
            var soldierZhangsan = new Soldier(new People('张三', 10, 4), '战士',
                new Weapon('优质木棒', 3),
                new Defense('护盾', 2));
            soldierZhangsan.fight = function (role) {
                role.reduce_blood(this.hurt());
                return '张三出击\n';
            };
            var ordinaryBeingLisi = new OrdinaryBeing(new People('李四', 20, 10), '普通人');
            ordinaryBeingLisi.fight = function (role) {
                role.reduce_blood(this.hurt());
                return '李四出击\n';
            };
            expect(fight_ctrl.fight_each_other(soldierZhangsan, ordinaryBeingLisi))
                .toBe('张三出击\n' +
                '李四出击\n' +
                '张三出击\n' +
                '李四出击\n' +
                '战士张三被打败了.');
        });
    });

    describe('the method fight of people.',function() {

        var soldierZhangsan, ordinaryBeingLisi;
        beforeEach(function() {
            soldierZhangsan = new Soldier(new People('张三', 10, 4),'战士',
                new Weapon('优质木棒',3),
                new Defense('护盾',2));
            ordinaryBeingLisi = new OrdinaryBeing(new People('李四', 10, 3),'普通人');
        });

        it('soldier fight ordinary being.',function() {
            expect(soldierZhangsan.fight(ordinaryBeingLisi))
                .toBe('战士张三用优质木棒攻击了普通人李四,李四受到了7点伤害,李四剩余生命：3\n');
        });

        it('ordinary being fight soldier.',function() {
            expect(ordinaryBeingLisi.fight(soldierZhangsan))
                .toBe('普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命：9\n');
        });

        it('ordinary being fight ordinary being.',function() {
            var ordinaryBeingZhangsan = new OrdinaryBeing(new People('张三', 10, 5),'普通人');
            expect(ordinaryBeingZhangsan.fight(ordinaryBeingLisi))
                .toBe('普通人张三攻击了普通人李四,李四受到了5点伤害,李四剩余生命：5\n');
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
            expect(fight_ctrl.all_alive(zhangsan, lisi, wangwu))
                .toBe('李四被打败了.');
        })
    })
});
