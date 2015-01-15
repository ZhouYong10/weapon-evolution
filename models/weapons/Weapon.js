/**
 * Created by zhouyong on 15-1-14.
 */

function Weapon(name,hurt) {
    this.name = name;
    this.hurt = hurt;
}

Weapon.prototype = {
    say: function() {
        return '用' + this.name;
    }
};

Weapon.noWeapon = {
    hurt: 0,
    say: function() {
        return '';
    }
};

module.exports = Weapon;