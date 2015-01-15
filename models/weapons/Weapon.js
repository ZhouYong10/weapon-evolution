/**
 * Created by zhouyong on 15-1-15.
 */

function Weapon(name,hurtPoint){
    this.name = name;
    this.hurtPoint = hurtPoint;
}

Weapon.prototype = {
    info: function() {
        return '用' + this.name;
    }
};

Weapon.nullWeapon = {
    hurtPoint: 0,
    info: function() {
        return '';
    }
};

module.exports = Weapon;