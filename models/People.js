/**
 * Created by zhouyong on 15-1-13.
 */
function People(name,blood,hurt) {
    this.name = name;
    this.blood = blood;
    this.hurt = hurt;
}

People.prototype = {
    fight: function(people) {
        people.blood -= this.hurt;
        return this.name + '攻击了' + people.name + ',' +
                people.name + '受到了' + this.hurt + '点伤害,' +
                people.name + '剩余生命：' + people.blood + '\n';
    },
    is_alive: function() {
        if(this.blood > 0) {
            return 'alive';
        }
        return this.name + '被打败了.';
    }
};

module.exports = People;
