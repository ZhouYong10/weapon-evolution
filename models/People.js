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
    },
    is_alive: function() {
        if(this.blood > 0) {
            return 'alive';
        }
        return this.name + '被打败了.';
    }
};

module.exports = People;
