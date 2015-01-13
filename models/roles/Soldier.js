/**
 * Created by zhouyong on 15-1-13.
 */
function Soldier(people,job,weapon,defense) {
    this.people = people;
    this.job = job;
    this.weapon = weapon;
    this.defense = defense;
}

Soldier.prototype = {
    fight: function(people) {
        var hurt_blood = people.reduce_blood(this.hurt());
        return this.job + this.people.name + '用' + this.weapon.name +
            '攻击了' + people.job + people.people.name + ',' +
            people.people.name + '受到了' + hurt_blood + '点伤害,' +
            people.people.name + '剩余生命：' + people.people.blood + '\n';
    },
    reduce_blood:function(hurt) {
        var blood = this.people.blood;
        this.people.blood -= (hurt - this.defense.defense)>0?(hurt - this.defense.defense):0;
        return blood - this.people.blood;
    },
    hurt: function() {
        return (this.people.hurt + this.weapon.hurt);
    }
};

module.exports = Soldier;