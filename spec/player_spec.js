var m = require('jsmockito').JsMockito;
//var Player = require('../src/player.js');
// about jsmockito : https://github.com/cleishm/jsmockito

var People = require('../models/People');
var fight_ctrl = require('../controllers/fight_ctrl');

describe("weapon-evolution", function(){
    describe('people fight each other.',function() {

        describe('Test loop exit condition.',function() {
            var player1, player2;
            beforeEach(function() {
                player1 = new People('张三', 2, 3);
                player1.fight = function() {
                    return '';
                };
                player2 = new People('李四', 3, 5);
                player2.fight = function() {
                    return '';
                };
            });

            it('Test loop exit condition,zhangsan should be dead.',function() {
                player1.is_alive = function() {
                    return false;
                };
                player2.is_alive = function() {
                    return true;
                };
                expect(fight_ctrl.fight_each_other(player1, player2))
                    .toBe('张三被打败了.');
            });

            it('Test loop exit condition,lisi should be dead.',function() {
                player1.is_alive = function() {
                    return true;
                };
                player2.is_alive = function() {
                    return false;
                };
                expect(fight_ctrl.fight_each_other(player1, player2))
                    .toBe('李四被打败了.');
            });

        });

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

    it('the blood of who was fighted should be reduce.',function() {
        var zhangsan = new People('张三', 10, 4);
        var lisi = new People('李四', 20, 5);
        zhangsan.fight(lisi);
        expect(lisi.blood).toBe(16);
    });

    it('the method output_fight_details of people should be ' +
        'output details of fighting.',function() {
        var zhangsan = new People('张三', 10, 4);
        var lisi = new People('李四', 20, 5);
        zhangsan.fight(lisi);
        expect(zhangsan.output_fight_details(lisi))
            .toBe('张三攻击了李四,李四受到了4点伤害,李四剩余生命:16\n');
    })
});
