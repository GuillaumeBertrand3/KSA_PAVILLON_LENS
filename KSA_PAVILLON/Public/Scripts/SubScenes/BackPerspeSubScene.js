//@input SceneObject parent
//@input Asset.Material materialShowing
//@input SceneObject pavillon
//@input Component.AnimationMixer animator
//@input Asset.Material matBlur
//@input float durationAnim
//@input float pauseDuration
//@input SceneObject pivotPositionInit
//@input SceneObject pivotPositionEnd
//@input SceneObject gyroParent
//@input SceneObject otherParent
//@input SceneObject sousPavillon
//@input SceneObject blurObject

script.api.subScene = new global.SubScene(script, script.parent);

script.api.subScene.OnStart = Start;
script.api.subScene.OnStop = Stop;

var init = false;
var revealed = false;
var pavillonTransform = script.pavillon.getTransform();
var sousPavillonTransform = script.sousPavillon.getTransform();
var pivotEndTransform = script.pivotPositionEnd.getTransform();
var pivotStartTransform = script.pivotPositionInit.getTransform();

var animationAppear = new Animation(script.durationAnim,UpdateAnimationAppear, RepeatMode.None);
function UpdateAnimationAppear(ratio)
{
    script.matBlur.mainPass.blurFactor = Lerp(0,5,ratio);
}
animationAppear.OnEnd = OnEndAnimAppear;
function OnEndAnimAppear()
{
    delaySeconds(PauseOnScreen, script.pauseDuration)
}


var animationGoAway = new Animation(script.durationAnim, UpdateAnimationGoAway, RepeatMode.None);
function UpdateAnimationGoAway(ratio)
{
    script.matBlur.mainPass.blurFactor = Lerp(5,0,ratio);
    pavillonTransform.setWorldPosition(vec3.lerp(pivotStartTransform.getWorldPosition(), pivotEndTransform.getWorldPosition(), ratio));
    pavillonTransform.setWorldRotation(quat.lerp(pivotStartTransform.getWorldRotation(), pivotEndTransform.getWorldRotation(), ratio));
}
animationGoAway.OnEnd = OnEndAnimGoAway;
function OnEndAnimGoAway()
{
    print(script.sousPavillon.getTransform().getWorldPosition());
    script.sousPavillon.setParentPreserveWorldTransform(script.otherParent);
    print(script.sousPavillon.getTransform().getWorldPosition());
    script.blurObject.enabled = false;
    //script.sousPavillon.getComponent("Component.InteractionComponent").enabled = true;
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
    //script.sousPavillon.getComponent("Component.InteractionComponent").enabled = false;
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
    script.sousPavillon.setParent(script.gyroParent);
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

function PauseOnScreen()
{
    if(global.scene.getCameraType() == "back")
    {
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