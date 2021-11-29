//@input SceneObject parent
//@input Component.ScriptComponent[] parallaxItems

script.api.subScene = new global.SubScene(script, script.parent);

script.api.subScene.OnStart = Start;
script.api.subScene.OnStop = Stop;

function UpdateParallax (offsetX, offsetY)
{
    for (var i = 0; i < script.parallaxItems.length; i++)
    {
        script.parallaxItems[i].api.UpdateParallax(offsetX, offsetY);
    }
}

function Start ()
{
   global.parallaxManager.Subscribe(UpdateParallax);
}


function Stop ()
{
    global.parallaxManager.Unsubscribe(UpdateParallax);
}