//@input SceneObject parent
//@input Asset.Material smileHintMat
//@input Asset.Material swipeCameraMat
//@input float delayBeforeSmileHint
//@input float delayBeforeSwipHint
//@input SceneObject handHint
//@input float durationFadeHint
//@input int easingFadeHint {"widget":"combobox","values":[{"label":"Linear","value":0},{"label":"QuadraticIn","value":1},{"label":"QuadraticOut","value":2},{"label":"QuadraticInOut","value":3},{"label":"CubicIn","value":4},{"label":"CubicOut","value":5},{"label":"CubicInOut","value":6},{"label":"QuarticIn","value":7},{"label":"QuarticOut","value":8},{"label":"QuarticInOut","value":9},{"label":"QuinticIn","value":10},{"label":"QuinticOut","value":11},{"label":"QuinticInOut","value":12},{"label":"SinusoidalIn","value":13},{"label":"SinusoidalOut","value":14},{"label":"SinusoidalInOut","value":15},{"label":"ExponentialIn","value":16},{"label":"ExponentialOut","value":17},{"label":"ExponentialInOut","value":18},{"label":"CircularIn","value":19},{"label":"CircularOut","value":20},{"label":"CircularInOut","value":21},{"label":"ElasticIn","value":22},{"label":"ElasticOut","value":23},{"label":"ElasticInOut","value":24},{"label":"BackIn","value":25},{"label":"BackOut","value":26},{"label":"BackInOut","value":27},{"label":"BounceIn","value":28},{"label":"BounceOut","value":29},{"label":"BounceInOut","value":30}]}
//@input SceneObject countDown
//@input Asset.Texture[] countDownTextures

script.api.subScene = new global.SubScene(script, script.parent);

script.api.subScene.OnStart = Start;
script.api.subScene.OnStop = Stop;

var countEvent = null;
var countID = -1;
var haveSmiled = false;
var init = false;

var animationHintSmile = new Animation(script.durationFadeHint, UpdateAnimationFadeHintSmile, RepeatMode.None);
animationHintSmile.Easing = GetEasing(script.easingFadeHint);
function UpdateAnimationFadeHintSmile(ratio)
{
    script.smileHintMat.mainPass.baseColor = new vec4(1,1,1,ratio);
}

var animationHintSwipe = new Animation(script.durationFadeHint, UpdateAnimationFadeHintSwipe, RepeatMode.None);
animationHintSwipe.Easing = GetEasing(script.easingFadeHint);
function UpdateAnimationFadeHintSwipe(ratio)
{
    script.swipeCameraMat.mainPass.baseColor = new vec4(1,1,1,ratio);
}
animationHintSwipe.OnEnd = function()
{
    script.handHint.enabled = true;
}

function Start()
{
    if (!init)
    {
        script.api.subScene.GetSceneScript().api.UserSmileEvent.push(OnUserSmiled);
        init = true;
    }
    script.smileHintMat.mainPass.baseColor = new vec4(1,1,1,0);
    script.swipeCameraMat.mainPass.baseColor = new vec4(1,1,1,0);
    script.handHint.enabled = false;
    script.countDown.enabled = false;
    haveSmiled = false;
    delaySeconds(StartHintSmileDelayed, script.delayBeforeSmileHint);
}

function Stop()
{
    animationHintSmile.Reset();
    animationHintSwipe.Reset();
}

function OnUserSmiled()
{
    if (!haveSmiled)
    {
        haveSmiled = true;
        animationHintSmile.GoTo(0);
        CountdownTime();  
    }
}

function StartHintSmileDelayed()
{
    if(global.scene.getCameraType() == "front" && !haveSmiled)
    {
        animationHintSmile.Start(1);    
    }
}

function StartHintSwipeDelayed()
{
    if(global.scene.getCameraType() == "front")
    {
        animationHintSwipe.Start(1);    
    }
}

function CountdownTime() 
{
    script.countDown.enabled = true;
    countID = script.countDownTextures.length - 1;
    countEvent = script.createEvent('DelayedCallbackEvent');
    countEvent.bind(Countdown);
    Countdown();
}

function Countdown() 
{
    if (countID == -1) 
    {
        delaySeconds(StartHintSwipeDelayed, script.delayBeforeSwipHint);
        script.countDown.enabled = false;
    }        
    else
    {
        script.countDown.getComponent("Component.Image").mainPass.baseTex = script.countDownTextures[countID];
        countID--;
        countEvent.reset(1);
    }
}