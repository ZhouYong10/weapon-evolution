var m = require('jsmockito').JsMockito;
//var Player = require('../src/player.js');
// about jsmockito : https://github.com/cleishm/jsmockito

var People = require('../models/People');
var fight_ctrl = require('../controllers/fight_ctrl');
var Soldier = require('../models/roles/Soldier');
var Weapon = require('../models/weapons/Weapon');
var Defense = require('../models/defenses/Defense');


describe("weapon-evolution", function(){

    describe('Test string concatenation.',function() {
        var player1, player2;
        var count1, count2;
        beforeEach(function() {
            count1 = 0; count2 = 0;
            player1 = new People('张三', 10, 3);
            player1.fight = function() {
                count2++;
                return '张三出击\n';
            };
            player1.is_alive = function() {
                if(count1 == 2) {
                    return false;
                }
                return true
            };
            player2 = new People('李四', 10, 5);
            player2.fight = function() {
                count1++;
                return '李四出击\n';
            };
            player2.is_alive = function() {
                if(count2 == 4) {
                    return false;
                }
                return true;
            };
        });

        it('zhangsan should be dead.',function() {
            expect(fight_ctrl.fight_each_other(player1, player2))
                .toBe('张三出击\n'+
                        '李四出击\n'+
                        '张三出击\n'+
                        '李四出击\n'+
                        '张三被打败了.');
        });

        it('lisi should be dead.', function () {
            player1.is_alive = function() {
                if(count1 == 3) {
                    return false;
                }
                return true;
            };
            player2.is_alive = function() {
                if(count2 == 2) {
                    return false;
                }
                return true;
            };
            expect(fight_ctrl.fight_each_other(player1, player2))
                .toBe('张三出击\n'+
                        '李四出击\n'+
                        '张三出击\n'+
                        '李四被打败了.');
        });
    });

    describe('the method is_alive of people.',function() {

        it('When blood of people small than 1, people should be die.',function() {
            var people = new People('张三', 0, 3);
            var people2 = new People('李四', -1, 4);
            expect(people.is_alive()).toBe(false);
            expect(people2.is_alive()).toBe(false);
        });

        it('When blood of people more than 0, people should be alive.',function() {
            var people = new People('李四', 1, 2);
            expect(people.is_alive()).toBe(true);
        })
    });

    it('Should output details of the fighting.',function() {
        var soldier = new Soldier('张三', 10, 4,'战士',
            new Weapon('优质木棒',3),
            new Defense('盾牌',2));
        var ordinaryBeing = new People('李四', 10, 5,'普通人');
        expect(soldier.fight(ordinaryBeing))
            .toBe('战士张三用优质木棒攻击了普通人李四,李四受到了7点伤害,李四剩余生命:3\n');
        expect(ordinaryBeing.fight(soldier))
            .toBe('普通人李四攻击了战士张三,张三受到了3点伤害,张三剩余生命:7\n');
        expect(ordinaryBeing.blood).toBe(3);
        expect(soldier.blood).toBe(7);
    });
});
