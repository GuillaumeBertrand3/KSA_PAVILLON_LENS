//@input Component.Text textLocalized
//@input Component.Image firstImage
//@input Asset.Texture[] texturesLocalized1
//@input Component.Image secondImage
//@input Asset.Texture[] texturesLocalized2
//@input Component.Image thirdImage
//@input Component.Image thirdImageBis
//@input Asset.Texture[] texturesLocalized3

if (script.textLocalized.text == "ar_AA")
{
    script.firstImage.mainMaterial.mainPass.baseTex = script.texturesLocalized1[1];
    script.secondImage.mainMaterial.mainPass.baseTex = script.texturesLocalized2[1];
    script.thirdImage.mainMaterial.mainPass.baseTex = script.texturesLocalized3[1];
    script.thirdImageBis.mainMaterial.mainPass.baseTex = script.texturesLocalized3[1];
}
else
{
    script.firstImage.mainMaterial.mainPass.baseTex = script.texturesLocalized1[0];
    script.secondImage.mainMaterial.mainPass.baseTex = script.texturesLocalized2[0];    
    script.thirdImage.mainMaterial.mainPass.baseTex = script.texturesLocalized3[0];
    script.thirdImageBis.mainMaterial.mainPass.baseTex = script.texturesLocalized3[1];
}