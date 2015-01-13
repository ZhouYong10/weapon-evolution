/**
 * Created by zhouyong on 15-1-13.
 */
module.exports = {
    fight_each_other: function(player1,player2) {
        var result = this.all_alive(player1, player2);
        while(result == 'allAlive') {
            player1.fight(player2);
            player2.fight(player1);
            result = this.all_alive(player1, player2);
        }
        return result;
    },
    all_alive: function() {
        for(var key in arguments) {
            var player = arguments[key];
            var result = player.is_alive();
            if(result != 'alive'){
                return result;
            }
        }
        return 'allAlive';
    }
};