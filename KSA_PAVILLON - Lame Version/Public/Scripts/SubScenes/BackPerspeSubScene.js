//@input SceneObject parent
//@input Component.Camera cameraGyro
//@input Component.Camera cameraPerspe
//@input Asset.Material materialShowing
//@input SceneObject pavillon
//@input Component.AnimationMixer animator
//@input Asset.Material matBlur
//@input float durationAnim
//@input float pauseDuration
//@input SceneObject pivotPositionInit
//@input SceneObject pivotPositionEnd
//@input SceneObject sousPavillon
//@input SceneObject blurObject
//@input SceneObject tempPivotEnd
//@input SceneObject tempPivotStart
//@input Asset.Material[] materialsToFade
//@input Asset.VFXAsset particle 

script.api.subScene = new global.SubScene(script, script.parent);

script.api.subScene.OnStart = Start;
script.api.subScene.OnStop = Stop;

var init = false;
var revealed = false;
var pavillonTransform = script.pavillon.getTransform();
var sousPavillonTransform = script.sousPavillon.getTransform();
var pivotEndTransform = script.pivotPositionEnd.getTransform();
var pivotStartTransform = script.pivotPositionInit.getTransform();
var transformEnd = script.tempPivotEnd.getTransform();
var transformStart = script.tempPivotStart.getTransform();

var animationAppear = new Animation(script.durationAnim,UpdateAnimationAppear, RepeatMode.None);
function UpdateAnimationAppear(ratio)
{
    script.particle.properties.advance = 1-(ratio);
    script.matBlur.mainPass.blurFactor = Lerp(0,5,ratio);
    for (var i = 0; i < script.materialsToFade.length; i++)
    {
        script.materialsToFade[i].mainPass.baseColor = new vec4(
            script.materialsToFade[i].mainPass.baseColor.x, 
            script.materialsToFade[i].mainPass.baseColor.y,
            script.materialsToFade[i].mainPass.baseColor.z, 
            ratio);
    }
}
animationAppear.OnEnd = OnEndAnimAppear;
function OnEndAnimAppear()
{
    delaySeconds(ChangeLayer, script.pauseDuration)
}


var animationGoAway = new Animation(script.durationAnim, UpdateAnimationGoAway, RepeatMode.None);
function UpdateAnimationGoAway(ratio)
{
    script.matBlur.mainPass.blurFactor = Lerp(5,0,ratio);
    pavillonTransform.setWorldPosition(vec3.lerp(transformStart.getWorldPosition(), transformEnd.getWorldPosition(), ratio));
    pavillonTransform.setWorldRotation(quat.lerp(transformStart.getWorldRotation(), transformEnd.getWorldRotation(), ratio));
}
animationGoAway.OnEnd = OnEndAnimGoAway;
function OnEndAnimGoAway()
{
    script.blurObject.enabled = false;
    script.sousPavillon.getComponent("Component.InteractionComponent").enabled = true;
}


function Start()
{
    if (!init)
    {
        script.api.subScene.GetSceneScript().api.TapEvent.push(OnUserTapped);
        init = true;
    }
    script.materialShowing.mainPass.baseTex = global.TextureCaptured;
    revealed = false;
    script.sousPavillon.enabled = false;
    pavillonTransform.setWorldPosition(pivotStartTransform.getWorldPosition());
    pavillonTransform.setWorldRotation(pivotStartTransform.getWorldRotation());
    script.sousPavillon.getComponent("Component.InteractionComponent").enabled = false;
}

function Stop()
{
    if (revealed)
    {
        animationAppear.Reset();
        animationGoAway.Reset();
    }
    revealed = false;
    script.matBlur.mainPass.blurFactor = 0;
    pavillonTransform.setWorldPosition(pivotStartTransform.getWorldPosition());
    pavillonTransform.setWorldRotation(pivotStartTransform.getWorldRotation());
    script.cameraGyro.enabled = false;
    script.cameraPerspe.enabled = true;
}

function OnUserTapped()
{
    if (!revealed)
    {
        revealed = true;
        script.animator.start("Scene",0,1);
        animationAppear.Start(1);
        delaySeconds(DelayEnable, .1);
        script.blurObject.enabled = true;
    }
}

function ChangeLayer()
{
    if(global.scene.getCameraType() == "back")
    {  
        pavillonTransform.setWorldPosition(script.cameraGyro.getTransform().getWorldTransform()
            .multiplyPoint(pavillonTransform.getLocalPosition()));
        pavillonTransform.setWorldRotation(script.cameraGyro.getTransform().getWorldRotation()
            .multiply(pavillonTransform.getWorldRotation()));
        transformStart.setWorldPosition(pavillonTransform.getWorldPosition());
        transformStart.setWorldRotation(pavillonTransform.getWorldRotation());
        transformEnd.setWorldPosition(script.cameraGyro.getTransform().getWorldTransform()
            .multiplyPoint(pivotEndTransform.getLocalPosition()));
        transformEnd.setWorldRotation(script.cameraGyro.getTransform().getWorldRotation()
            .multiply(pivotEndTransform.getWorldRotation()));

        script.cameraGyro.enabled = true;
        script.cameraPerspe.enabled = false;
        animationGoAway.Start(1);
    }
}

function DelayEnable()
{
    if(global.scene.getCameraType() == "back")
    {
        script.sousPavillon.enabled = true;
    }
}