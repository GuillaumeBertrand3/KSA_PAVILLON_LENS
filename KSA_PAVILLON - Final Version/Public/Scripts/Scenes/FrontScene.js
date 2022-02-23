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
    print(global.scene.getCameraType() + ","+haveSmiled)
    if(global.scene.getCameraType() == "front")
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
}

function TakeCapture()
{
    if(global.scene.getCameraType() == "front")
    {    
        global.TextureCaptured = script.renderTarget.copyFrame();  
    }
}

script.api.UserSmileEvent = [];