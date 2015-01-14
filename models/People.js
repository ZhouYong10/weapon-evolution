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
    fight: function(people) {
        people.blood -= this.hurt;
    }
};

module.exports = People;
