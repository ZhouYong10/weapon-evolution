/**
 * Created by zhouyong on 15-1-13.
 */
module.exports = {
    fight_each_other: function(player1,player2) {
        while(true) {
            if(!player1.is_alive()){
                return player1.name + '被打败了.';
            }
            player1.fight(player2);
            if(!player2.is_alive()) {
                return player2.name + '被打败了.';
            }
            player2.fight(player1);
        }
    }
};