/**
 * Created by zhouyong on 15-1-15.
 */
function Defense(name,defencePoint){
    this.name = name;
    this.defencePoint = defencePoint;
}

Defense.nullDefense = {
    defencePoint: 0
};

module.exports = Defense;