//@input SceneObject parent
//@input SceneObject handHint

script.api.subScene = new global.SubScene(script, script.parent);

script.api.subScene.OnStart = Start;

var init = false;

function Start()
{    
    if (!init)
    {
        script.api.subScene.GetSceneScript().api.TapEvent.push(OnUserTapped);
        init = true;
    }
    script.handHint.enabled = true;
}

function OnUserTapped()
{
    script.handHint.enabled = false;
}