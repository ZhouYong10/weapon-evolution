var m = require('jsmockito').JsMockito;
//var Player = require('../src/player.js');
// about jsmockito : https://github.com/cleishm/jsmockito

var OrdinaryBeing = require('../models/roles/OrdinaryBeing');
var fight_ctrl = require('../controllers/fight_ctrl');
var Soldier = require('../models/roles/Soldier');
var Weapon = require('../models/weapons/Weapon');
var Defense = require('../models/defenses/Defense');


describe("weapon-evolution", function(){
    describe('Test the fight_each_other.',function(){

        var zhangsan, lisi, count1, count2;
        beforeEach(function() {
            count1 = 0; count2 = 0;
            zhangsan = new OrdinaryBeing('张三', 10, 3);
            zhangsan.fight = function() {
                count2++;
                return '张三出击\n';
            };
            lisi = new OrdinaryBeing('李四', 10, 4);
            lisi.fight = function() {
                count1++;
                return '李四出击\n';
            };
        });

        it('The people should be die who first fight.',function(){
            zhangsan.is_alive = function() {
                return count1 < 2;
            };
            lisi.is_alive = function() {
                return count2 < 4;
            };
            expect(fight_ctrl.fight_each_other(zhangsan, lisi))
                .toBe('张三出击\n'+
                        '李四出击\n'+
                        '张三出击\n'+
                        '李四出击\n'+
                        '张三被打败了.');
        });

        it('The people should be die who second fight.',function() {
            zhangsan.is_alive = function() {
                return count1 < 3;
            };
            lisi.is_alive = function() {
                return count2 < 2;
            };
            expect(fight_ctrl.fight_each_other(zhangsan, lisi))
                .toBe('张三出击\n'+
                        '李四出击\n'+
                        '张三出击\n'+
                        '李四被打败了.');
        })
    });

    describe('Test the is_alive of people.',function(){
        it('When the blood of people less than 1,people should be die.',function(){
            var people1 = new OrdinaryBeing('张三', 0, 3);
            var people2 = new OrdinaryBeing('李四', -3, 3);
            expect(people1.is_alive()).toBe(false);
            expect(people2.is_alive()).toBe(false);
        });

        it('When the blood of people more than 0,people should not be die.',function(){
            var people = new OrdinaryBeing('王五', 3, 4);
            expect(people.is_alive()).toBe(true);
        });
    });

    describe('Test the fight of person.',function(){

        var soldier, ordinaryBeing;
        beforeEach(function() {
            soldier = new Soldier('张三', 10, 4);
            ordinaryBeing = new OrdinaryBeing('李四', 10, 3);
        });

        describe('Soldier fight ordinary being.',function(){
            it('Soldier have weapon.',function(){
                soldier.weapon = new Weapon('优质木棒', 3);
                expect(soldier.fight(ordinaryBeing))
                    .toBe('战士张三用优质木棒攻击了普通人李四,李四受到了7点伤害,李四剩余生命:3\n');
            });

            it('Soldier do not have weapon.',function(){
                expect(soldier.fight(ordinaryBeing))
                    .toBe('战士张三攻击了普通人李四,李四受到了4点伤害,李四剩余生命:6\n');
            });
        });

        describe('Ordinary being fight soldier.',function(){
            it('Soldier have defense.',function(){
                soldier.defense = new Defense('盾牌', 2);
                expect(ordinaryBeing.fight(soldier))
                    .toBe('普通人李四攻击了战士张三,张三受到了1点伤害,张三剩余生命:9\n');
            });

            it('Soldier do not have defense.',function(){
                expect(ordinaryBeing.fight(soldier))
                    .toBe('普通人李四攻击了战士张三,张三受到了3点伤害,张三剩余生命:7\n');
            });
        });

        describe('Soldier fight soldier.',function(){

            var soldier2;
            beforeEach(function() {
                soldier2 = new Soldier('李四', 10, 4);
            });

            it('Soldier have weapon and soldier2 have defense.',function(){
                soldier.weapon = new Weapon('优质木棒', 3);
                soldier2.defense = new Defense('盾牌', 2);
                expect(soldier.fight(soldier2))
                    .toBe('战士张三用优质木棒攻击了战士李四,李四受到了5点伤害,李四剩余生命:5\n');
            });

            it('Soldier have weapon and soldier2 do not have defense.',function(){
                soldier.weapon = new Weapon('优质木棒', 3);
                expect(soldier.fight(soldier2))
                    .toBe('战士张三用优质木棒攻击了战士李四,李四受到了7点伤害,李四剩余生命:3\n');
            });

            it('Soldier do not have weapon and soldier2 have defense.',function(){
                soldier2.defense = new Defense('盾牌', 2);
                expect(soldier.fight(soldier2))
                    .toBe('战士张三攻击了战士李四,李四受到了2点伤害,李四剩余生命:8\n');
            });

            it('Soldier do not have weapon and soldier2 do not have defense.',function(){
                expect(soldier.fight(soldier2))
                    .toBe('战士张三攻击了战士李四,李四受到了4点伤害,李四剩余生命:6\n');
            });
        });

        it('Ordinary being fight ordinary being.',function(){
            var ordinaryBeing2 = new OrdinaryBeing('张三', 10, 3);
            expect(ordinaryBeing.fight(ordinaryBeing2))
                .toBe('普通人李四攻击了普通人张三,张三受到了3点伤害,张三剩余生命:7\n');
        });
    });

});
