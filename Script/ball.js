const c = cc.tween;

cc.Class({
    extends: cc.Component,

    properties: {

        speedMax: 400,
        speedSub: 30,
    },

    // LIFE-CYCLE CALLBACKS:

    //onLoad () {},

    start () {
        //对事件“hit”进行监听
        this.node.on("hit", this.onHit, this);
        this._sleep = true;
        this._moving = false; 
        // this.array = [[this.node.position, this._direction, cc.v2(-355, 150), cc.v2(355, 150)],
        //              [this.node.position, this._direction, cc.v2(-355, -150), cc.v2(355, -150)],
        //              [this.node.position, this._direction, cc.v2(-355, 150), cc.v2(-355, -150)],
        //              [this.node.position, this._direction, cc.v2(355, 150), cc.v2(355, -150)]];

    },

    onHit (event) {
        this._sleep = false;
        

        //获取派送的鼠标位置，并计算目标位置
        var direction = this.node.parent.convertToNodeSpaceAR(event.hitPosition);
        direction = direction.sub(this.node.position);
        cc.log("————目标坐标x:" + direction.x + " y:" + direction.y);
        //将目标位置归一化
        this._direction = direction.normalize();
        this._moving = !this._moving;
        this.speed = this.speedMax;
        // c(this.node)
        //     .by(5, {position: this._direction.mul(this.speed)})
        //     .start()
    },

    onTouchTop () {
        if (this.node.position.y < 150)
            return;
        this._direction.y = -this._direction.y;
        // c(this.node)
        //     .by(5, {position: this._direction.mul(this.speed)})
        //     .start()
    },

    onTouchBottom () {
        if (this.node.position.y > -150)
            return;
        this._direction.y = -this._direction.y;
        // c(this.node)
        //     .by(5, {position: this._direction.mul(this.speed)})
        //     .start()
    },

    onTouchRight () {
        if (this.node.position.x < 355)
            return;
        this._direction.x = -this._direction.x;
        // c(this.node)
        //     .by(5, {position: this._direction.mul(this.speed)})
        //     .start()
    },

    onTouchLeft () {
        if (this.node.position.x > -355)
            return;
        this._direction.x = -this._direction.x;
        // c(this.node)
        //     .by(5, {position: this._direction.mul(this.speed)})
        //     .start()
    },

    update (dt) {

        //每一帧移动距离会过大
        // if (this.speed >= 0) {
        //     this.speed -= 5;
        // }
        // if (this.speed < 0) this._moving = false;
        // if (this._moving) {
        //     this.node.setPosition(this.node.position.add(this._direction.mul(this.speed * dt)));
        //     //当触碰上下边界时对y坐标取反
        //     if (this.node.position.y > 150) {
        //         this.onTouchTop();
        //     }
        //     //当触碰左右边界时对x坐标取反
        //     if (this.node.position.x > 355) {
        //         this.onTouchRight();
        //     }
        //     if (this.node.position.y < -150) {
        //         this.onTouchBottom();
        //     }
        //     if (this.node.position.x < -355) {
        //         this.onTouchLeft();
        //     }
        // }

        // if (this._moving) {
        //     var t = dt;
        //     // while (t > 0 && this.speed > 0) {
            
        //         //首先分别判断运动方向与哪一条边界相交
        //         //是否与上边界相交
        //         if (cc.Intersection.lineLine(this.node.position, this._direction.mul(1000), cc.v2(355, 150), cc.v2(-355, 150))) {
        //             //上边界纵坐标固定为150，根据纵坐标计算相交位置
        //             let s = Math.abs(150 - this.node.position.y) * Math.abs(this._direction.x / this._direction.y);
        //             let tt = s / (this._direction.mag() * this.speed);
        //             cc.log("移动距离:" + s + "移动时间:" + tt);
        //             if (tt >= dt) {
        //                 this.node.setPosition(this.node.position.add(this._direction.mul(this.speed * dt)));
        //                 if (this.node.position.y > 150) {
        //                     this.onTouchTop();
        //                 }
        //             }
        //             while (tt > 0) {
        //                 t = t - tt;
        //                 this.node.setPosition(this.node.position.add(this._direction.mul(this.speed * tt)));
        //                 if (this.node.position.y > 150) {
        //                     this.onTouchTop();
        //                     break;
        //                 }
        //             }
                    
        //         }
        //         //是否与下边界相交
        //         if (cc.Intersection.lineLine(this.node.position, this._direction.mul(1000), cc.v2(-355, -150), cc.v2(355, -150))) {
        //             let s = Math.abs(-150 - this.node.position.y) * Math.abs(this._direction.x / this._direction.y);
        //             let tt = s / (this._direction.mag() * this.speed);
        //             if (tt >= dt) {
        //                 this.node.setPosition(this.node.position.add(this._direction.mul(this.speed * dt)));
        //                 if (this.node.position.y < -150) {
        //                     this.onTouchBottom();
        //                 }
        //             }
        //             while (t > 0) {
        //                 t = t - tt;
        //                 this.node.setPosition(this.node.position.add(this._direction.mul(this.speed * tt)));
        //                 if (this.node.position.y < -150) {
        //                     this.onTouchBottom();
        //                     break;
        //                 }
        //             }
                    
        //         }
        //         //是否与左边界相交
        //         if (cc.Intersection.lineLine(this.node.position, this._direction.mul(10000), cc.v2(-355, 150), cc.v2(-355, -150))){
        //             let s = Math.abs(-355 - this.node.position.x) * Math.abs(this._direction.y / this._direction.x);
        //             let tt = s / (this._direction.mag() * this.speed);
        //             if (tt >= dt) {
        //                 this.node.setPosition(this.node.position.add(this._direction.mul(this.speed * dt)));
        //                 if (this.node.position.x < -355) {
        //                     this.onTouchLeft();
        //                 }
        //             }
        //             while (t > 0) {
        //                 t = t - tt;
        //                 this.node.setPosition(this.node.position.add(this._direction.mul(this.speed * tt)));
        //                 if (this.node.position.x < -355) {
        //                     this.onTouchLeft();
        //                     break;
        //                 }
        //             }
                    
        //         }
        //         //是否与右边界相交
        //         if (cc.Intersection.lineLine(this.node.position, this._direction.mul(1000), cc.v2(355, 150), cc.v2(355, -150))) {
        //             let s = Math.abs(355 - this.node.position.x) * Math.abs(this._direction.y / this._direction.x);
        //             let tt = s / (this._direction.mag() * this.speed);
        //             if (tt >= dt) {
        //                 this.node.setPosition(this.node.position.add(this._direction.mul(this.speed * dt)));
        //                 if (this.node.position.x > 355) {
        //                     this.onTouchRight();
        //                 }
        //             }
        //             while (t > o){
        //                 t = t - tt;
        //                 this.node.setPosition(this.node.position.add(this._direction.mul(this.speed * tt)));
        //                 if (this.node.position.x > 355) {
        //                     this.onTouchRight();
        //                     break;
        //                 }
        //             }
        //         }
        //     // }
            
        //     if (this.speed >= 0) {
        //         this.speed -= 5;
        //     }
        // }





        cc.log("小球当前位置x：" + this.node.position.x + "  y：" + this.node.position.y);
        var sy = this.node.position.y;
        var sx = this.node.position.x;
        // if (this.speed <= 0) this._moving = false;
        if (this._moving) {
            //记录下dt时间
            var t = dt;
            while (t > 0) {
                
                //是否与上边界相交
                if (cc.Intersection.lineLine(this.node.position, this._direction.mul(20000), cc.v2(-360, 155), cc.v2(360, 155)) && this.node.position.y < 155){
                    //先通过当前位置到上边界的距离，再算出到达边界需要的总时间
                    let st = Math.abs((150 - sy) / (this._direction.y * this.speed));
                    //如果总时间大于等于dt，那么按照dt时长运动，update每次调用时dt时长，并退出循环
                    if (st >= dt) {
                        let preLoc = this.node.position.add(this._direction.mul(this.speed * dt));
                        if (preLoc.y > 150) preLoc.y = 300 - preLoc.y;
                        this.node.setPosition(preLoc); 
                        if (this.node.position.y >= 150) {
                            this.onTouchTop();
                        }
                        break;
                    } else if (st == 0) {
                        this.onTouchTop();
                        continue;
                    }
                    //若小于dt，则
                    else {
                        //将小球运动到边界位置，并改变小球方向
                        let preLoc = this.node.position.add(this._direction.mul(this.speed * st));
                        if (preLoc.y > 150) preLoc.y = 300 - preLoc.y;
                        this.node.setPosition(preLoc);
                        t = t - st;
                        if (this.node.position.y >= 150) {
                            this.onTouchTop();
                            break;
                        }
                        //继续循环
                        continue;
                    }
                } else
                //是否与下边界相交
                if (cc.Intersection.lineLine(this.node.position, this._direction.mul(20000), cc.v2(-360, -155), cc.v2(360, -155)) && this.node.position.y > -155) {
                    //先通过当前位置到上边界的距离，再算出到达边界需要的总时间
                    let st = Math.abs((-150 - sy) / (this._direction.y * this.speed));
                    //如果总时间大于等于dt，那么按照dt时长运动，update每次调用时dt时长，并退出循环
                    if (st >= dt) {
                        let preLoc = this.node.position.add(this._direction.mul(this.speed * dt));
                        if (preLoc.y < -150) preLoc.y = -300 - preLoc.y;
                        this.node.setPosition(preLoc); 
                        if (this.node.position.y <= -150) {
                            this.onTouchBottom();
                        }
                        break;
                    } else if (st == 0) {
                        this.onTouchBottom();
                        continue;
                    }
                    //若小于dt，则
                    else {
                        //将小球运动到边界位置，并改变小球方向
                        let preLoc = this.node.position.add(this._direction.mul(this.speed * st));
                        if (preLoc.y < -150) preLoc.y = -300 - preLoc.y;
                        this.node.setPosition(preLoc);
                        t = t - st;
                        if (this.node.position.y <= -150) {
                            this.onTouchBottom();
                            break;
                        }
                        //继续循环
                        continue;
                    } 
                } else
                //是否与左边界相交
                if (cc.Intersection.lineLine(this.node.position, this._direction.mul(20000), cc.v2(-360, 155), cc.v2(-360, -155))) {
                    //先通过当前位置到上边界的距离，再算出到达边界需要的总时间
                    if (this.node.position.x < -360) {
                        this.onTouchLeft();
                        continue;
                    }
                    let st = Math.abs((-355 - sx) / (this._direction.x * this.speed));
                    //如果总时间大于等于dt，那么按照dt时长运动，update每次调用时dt时长，并退出循环
                    if (st >= dt) {
                        let preLoc = this.node.position.add(this._direction.mul(this.speed * dt));
                        if (preLoc.x < -355) preLoc.x = -710 - preLoc.x;
                        this.node.setPosition(preLoc); 
                        if (this.node.position.x <= -355) {
                            this.onTouchLeft();
                            this.speed -= this.speedSub;
                        }
                        break;
                    } else if (st == 0) {
                        this.onTouchLeft();
                    }
                    //若小于dt，则
                    else {
                        //将小球运动到边界位置，并改变小球方向
                        let preLoc = this.node.position.add(this._direction.mul(this.speed * st));
                        if (preLoc < -355) preLoc.x = -710 - preLoc.x;
                        this.node.setPosition(preLoc);
                        t = t - st;
                        if (this.node.position.x <= -355) {
                            this.onTouchLeft();
                            break;
                        }
                        //继续循环
                        continue;
                    }
                } else
                //是否与右边界相交
                if (cc.Intersection.lineLine(this.node.position, this._direction.mul(20000), cc.v2(360, 155), cc.v2(360, -155))) {
                    //先通过当前位置到上边界的距离，再算出到达边界需要的总时间
                    let st = Math.abs((355 - sx) / (this._direction.x * this.speed));
                    //如果总时间大于等于dt，那么按照dt时长运动，update每次调用时dt时长，并退出循环
                    if (st >= dt) {
                        let preLoc = this.node.position.add(this._direction.mul(this.speed * dt));
                        if (preLoc.x > 355) preLoc.x = 710 - preLoc.x;
                        this.node.setPosition(preLoc); 
                        if (this.node.position.x >= 355) {
                            this.onTouchRight()
                        }
                        break;
                    } else if (st == 0) {
                        this.onTouchRight();
                        continue;
                    }
                    //若小于dt，则
                    else {
                        //将小球运动到边界位置，并改变小球方向
                        let preLoc = this.node.position.add(this._direction.mul(this.speed * st));
                        if (preLoc.x > 355) preLoc.x = 710 - preLoc.x;
                        this.node.setPosition(preLoc);
                        t = t - st;
                        if (this.node.position.x >= 355) {
                            this.onTouchRight();
                            break;
                        }
                        //继续循环
                        continue;
                    } 
                } else this.node.setPosition(0, 0);
            }
        }



        // var sx = this.node.position.x;
        // var sy = this.node.position.y;
        // if (this._moving) {
        //     var t = dt;
            
        //     if (this._direction.y > 0) {
        //         let st = Math.abs((150 - sy) / (this._direction.y * this.speed));
        //         if (st > dt) {
        //             this.node.setPosition(this.node.position.x, this._direction.y * this.speed * dt);
        //         } else if (st <= dt) {
        //             let realY = this.node.position.y + this._direction.y * this.speed * dt;
        //             while (realY > -150 && realY < 150) {
        //                 if (realY > 150) realY = 300 - realY;
        //                 else if (realY < -150) realY = -300 - realY;
        //             }
        //             this.node.setPosition(this.node.position.x, realY);
        //         }
        //     } else
        //     if (this._direction.y < 0) {
        //         let st = Math.abs((-150 - sy) / (this._direction.y * this.speed));
        //         if (st > dt) {
        //             this.node.setPosition(this.node.position.x, this._direction.y * this.speed * dt);
        //         } else if (st <= dt) {
        //             let realY = this.node.position.y + this._direction.y * this.speed * dt;
        //             while (realY > -150 && realY < 150) {
        //                 if (realY > 150) realY = 300 - realY;
        //                 else if (realY < -150) realY = -300 - realY;
        //             }
        //             this.node.setPosition(this.node.position.x, realY);
        //         } 
        //     }
        //     if (this._direction.x > 0) {
        //         let st = Math.abs((355 - sx) / (this._direction.x * this.speed));
        //         if (st > dt) {
        //             this.node.setPosition(this._direction.x * this.speed * dt, this.node.position.y);;
        //         } else if (st <= dt) {
        //             let realX = this.node.position.x + this._direction.x * this.speed * dt;
        //             while (realX > -150 && realX < 150) {
        //                 if (realX > 150) realX = 300 - realX;
        //                 else if (realX < -150) realX = -300 - realX;
        //             }
        //             this.node.setPosition(realX, this.node.position.y);
        //         } 
        //     } else
        //     if (this._direction.x < 0) {
        //         let st = Math.abs((-355 - sx) / (this._direction.x * this.speed));
        //         if (st > dt) {
        //             this.node.setPosition(this._direction.x * this.speed * dt, this.node.position.y); 
        //         } else if (st <= dt) {
        //             let realX = this.node.position.x + this._direction.x * this.speed * dt;
        //             while (realX > -150 && realX < 150) {
        //                 if (realX > 150) realX = 300 - realX;
        //                 else if (realX < -150) realX = -300 - realX;
        //             }
        //             this.node.setPosition(realX, this.node.position.y);
        //         } 
        //     }
        // }
    },
    
});
