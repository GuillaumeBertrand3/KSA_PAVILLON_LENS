//@input Component.ScriptComponent[] subScenes

script.api.scene = new global.Scene(script, script.subScenes)

script.api.scene.OnStart = Start;
script.api.scene.OnStop = Stop;

var tapEvent = null;

function Start()
{
    tapEvent = script.createEvent("TapEvent")
    tapEvent.bind(OnTap);
}

function Stop()
{
    script.removeEvent(tapEvent)
}

function OnTap()
{
    for (var i = 0; i < script.api.TapEvent.length; i++)
    {
        script.api.TapEvent[i]();
    }
}

script.api.TapEvent = [];