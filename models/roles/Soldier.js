/**
 * Created by zhouyong on 15-1-14.
 */
var People = require('../People');

function Soldier(name,blood,hurt,role,weapon,defense) {
    People.call(this,name,blood,hurt,role);
    this.weapon = weapon;
    this.defense = defense;
}

Soldier.prototype = Object.create(People.prototype);
Soldier.prototype.constructor = Soldier;

Soldier.prototype.out_hurt = function() {
    if(this.weapon) {
        return this.hurt + this.weapon.hurt;
    }
    return this.hurt;
};

Soldier.prototype.get_hurt = function(hurt) {
    var _hurt = this.defense?hurt - this.defense.value:hurt;
    return _hurt>0 ? _hurt : 0;
};

Soldier.prototype.reduce_blood = function(hurt) {
    this.blood -= this.get_hurt(hurt);
};

Soldier.prototype.output_fight_details = function(enemy) {
    return this.role + this.name + (this.weapon?'用'+this.weapon.name:'') + '攻击了' +
        enemy.role + enemy.name + ',' + enemy.name + '受到了' +
        enemy.get_hurt(this.out_hurt()) + '点伤害,' + enemy.name +
        '剩余生命:' + enemy.blood + '\n';
};

module.exports = Soldier;