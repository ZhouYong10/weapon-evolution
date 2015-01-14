/**
 * Created by zhouyong on 15-1-13.
 */
function People(name,blood,hurt) {
    this.name = name;
    this.blood = blood;
    this.hurt = hurt;
}

People.prototype = {
    is_alive: function() {
        if(this.blood <= 0) {
            return false;
        }
        return true;
    },
    fight: function(enemy) {
        enemy.blood -= this.hurt;
        return this.output_fight_details(enemy)
    },
    output_fight_details: function(enemy) {
        return this.name + '攻击了' + enemy.name + ',' +
            enemy.name + '受到了' + this.hurt + '点伤害,' +
            enemy.name + '剩余生命:' + enemy.blood + '\n';
    }
};

module.exports = People;
