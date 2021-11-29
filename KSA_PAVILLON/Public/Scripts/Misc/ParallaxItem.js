//@input SceneObject obj
//@input float offsetXStrength
//@input float offsetYStrength
//@input bool isClamp
//@input float minY
//@input float maxY
//@input float minX
//@input float maxX

const screen = script.obj.getComponent("Component.ScreenTransform");

var oldX = null
var oldY = null

function Clamp(num, min, max) {
  return num <= min 
    ? min 
    : num >= max 
      ? max 
      : num
}

script.api.UpdateParallax = function (offsetX, offsetY)
{
    var newX;
    var newY;
    if(script.isClamp){
        newX = Clamp(offsetX * script.offsetXStrength,script.minX,script.maxX);
        newY = Clamp(offsetY * script.offsetYStrength,script.minY,script.maxY);
        if (oldX != null) {
            newX = Lerp(oldX, newX, 0.3)
            newY = Lerp(oldY, newY, 0.3)
        }
    }else{
        newX = offsetX * script.offsetXStrength;
        newY = offsetY * script.offsetYStrength;
    }
    screen.anchors.setCenter(new vec2(newX,newY));
    oldX = newX
    oldY = newY
}