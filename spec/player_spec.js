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

    describe('Test the fight method of person.',function() {

        describe('Soldier fight ordinary being.',function() {

            it('Soldier have weapon.',function() {
                var soldier = new Soldier('张三', 10, 3, '战士');
                soldier.weapon = new Weapon('优质木棒', 2);
                var ordinaryBeing = new People('李四', 10, 2, '普通人');
                expect(soldier.fight(ordinaryBeing))
                    .toBe('战士张三用优质木棒攻击了普通人李四,李四受到了5点伤害,李四剩余生命:5\n');
            });

            it('Soldier do not have weapon.',function() {
                var soldier = new Soldier('张三', 10, 3, '战士');
                var ordinaryBeing = new People('李四', 10, 2, '普通人');
                expect(soldier.fight(ordinaryBeing))
                    .toBe('战士张三攻击了普通人李四,李四受到了3点伤害,李四剩余生命:7\n');
            });
       });

        describe('Ordinary being fight soldier.',function() {

            it('Soldier have defense.',function() {
                var soldier = new Soldier('张三', 10, 5, '战士');
                soldier.defense = new Defense('盾牌', 2);
                var ordinaryBeing = new People('李四', 10, 4, '普通人');
                expect(ordinaryBeing.fight(soldier))
                    .toBe('普通人李四攻击了战士张三,张三受到了2点伤害,张三剩余生命:8\n');
            });

            it('Soldier do not have defense.',function() {
                var soldier = new Soldier('张三', 10, 5, '战士');
                var ordinaryBeing = new People('李四', 10, 4, '普通人');
                expect(ordinaryBeing.fight(soldier))
                    .toBe('普通人李四攻击了战士张三,张三受到了4点伤害,张三剩余生命:6\n');
            });
        });

        describe('Soldier fight soldier.',function() {

            it('Soldier one have weapon and soldier two do not have defense.',function() {
                var soldierOne = new Soldier('张三', 10, 5, '战士');
                soldierOne.weapon = new Weapon('优质木棒', 3);
                var soldierTwo = new Soldier('李四', 10, 4, '战士');
                expect(soldierOne.fight(soldierTwo))
                    .toBe('战士张三用优质木棒攻击了战士李四,李四受到了8点伤害,李四剩余生命:2\n');
            });

            it('Soldier one have weapon and soldier two have defense.',function() {
                var soldierOne = new Soldier('张三', 10, 5, '战士');
                soldierOne.weapon = new Weapon('优质木棒', 3);
                var soldierTwo = new Soldier('李四', 10, 4, '战士');
                soldierTwo.defense = new Defense('盾牌', 2);
                expect(soldierOne.fight(soldierTwo))
                    .toBe('战士张三用优质木棒攻击了战士李四,李四受到了6点伤害,李四剩余生命:4\n');
            });

            it('Soldier one do not have weapon and soldier two do not have defense.',function() {
                var soldierOne = new Soldier('张三', 10, 5, '战士');
                var soldierTwo = new Soldier('李四', 10, 4, '战士');
                expect(soldierOne.fight(soldierTwo))
                    .toBe('战士张三攻击了战士李四,李四受到了5点伤害,李四剩余生命:5\n');
            });

            it('Soldier one do not have weapon and soldier two have defense.',function() {
                var soldierOne = new Soldier('张三', 10, 5, '战士');
                var soldierTwo = new Soldier('李四', 10, 4, '战士');
                soldierTwo.defense = new Defense('盾牌', 2);
                expect(soldierOne.fight(soldierTwo))
                    .toBe('战士张三攻击了战士李四,李四受到了3点伤害,李四剩余生命:7\n');
            });
        });

        it('Ordinary being fight ordinary being.',function() {
            var ordinary1 = new People('张三', 10, 3, '普通人');
            var ordinary2 = new People('李四', 10, 2, '普通人');
            expect(ordinary1.fight(ordinary2))
                .toBe('普通人张三攻击了普通人李四,李四受到了3点伤害,李四剩余生命:7\n'); });
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
