//@input Component.Text textLocalized
//@input Component.Image firstImage
//@input Asset.Texture[] texturesLocalized1
//@input Component.Image secondImage
//@input Asset.Texture[] texturesLocalized2
//@input Component.Image thirdImage
//@input Component.Image thirdImageBis
//@input Asset.Texture[] texturesLocalized3
//@input Component.Image imageLocalizedDiscorverdjejwsnerzq
//@input Asset.Material[] videoMaterialsLocalized
//@input Asset.Texture[] videoTexturesLocalized


if (script.textLocalized.text == "ar_AA")
{
    script.firstImage.mainMaterial.mainPass.baseTex = script.texturesLocalized1[1];
    script.secondImage.mainMaterial.mainPass.baseTex = script.texturesLocalized2[1];
    script.thirdImage.mainMaterial.mainPass.baseTex = script.texturesLocalized3[1];
    script.thirdImageBis.mainMaterial.mainPass.baseTex = script.texturesLocalized3[1];
    global.videoSaudiControl = script.videoTexturesLocalized[1].control;
    global.materialDiscover = script.videoMaterialsLocalized[1];
}
else
{
    script.firstImage.mainMaterial.mainPass.baseTex = script.texturesLocalized1[0];
    script.secondImage.mainMaterial.mainPass.baseTex = script.texturesLocalized2[0];    
    script.thirdImage.mainMaterial.mainPass.baseTex = script.texturesLocalized3[0];
    script.thirdImageBis.mainMaterial.mainPass.baseTex = script.texturesLocalized3[0];
    global.videoSaudiControl = script.videoTexturesLocalized[0].control;
    global.materialDiscover = script.videoMaterialsLocalized[0];
}
script.imageLocalizedDiscorverdjejwsnerzq.mainMaterial = global.materialDiscover;