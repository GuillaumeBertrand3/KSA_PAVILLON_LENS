//@input SceneObject parent
//@input Asset.Material whiteWallMat
//@input Asset.Material brightnessContrastMat
//@input float delayBeforeFlash
//@input float durationFlash
//@input int easingFlash {"widget":"combobox","values":[{"label":"Linear","value":0},{"label":"QuadraticIn","value":1},{"label":"QuadraticOut","value":2},{"label":"QuadraticInOut","value":3},{"label":"CubicIn","value":4},{"label":"CubicOut","value":5},{"label":"CubicInOut","value":6},{"label":"QuarticIn","value":7},{"label":"QuarticOut","value":8},{"label":"QuarticInOut","value":9},{"label":"QuinticIn","value":10},{"label":"QuinticOut","value":11},{"label":"QuinticInOut","value":12},{"label":"SinusoidalIn","value":13},{"label":"SinusoidalOut","value":14},{"label":"SinusoidalInOut","value":15},{"label":"ExponentialIn","value":16},{"label":"ExponentialOut","value":17},{"label":"ExponentialInOut","value":18},{"label":"CircularIn","value":19},{"label":"CircularOut","value":20},{"label":"CircularInOut","value":21},{"label":"ElasticIn","value":22},{"label":"ElasticOut","value":23},{"label":"ElasticInOut","value":24},{"label":"BackIn","value":25},{"label":"BackOut","value":26},{"label":"BackInOut","value":27},{"label":"BounceIn","value":28},{"label":"BounceOut","value":29},{"label":"BounceInOut","value":30}]}

script.api.subScene = new global.SubScene(script, script.parent);

script.api.subScene.OnStart = Start;
script.api.subScene.OnStop = Stop;

var haveSmiled = false;
var init = false;

var animationFlash = new Animation(script.durationFlash, UpdateAnimationFlash, RepeatMode.PingPong);
animationFlash.Easing = GetEasing(script.easingFlash);
function UpdateAnimationFlash(ratio)
{
    script.brightnessContrastMat.mainPass.advance = ratio;
    script.whiteWallMat.mainPass.baseColor = new vec4(1,1,1,Math.max(0,(ratio-0.75)*4));
}

function Start()
{
    if (!init)
    {
        script.api.subScene.GetSceneScript().api.UserSmileEvent.push(OnUserSmiled);
        init = true;
    }
    haveSmiled = false;
    script.whiteWallMat.mainPass.baseColor = new vec4(1,1,1,0);
}

function Stop()
{
    animationFlash.Reset();
}

function OnUserSmiled()
{
    if (!haveSmiled)
    {
        haveSmiled = true;
        delaySeconds(StartFlash, script.delayBeforeFlash);
    }
}

function StartFlash()
{
    animationFlash.Start(1);    
}