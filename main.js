'use strict';

var controller = false;
var dx = 0.0;
var dy = 0.0;
var df = 0;
var ds = 0;
var angle = 0.0;

var versailles = false;
var sistene = false;

console.log("script loaded!");

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if(controller){
    if(keyName == "w"){
        df = .15;
    } else if (keyName == "e"){
        df = 0;
    } else if(keyName == "x"){
        df = -0.15;
    } else if (keyName == "z"){
        df = 0;
    } else if (keyName == "a"){
        ds = 1;
    } else if (keyName == "q"){
        ds = 0;
    } else if (keyName == "d"){
        ds = -1;
    } else if (keyName == "c"){
        ds = 0;
    } else if (keyName == "l"){
        sistene = !sistene;
        document.getElementById("rig").object3D.position.set(0, 2, 0);
    }
  } else {
    if(keyName == "o"){
        controller = true;
    } else if(keyName == "w"){
        df = .2;
    } else if(keyName == "a"){
        ds = 1;
    } else if(keyName == "s"){
        df = -0.2;
    } else if(keyName == "d"){
        ds = -1;
    } else if(keyName == "y"){
        sistene = !sistene;
        document.getElementById("rig").object3D.position.set(0, 2, 0);
    }
  }
}, false);

document.addEventListener('keyup', (event) => {
    const keyName = event.key;
    if(!controller){
      if(keyName == "w"){
          df = 0;
      } else if(keyName == "a"){
          ds = 0;
      } else if(keyName == "s"){
          df = 0;
      } else if(keyName == "d"){
          ds = 0;
      }
    }
  }, false);

AFRAME.registerComponent('rotation-reader', {
    tick: function () {
    if(this.el.object3D.rotation._y % (2 * Math.PI) < 0) {
        angle = 2 * Math.PI + (this.el.object3D.rotation._y % (2 * Math.PI));
    } else {
        angle = this.el.object3D.rotation._y % (2 * Math.PI);
    }
    
    if(controller){
        if(ds == 0){
            dx = Math.sin(angle) * df * -1;
            dy = Math.cos(angle) * df * -1;
        } else if(ds == 1){
            dx = Math.sin(angle + (Math.PI / 2)) * -.1;
            dy = Math.cos(angle + (Math.PI / 2)) * -.1;
        } else if(ds == -1){
            dx = Math.sin(angle - (Math.PI / 2)) * -.1;
            dy = Math.cos(angle - (Math.PI / 2)) * -.1;
        }
    } else {
        if(ds == 0){
            dx = Math.sin(angle) * df * -1;
            dy = Math.cos(angle) * df * -1;
        } else if(ds == 1){
            dx = Math.sin(angle + (Math.PI / 2)) * -.15;
            dy = Math.cos(angle + (Math.PI / 2)) * -.15;
        } else if(ds == -1){
            dx = Math.sin(angle - (Math.PI / 2)) * -.15;
            dy = Math.cos(angle - (Math.PI / 2)) * -.15;
        }
    }

    if(sistene){
        dx = 0;
        dy = 0;
        document.getElementById("rig").object3D.position.set(30, 0, 0);
    }

    console.log(dy);

    document.getElementById("rig").object3D.position.set(document.getElementById("rig").object3D.position.x + dx, 2, document.getElementById("rig").object3D.position.z + dy);
    //this.el.object3D.rotation.set(0, Math.PI/2, 0);
    }
  });

/*
document.addEventListener('keyup', (event) => {
  const keyName = event.key;
}, false);
*/