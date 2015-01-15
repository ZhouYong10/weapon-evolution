/**
 * Created by zhouyong on 15-1-13.
 */
function People(name,blood,hurt,role) {
    this.name = name;
    this.blood = blood;
    this.hurt = hurt;
    this.role = role;
}

People.prototype = {
    is_alive: function() {
        if(this.blood <= 0) {
            return false;
        }
        return true;
    },
    fight: function(enemy) {
        enemy.reduce_blood(this.out_hurt());
        return this.output_fight_details(enemy)
    },
    output_fight_details: function(enemy) {
        return this.role + this.name + this.fight_say() + enemy.role + enemy.name + ',' +
            enemy.name + '受到了' + enemy.get_hurt(this.out_hurt()) + '点伤害,' +
            enemy.name + '剩余生命:' + enemy.blood + '\n';
    },
    fight_say: function() {
      return '攻击了';
    },
    out_hurt: function() {
      return this.hurt;
    },
    get_hurt: function(hurt) {
      return hurt;
    },
    reduce_blood: function(hurt) {
        this.blood -= hurt;
    }
};

module.exports = People;
