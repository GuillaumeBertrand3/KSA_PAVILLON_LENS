//@input Component.ScriptComponent[] subScenes
//@input Asset.Texture renderTarget
//@input float delayBeforeCapture

script.api.scene = new global.Scene(script, script.subScenes)

script.api.scene.OnStart = Start;

haveSmiled = false;

var eventSmile = script.createEvent("SmileStartedEvent");
eventSmile.bind(OnUserSmile);

function Start()
{
    haveSmiled = false;
}

function OnUserSmile()
{
    for (var i = 0; i < script.api.UserSmileEvent.length; i++)
    {
        script.api.UserSmileEvent[i]();
    }
    if (!haveSmiled)
    {
        haveSmiled = true;
        delaySeconds(TakeCapture,script.delayBeforeCapture);
    }
}

function TakeCapture()
{
    global.TextureCaptured = script.renderTarget.copyFrame();    
}

script.api.UserSmileEvent = [];