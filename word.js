var Event = (function(){
    var list = {},
        listen,
        trigger,
        remove;
        listen = function(key,fn){
            if(!list[key]) {
                list[key] = [];
            }
            list[key].push(fn);
        };
        trigger = function(){
            var key = Array.prototype.shift.call(arguments),
                 fns = list[key];
            if(!fns || fns.length === 0) {
                return false;
            }
            for(var i = 0, fn; fn = fns[i++];) {
                fn.apply(this,arguments);
            }
        };
        remove = function(key,fn){
            var fns = list[key];
            if(!fns) {
                return false;
            }
            if(!fn) {
                fns && (fns.length = 0);
            }else {
                for(var i = fns.length - 1; i >= 0; i--){
                    var _fn = fns[i];
                    if(_fn === fn) {
                        fns.splice(i,1);
                    }
                }
            }
        };
        return {
            listen: listen,
            trigger: trigger,
            remove: remove
        }
})();
var wordObj = []
function Barrage(canvas, ctx, data) {
    this.width = canvas.width
    this.height = canvas.height
    this.ctx = ctx
    this.color = data.color || '#'+Math.floor(Math.random()*16777215).toString(16) //随机颜色
    this.value = data.value
    this.x = this.width //x坐标
    this.y = Math.random() * this.height
    this.speed = Math.random() + 0.2
    this.fontSize = Math.random() * 10 + 12
}
Barrage.prototype.draw = function() {
    if(this.x < -200) {
        return
    } else {
        this.ctx.font = this.fontSize + 'px "microsoft yahei", sans-serif';
        this.ctx.fillStyle = this.color
        this.x = this.x - this.speed
        this.ctx.fillText(this.value, this.x, this.y)
    }
}