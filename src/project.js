require=function t(e,i,n){function o(a,r){if(!i[a]){if(!e[a]){var s="function"==typeof require&&require;if(!r&&s)return s(a,!0);if(c)return c(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var h=i[a]={exports:{}};e[a][0].call(h.exports,function(t){var i=e[a][1][t];return o(i?i:t)},h,h.exports,t,e,i,n)}return i[a].exports}for(var c="function"==typeof require&&require,a=0;a<n.length;a++)o(n[a]);return o}({MapCreater:[function(t,e,i){cc._RFpush(e,"280c3rsZJJKnZ9RqbALVwtK","MapCreater");var n=t("MapPaneEnum");cc.Class({"extends":cc.Component,properties:{row:{"default":6,range:[1,6]},column:{"default":10,range:[1,10]},playerPosition:{"default":null,type:cc.Vec2},wallsPosition:{"default":[],type:cc.Vec2},boxesPosition:{"default":[],type:cc.Vec2},targetsPosition:{"default":[],type:cc.Vec2},floorSprite:{"default":null,type:cc.Prefab},wallSprite:{"default":null,type:cc.Prefab},boxSprite:{"default":null,type:cc.Prefab},targetSprite:{"default":null,type:cc.Prefab},victoryPanel:{"default":null,type:cc.Prefab},playerLeft:{"default":null,type:cc.SpriteFrame},playerUp:{"default":null,type:cc.SpriteFrame},playerRight:{"default":null,type:cc.SpriteFrame},playerDown:{"default":null,type:cc.SpriteFrame},map:{"default":null,visible:!1},player:{"default":null,type:cc.Node,visible:!1},pane:{"default":null,type:cc.Size,visible:!1},moving:{"default":!1,visible:!1},targetNumber:{"default":0,visible:!1},victoryPanelObject:{"default":null,type:cc.Node,visible:!1}},onLoad:function(){this.victoryPanelObject=this.node;var t=cc.find("Canvas/VictoryPanel");t&&(t.removeFromParent(!0),t.destroy(),t=null),this.targetNumber=0,this.map=[],this.player=new cc.Node,this.pane=new cc.Size(96,96),this.row=Math.floor(this.row),this.column=Math.floor(this.column),this.node.setContentSize(this.column*this.pane.width,this.row*this.pane.height),this.playerPosition.x=Math.floor(this.playerPosition.x),this.playerPosition.y=Math.floor(this.playerPosition.y);for(var e=0;e<this.column;++e){this.map[e]=[];for(var i=0;i<this.row;++i)this.map[e][i]=cc.p(n.Floor,-1)}this.init([this.playerPosition],n.Player),this.init(this.wallsPosition,n.Wall),this.init(this.boxesPosition,n.Box),this.init(this.targetsPosition,n.Target,!0),this.map.forEach(function(t,e){t.forEach(function(t,i){var o,c=this.getPostion(e,i);t.x===n.Floor?o=cc.instantiate(this.floorSprite):t.x===n.Target&&(o=cc.instantiate(this.targetSprite)),o&&(o.parent=this.node,o.position=c)}.bind(this))}.bind(this)),this.map.forEach(function(t,e){t.forEach(function(t,i){var o,c=this.getPostion(e,i);if(t.y===n.Player){var a=this.player.addComponent(cc.Sprite);a.spriteFrame=this.playerRight,o=this.player}else t.y===n.Wall?o=cc.instantiate(this.wallSprite):t.y===n.Box&&(o=cc.instantiate(this.boxSprite));o&&(o.parent=this.node,o.position=c,o.tag=this.composeTag(cc.p(e,i)),console.log(o.tag))}.bind(this))}.bind(this))},update:function(t){},restart:function(){cc.director.loadScene("helloworld")},init:function(t,e,i){for(var o in t){var c=Math.floor(t[o].x),a=Math.floor(t[o].y);0>c||c>=this.column||0>a||a>=this.row?delete t[o]:(i?this.map[c][a]=cc.p(e,-1):this.map[c][a].y=e,e==n.Target&&++this.targetNumber)}},getPostion:function(t,e){void 0===e&&(e=t.y,t=t.x);var i=cc.p(-this.node.width/2,this.node.height/2);return cc.p(i.x+this.pane.width*(t+.5),i.y-this.pane.height*(e+.5))},composeTag:function(t){var e=t.x,i=t.y;return e*this.column+i},onUp:function(){this.checkMove(this.playerLeft,cc.Vec2.UP.mulSelf(-1))},onDown:function(){this.checkMove(this.playerRight,cc.Vec2.UP)},onLeft:function(){this.checkMove(this.playerLeft,cc.Vec2.RIGHT.mulSelf(-1))},onRight:function(){this.checkMove(this.playerRight,cc.Vec2.RIGHT)},checkMove:function(t,e){if(!this.moving){this.player.getComponent(cc.Sprite).spriteFrame=t;var i=this.playerPosition.add(e);this.onMove(i,i.add(e)),this.onMove(this.playerPosition,i)&&(this.moving=!0,this.playerPosition=i)}},onMove:function(t,e){if(!this.containPane(t)||!this.containPane(e))return!1;var i=this.map[t.x][t.y],o=this.map[e.x][e.y];if(i.y!==n.Player&&i.y!==n.Box)return!1;if(o.y!==n.Invalid)return!1;console.log(t+" "+e);var c=this.composeTag(t),a=this.node.getChildByTag(c);if(!a)return!1;var r=cc.sequence(cc.moveTo(.5,this.getPostion(e)),cc.callFunc(function(){this.moving=!1}.bind(this)));if(a.tag=this.composeTag(e),i.x===n.Target&&i.y===n.Box&&++this.targetNumber,o.y=i.y,i.y=n.Invalid,o.x===n.Target&&o.y===n.Box&&(--this.targetNumber,0===this.targetNumber)){var s=cc.instantiate(this.victoryPanel);s.parent=cc.director.getScene(),s.opacity=0,r=cc.sequence(r,cc.callFunc(function(){s.getComponent(cc.Animation).play("fadeIn")}.bind(this)))}return a.runAction(r),!0},containPane:function(t){return t.x>=0&&t.x<this.column&&t.y>=0&&t.y<this.row}}),cc._RFpop()},{MapPaneEnum:"MapPaneEnum"}],MapPaneEnum:[function(t,e,i){cc._RFpush(e,"0ac01Lj4uVPlYbW6mQjqo6B","MapPaneEnum"),e.exports={Invalid:-1,Player:0,Floor:1,Wall:2,Box:3,Target:4},cc._RFpop()},{}],PressDownScale:[function(t,e,i){cc._RFpush(e,"cf428ZWmAZC/YhaifgAcaCG","PressDownScale"),cc.Class({"extends":cc.Component,properties:{pressedScale:1,transDuration:0},onLoad:function(){function t(t){this.stopAllActions(),this.runAction(i.scaleDownAction)}function e(t){this.stopAllActions(),this.runAction(i.scaleUpAction)}var i=this;i.initScale=this.node.scale,i.button=i.getComponent(cc.Button),i.scaleDownAction=cc.scaleTo(i.transDuration,i.pressedScale),i.scaleUpAction=cc.scaleTo(i.transDuration,i.initScale),this.node.on("touchstart",t,this.node),this.node.on("touchend",e,this.node),this.node.on("touchcancel",e,this.node)}}),cc._RFpop()},{}],VictoryPanel:[function(t,e,i){cc._RFpush(e,"fa118V7biFBeoKgCUDt7Z8b","VictoryPanel"),cc.Class({"extends":cc.Component,properties:{},onLoad:function(){this.node.on("touchstart",function(t){this.opacity>0&&t.stopPropagation()}),this.node.on("touchmove",function(t){this.opacity>0&&t.stopPropagation()}),this.node.on("touchend",function(t){this.opacity>0&&t.stopPropagation()}),this.node.on("touchcancel",function(t){this.opacity>0&&t.stopPropagation()})}}),cc._RFpop()},{}]},{},["MapPaneEnum","MapCreater","PressDownScale","VictoryPanel"]);
//# sourceMappingURL=project.js.map