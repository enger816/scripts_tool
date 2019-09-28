

try
{
  	var iTunesArtwork = File.openDialog("选择图片（要求512*512或者1024*1024）。", "*.png", false);

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

	    if ((doc.width != doc.height) || ((doc.width != 512) && (doc.width != 1024))  )
	    {
	        throw "图片必须是512*521 或者 1024*1024";
	    }
	    
	    var destFolder = Folder.selectDialog("选择ICON输出目录, 目录不能包含中文");
	    if (destFolder == null)
	    {
	      	throw "";
	    }

	    var sfw = new ExportOptionsSaveForWeb();
	    sfw.format = SaveDocumentType.PNG;
	    sfw.PNG8 = false; // 使用 PNG-24
	    sfw.transparency = true;
	    doc.info = null; 
	    
	    var icons = [
	      	{"name": "ic_launcher", "size":72},
	      	{"name": "ic_launcher", "size":48},
	      	{"name": "ic_launcher", "size":96},
			{"name": "ic_launcher", "size":144},
			{"name": "ic_launcher", "size":192}
	    ];
	    
	    var floders=[
	    	{"name":"mipmap-hdpi"},
	    	{"name":"mipmap-mdpi"},
	     	{"name":"mipmap-xhdpi"},
			{"name":"mipmap-xxhdpi"},
			{"name":"mipmap-xxxhdpi"}
	    ]

	    var icon;
	    var floder;
	    for (i = 0; i < icons.length; i++) 
	    {
	      	icon = icons[i];
	      	floder = floders[i];
	      
	      	var destPath = destFolder+"/"+floder.name;
	      	var testFolder = new Folder(destPath);  
	      	testFolder.create();
	      
	      	doc.resizeImage(icon.size, icon.size, null, ResampleMethod.BICUBICSHARPER);

	      	var destFileName = icon.name + ".png";
	      	doc.exportDocument(new File(destPath+"/" + destFileName), ExportType.SAVEFORWEB, sfw);
	      	doc.activeHistoryState = startState;
	    }

    	alert("Android图标生成成功!");
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
    app.preferences.rulerUnits = initialPrefs; 
}