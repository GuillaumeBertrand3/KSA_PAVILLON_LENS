//@input SceneObject parent
//@input Asset.Texture videoSaudi
//@input Asset.Material discoverSaudiMat

script.api.subScene = new global.SubScene(script, script.parent);

script.api.subScene.OnStart = Start;
script.api.subScene.OnStop = Stop;

var init = false;
var revealed = false;
var videoSaudiControl = script.videoSaudi.control;

function Start()
{
    if (!init)
    {
        script.api.subScene.GetSceneScript().api.TapEvent.push(OnUserTapped);
        init = true;
    }
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
    }
}