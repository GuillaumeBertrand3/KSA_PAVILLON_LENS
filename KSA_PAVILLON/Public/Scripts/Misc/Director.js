// -----JS CODE-----
//@input SceneObject subSceneParent
//@input bool useFrontBack = true;

var director = new global.Director(script, script.subSceneParent, script.useFrontBack, OnSceneEnded);

global.TextureCaptured = null;

function OnSceneEnded (sceneName, params)
{

}