//@input SceneObject parent
//@input Asset.Material[] materialReveal
//@input float durationAnimationReveal
//@input Component.ScreenTransform pixieScreenTransform
//@input Asset.Texture videoSaudi
//@input int easingAnimationReveal {"widget":"combobox","values":[{"label":"Linear","value":0},{"label":"QuadraticIn","value":1},{"label":"QuadraticOut","value":2},{"label":"QuadraticInOut","value":3},{"label":"CubicIn","value":4},{"label":"CubicOut","value":5},{"label":"CubicInOut","value":6},{"label":"QuarticIn","value":7},{"label":"QuarticOut","value":8},{"label":"QuarticInOut","value":9},{"label":"QuinticIn","value":10},{"label":"QuinticOut","value":11},{"label":"QuinticInOut","value":12},{"label":"SinusoidalIn","value":13},{"label":"SinusoidalOut","value":14},{"label":"SinusoidalInOut","value":15},{"label":"ExponentialIn","value":16},{"label":"ExponentialOut","value":17},{"label":"ExponentialInOut","value":18},{"label":"CircularIn","value":19},{"label":"CircularOut","value":20},{"label":"CircularInOut","value":21},{"label":"ElasticIn","value":22},{"label":"ElasticOut","value":23},{"label":"ElasticInOut","value":24},{"label":"BackIn","value":25},{"label":"BackOut","value":26},{"label":"BackInOut","value":27},{"label":"BounceIn","value":28},{"label":"BounceOut","value":29},{"label":"BounceInOut","value":30}]}
//@input float durationFadeHint
//@input Asset.Material discoverSaudiMat
//@input int easingFadeHint {"widget":"combobox","values":[{"label":"Linear","value":0},{"label":"QuadraticIn","value":1},{"label":"QuadraticOut","value":2},{"label":"QuadraticInOut","value":3},{"label":"CubicIn","value":4},{"label":"CubicOut","value":5},{"label":"CubicInOut","value":6},{"label":"QuarticIn","value":7},{"label":"QuarticOut","value":8},{"label":"QuarticInOut","value":9},{"label":"QuinticIn","value":10},{"label":"QuinticOut","value":11},{"label":"QuinticInOut","value":12},{"label":"SinusoidalIn","value":13},{"label":"SinusoidalOut","value":14},{"label":"SinusoidalInOut","value":15},{"label":"ExponentialIn","value":16},{"label":"ExponentialOut","value":17},{"label":"ExponentialInOut","value":18},{"label":"CircularIn","value":19},{"label":"CircularOut","value":20},{"label":"CircularInOut","value":21},{"label":"ElasticIn","value":22},{"label":"ElasticOut","value":23},{"label":"ElasticInOut","value":24},{"label":"BackIn","value":25},{"label":"BackOut","value":26},{"label":"BackInOut","value":27},{"label":"BounceIn","value":28},{"label":"BounceOut","value":29},{"label":"BounceInOut","value":30}]}
//@input SceneObject particleObject
//@input Asset.VFXAsset vfxParticle

script.api.subScene = new global.SubScene(script, script.parent);

script.api.subScene.OnStart = Start;
script.api.subScene.OnStop = Stop;

var init = false;
var revealed = false;
var videoSaudiControl = script.videoSaudi.control;

var animationReveal = new Animation(script.durationAnimationReveal, UpdateAnimationReveal, RepeatMode.None);
animationReveal.Easing = GetEasing(script.easingAnimationReveal)
function UpdateAnimationReveal(ratio)
{
    for (var i = 0; i < script.materialReveal.length; i++)
    {
        script.materialReveal[i].mainPass.reveal = 1-ratio;
    }  
    script.vfxParticle.properties.advance = 1-ratio;
}
animationReveal.OnEnd = OnEndReveal;
function OnEndReveal()
{
    script.discoverSaudiMat.mainPass.baseColor = new vec4(1,1,1,1);
    PlayVideo(videoSaudiControl, 1);
    script.particleObject.enabled = false;
}

function Start()
{
    if (!init)
    {
        script.api.subScene.GetSceneScript().api.TapEvent.push(OnUserTapped);
        init = true;
    }
    for (var i = 0; i < script.materialReveal.length; i++)
    {
        script.materialReveal[i].mainPass.reveal = 1;
    }
}

function Stop()
{
    animationReveal.Reset();
    revealed = false;
    StopVideo(videoSaudiControl);
    script.discoverSaudiMat.mainPass.baseColor = new vec4(1,1,1,0);
    script.particleObject.enabled = false;
}

function OnUserTapped()
{
    if (!revealed)
    {
        revealed = true;
        animationReveal.Start(1); 
        script.particleObject.enabled = true;
    }
}