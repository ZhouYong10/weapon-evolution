/**
 * Created by zhouyong on 15-1-15.
 */
function People(name,blood,hurtPoint){
    this.name = name;
    this.blood = blood;
    this.hurtPoint = hurtPoint;
}
People.role = '普通人';

People.prototype = {
    getRole: function() {
       return People.role;
    },
    is_alive: function() {
        return this.blood > 0;
    },
    be_injured: function(attackPoint) {
        this.damagePoint = attackPoint;
        this.blood -= attackPoint;
    },
    fight: function(enemy) {
        enemy.be_injured(this.attack_point());
        return this.fight_info(enemy);
    },
    fight_info: function(enemy) {
      return this.getRole() + this.name + this.attacked() + enemy.getRole() +
          enemy.name + ',' + enemy.name + '受到了' + enemy.damagePoint + '点伤害,' +
          enemy.name + '剩余生命:' + enemy.blood + '\n';
    },
    dead: function() {
        return this.name + '被打败了.';
    },
    attacked: function() {
        return '攻击了';
    },
    attack_point: function() {
        return this.hurtPoint;
    }
};

module.exports = People;