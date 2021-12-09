// -----JS CODE-----
//@input SceneObject nullHolder
//@input Asset.ObjectPrefab prefabToSpawn
var nullNumber = script.nullHolder.getChildrenCount();
for (var i = 0; i < nullNumber; i++) {
var newObject = script.prefabToSpawn.instantiate(script.nullHolder.getChild(i));
    newObject.getTransform().setLocalRotation(quat.fromEulerVec(new vec3(Math.random(),0,0)));
}