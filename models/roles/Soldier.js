/**
 * Created by zhouyong on 15-1-14.
 */
var People = require('../People');
var Weapon = require('../weapons/Weapon');
var Defense = require('../defenses/Defense');

function Soldier(name,blood,hurt,role,weapon,defense) {
    People.call(this,name,blood,hurt,role);
    this.weapon = weapon?weapon:Weapon.noWeapon;
    this.defense = defense?defense:Defense.noDefense;
}

Soldier.prototype = Object.create(People.prototype);
Soldier.prototype.constructor = Soldier;

Soldier.prototype.out_hurt = function() {
    return this.hurt + this.weapon.hurt;
};

Soldier.prototype.get_hurt = function(hurt) {
    var _hurt = hurt - this.defense.value;
    return _hurt>0 ? _hurt : 0;
};

Soldier.prototype.reduce_blood = function(hurt) {
    this.blood -= this.get_hurt(hurt);
};

Soldier.prototype.fight_say = function() {
    return this.weapon.say() + '攻击了';
};

module.exports = Soldier;