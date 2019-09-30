// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.Canvas.instance.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        cc.Canvas.instance.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        cc.Canvas.instance.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
        cc.Canvas.instance.node.on("bB-sleep", this.onbBSleep, this);
    },

    onMouseDown (event) {
        //当鼠标按下时设置为true
        this._mouseDown = true;

        //获取当前鼠标的位置，再将其转换为父坐标
        var loc = event.getLocation();
        this._mousePosition = loc;
        loc = this.node.parent.convertToNodeSpaceAR(loc);
        //计算出按下坐标与（1， 0）的角度
        this.angle = loc.signAngle(cc.v2(-1, 0));
        
    },

    onMouseUp (event) {
        //当前鼠标抬起，将按下设置为false
        this._mouseDown = false;

        //创建自定义事件“hit”
        var customEvent = new cc.Event.EventCustom("hit", true);
        customEvent.angle = this.angle;
        customEvent.hitPosition = this._mousePosition;
        //派送事件
        this.node.dispatchEvent(customEvent);
    },

    // update (dt) {},
});
