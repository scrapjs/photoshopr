//Settings & appending notifiers
app.notifiersEnabled = true
var eventFile = new File(app.path +"/Presets/Scripts/layerFxToCss.jsx");
app.notifiers.add("CpFX", eventFile);

alert("Photoshopr started. Now you can cllick \"Copy Layer Style\" and it wold be copied as CSS to the clipboard. Enjoy.");