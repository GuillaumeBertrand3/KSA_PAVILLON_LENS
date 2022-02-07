//@input SceneObject parent
//@input Asset.Texture videoSaudi
//@input Asset.Material discoverSaudiMat
//@ui {"widget":"separator"}
//@ui {"widget":"label", "label":"Animation Fade In UI Select"}
//@input float durationFadeInDiscover
//@input int easingFadeInDiscover {"widget":"combobox","values":[{"label":"Linear","value":0},{"label":"QuadraticIn","value":1},{"label":"QuadraticOut","value":2},{"label":"QuadraticInOut","value":3},{"label":"CubicIn","value":4},{"label":"CubicOut","value":5},{"label":"CubicInOut","value":6},{"label":"QuarticIn","value":7},{"label":"QuarticOut","value":8},{"label":"QuarticInOut","value":9},{"label":"QuinticIn","value":10},{"label":"QuinticOut","value":11},{"label":"QuinticInOut","value":12},{"label":"SinusoidalIn","value":13},{"label":"SinusoidalOut","value":14},{"label":"SinusoidalInOut","value":15},{"label":"ExponentialIn","value":16},{"label":"ExponentialOut","value":17},{"label":"ExponentialInOut","value":18},{"label":"CircularIn","value":19},{"label":"CircularOut","value":20},{"label":"CircularInOut","value":21},{"label":"ElasticIn","value":22},{"label":"ElasticOut","value":23},{"label":"ElasticInOut","value":24},{"label":"BackIn","value":25},{"label":"BackOut","value":26},{"label":"BackInOut","value":27},{"label":"BounceIn","value":28},{"label":"BounceOut","value":29},{"label":"BounceInOut","value":30}]}
//@input Component.Image imageDiscover

script.api.subScene = new global.SubScene(script, script.parent);

script.api.subScene.OnStart = Start;
script.api.subScene.OnStop = Stop;

var init = false;
var revealed = false;
var videoSaudiControl = script.videoSaudi.control;
var materialDiscover = script.imageDiscover.mainMaterial;

var animationFadeInDiscover = new Animation(script.durationFadeInDiscover, UpdateUIFadeInDiscover, RepeatMode.None);
animationFadeInDiscover.Easing = GetEasing(script.easingFadeInDiscover);
function UpdateUIFadeInDiscover(ratio)
{
    materialDiscover.mainPass.baseColor = new vec4(1,1,1,ratio);
}

function Start()
{
    if (!init)
    {
        script.api.subScene.GetSceneScript().api.TapEvent.push(OnUserTapped);
        init = true;
    }
    animationFadeInDiscover.Reset();
}

function Stop()
{
    revealed = false;
    StopVideo(videoSaudiControl);
    script.discoverSaudiMat.mainPass.baseColor = new vec4(1,1,1,0);
}

function OnUserTapped()
{
    if (!revealed)
    {
        revealed = true;
        script.discoverSaudiMat.mainPass.baseColor = new vec4(1,1,1,1);
        PlayVideo(videoSaudiControl, 1);
        animationFadeInDiscover.Start(1);
    }
}