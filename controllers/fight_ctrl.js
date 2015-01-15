/**
 * Created by zhouyong on 15-1-15.
 */
module.exports = {
    fight_each_other: function(player1,player2) {
        var message = '';
        while(true) {
            if(!player1.is_alive()) {
                message += player1.dead();
                break;
            }
            message += player1.fight(player2);
            if(!player2.is_alive()) {
                message += player2.dead();
                break;
            }
            message += player2.fight(player1);
        }
        return message;
    }
};