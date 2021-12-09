//@input SceneObject parent

script.api.subScene = new global.SubScene(script, script.parent);

script.api.subScene.OnStart = Start;
script.api.subScene.OnStop = Stop;

var revealed = false;
var init = false;

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
}

function OnUserTapped()
{
    if (!revealed)
    {
        revealed = true;

    }
}