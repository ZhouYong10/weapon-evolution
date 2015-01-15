/**
 * Created by zhouyong on 15-1-15.
 */
var OrdinaryBeing = require('./OrdinaryBeing');
var Weapon = require('../weapons/Weapon');
var Defense = require('../defenses/Defense');

function Soldier(name,blood,hurtPoint,weapon,defense){
    OrdinaryBeing.call(this, name, blood, hurtPoint);
    this.weapon = weapon ? weapon : Weapon.nullWeapon;
    this.defense = defense ? defense : Defense.nullDefense;
}
Soldier.prototype = Object.create(OrdinaryBeing.prototype);
Soldier.prototype.constructor = Soldier;

Soldier.role = '战士';

Soldier.prototype.getRole = function(){
    return Soldier.role;
};

Soldier.prototype.attacked = function(){
    return this.weapon.info() + '攻击了';
};

Soldier.prototype.be_injured = function(attackPoint){
    var injury = attackPoint - this.defense.defencePoint;
    this.damagePoint = injury > 0 ? injury : 0;
    this.blood -= this.damagePoint;
};

Soldier.prototype.attack_point = function(){
    return this.hurtPoint + this.weapon.hurtPoint;
};

module.exports = Soldier;