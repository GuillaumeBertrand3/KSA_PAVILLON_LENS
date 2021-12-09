// -----JS CODE-----
//@input SceneObject subSceneParent
//@input bool useFrontBack = true;

var director = new global.Director(script, script.subSceneParent, script.useFrontBack, OnSceneEnded);

global.touchSystem.touchBlocking = true;

director.OnCamBack = function()
{
    if (global.TextureCaptured != null)
    {
        this.GoToScene(director._scenesBackNames[0], true);
    }
    else
    {
        this.GoToScene(director._scenesBackNames[1], true);        
    }
};

global.TextureCaptured = null;

function OnSceneEnded (sceneName, params)
{

}