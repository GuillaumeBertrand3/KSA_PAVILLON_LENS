//@input Component.Text textLocalized
//@input Component.Image firstImage
//@input Asset.Texture[] texturesLocalized1
//@input Component.Image secondImage
//@input Asset.Texture[] texturesLocalized2

if (script.textLocalized.text == "ar_AA")
{
    script.firstImage.mainMaterial.mainPass.baseTex = script.texturesLocalized1[1];
    //script.secondImage.mainMaterial.mainPass.baseTex = script.texturesLocalized2[1];
}
else
{
    script.firstImage.mainMaterial.mainPass.baseTex = script.texturesLocalized1[0];
    //script.secondImage.mainMaterial.mainPass.baseTex = script.texturesLocalized2[0];    
}