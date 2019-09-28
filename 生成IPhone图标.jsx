
try
{
    var iTunesArtwork = File.openDialog("选择图片（要求1024*1024）。", "*.png", false);

    if (iTunesArtwork !== null) 
    { 
        var doc = open(iTunesArtwork, OpenDocumentType.PNG);
      
        if (doc == null)
        {
            throw "错误，请确认所选的图片是否为有效的png文件";
        }

        var startState = doc.activeHistoryState;   
        var initialPrefs = app.preferences.rulerUnits; 
        app.preferences.rulerUnits = Units.PIXELS;   

        if ((doc.width != doc.height) || (doc.width != 1024))
        {
            throw "图片必须是1024*1024";
        }
      
        var destFolder = Folder.selectDialog("选择ICON输出目录, 目录不能包含中文");
        if (destFolder == null)
        {
            throw "";
        }

        var sfw = new ExportOptionsSaveForWeb();
        sfw.format = SaveDocumentType.PNG;
        sfw.PNG8 = false; 
        sfw.transparency = false;
        doc.info = null; 

        var icons = [
            {"name": "iTunesArtwork@2x", "size":1024},
            {"name": "iTunesArtwork", "size":512},

			{"name": "Icon-20", "size":20},	
            {"name": "Icon-29", "size":29},	
			{"name": "Icon-40", "size":40},	
            {"name": "Icon-50", "size":50},	
            {"name": "Icon-57", "size":57}, 
            {"name": "Icon-58", "size":58},
            {"name": "Icon-60", "size":60},
            {"name": "Icon-72", "size":72},	
            {"name": "Icon-76", "size":76},	
            {"name": "Icon-80", "size":80 },	
            {"name": "Icon-87", "size":87},	

            {"name": "Icon-100", "size":100},	
			{"name": "Icon-Share", "size":100},
            {"name": "Icon-114", "size":114},	

            {"name": "Icon-120", "size":120},	
            {"name": "Icon-144", "size":144},	
            {"name": "Icon-152", "size":152},
			{"name": "Icon-167", "size":167},			
            {"name": "Icon-180", "size":180}	
			       
        ];

        var icon;
        for (i = 0; i < icons.length; i++) 
        {
            icon = icons[i];
            doc.resizeImage(icon.size, icon.size, null, ResampleMethod.BICUBICSHARPER);

            var destFileName = icon.name + ".png";

            //if ((icon.name == "iTunesArtwork@2x") || (icon.name == "iTunesArtwork"))
           // {
            //    destFileName = icon.name;
           // }

            doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
            doc.activeHistoryState = startState; 
        }

        alert("IPhone图标生成成功!");
    }
}
catch (exception)
{
	if ((exception != null) && (exception != ""))
      alert(exception);
}
finally
{
    if (doc != null)
        doc.close(SaveOptions.DONOTSAVECHANGES);
    app.preferences.rulerUnits = initialPrefs; // restore prefs
}