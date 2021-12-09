//@input SceneObject obj
//@input float offsetXStrength
//@input float offsetYStrength
//@input bool isClamp
//@input float minY
//@input float maxY
//@input float minX
//@input float maxX

const trans = script.obj.getTransform();

var oldX = null

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
    if(script.isClamp){
        newX = Clamp(offsetX * script.offsetXStrength,script.minX,script.maxX);
        if (oldX != null) {
            newX = Lerp(oldX, newX, 0.3)
        }
    }else{
        newX = offsetX * script.offsetXStrength;
    }
    trans.setWorldPosition(new vec3(newX,trans.getWorldPosition().y,trans.getWorldPosition().z));
    oldX = newX
}