//Settings & appending notifiers
app.notifiersEnabled = true
app.notifiers.removeAll();
var eventFile = new File(app.path +"/Presets/Scripts/layerFxToCss.jsx");
app.notifiers.add("CpFX", eventFile);


//Make user interface for settings of plugin

// Create the window
var win = new Window('dialog', 'Photoshopr settings dialog');

// The instructions panel - the text color of this panel will change
var tabs= win.add("tabbedpanel", undefined, "Settings");
//instPanel.alignment = "fill";
/*instPanel.alignChildren = "left";
var st = instPanel.add("statictext", undefined, "", {multiline: true } );
st.text = "Photoshopr started.\nNow clicking \"Copy Layer Style\" would copy layer effects as CSS to the clipboard. Enjoy.";
st.characters = 50;*/

// Add a panel
win.radioPanel = win.add("panel", [25, 15, 285, 130], "Color format");
win.checkPanel = win.add("panel", [25, 150, 285, 265], "Checkboxes");

// Add checkboxes
win.checkPanel.chkOne = win.checkPanel.add("checkbox", [10, 15, 125, 35], "Checkbox One");
win.checkPanel.chkTwo = win.checkPanel.add("checkbox", [10, 45, 125, 65], "Checkbox Two");
win.checkPanel.chkDisable = win.checkPanel.add("checkbox", [10, 75, 125, 95], "Disabled");

// Add radio buttons
win.radioPanel.radOne = win.radioPanel.add("radiobutton", [10, 15, 140, 35], "rgba");
win.radioPanel.radTwo = win.radioPanel.add("radiobutton", [10, 45, 140, 65], "hsla");
win.radioPanel.radThree = win.radioPanel.add("radiobutton", [10, 75, 150, 95], "hex");
// Select the first radio button
win.radioPanel.radOne.value = true;

// Add text labels
win.radioPanel.radTxtOne = win.radioPanel.add('edittext', [150, 15, 230, 35], '');
win.checkPanel.chkTxtOne = win.checkPanel.add('edittext', [140, 15, 230, 35], '');
win.checkPanel.chkTxtTwo = win.checkPanel.add('edittext', [140, 45, 230, 65], '');

win.quitBtn = win.add("button", [110,275,200,295], "Done");

// Event listener for the first two checkboxes
win.checkPanel.chkOne.onClick = win.checkPanel.chkTwo.onClick = function () {
win.checkPanel.chkTxtOne.text = (win.checkPanel.chkOne.value) ? "Selected" : "";
win.checkPanel.chkTxtTwo.text = (win.checkPanel.chkTwo.value) ? "Selected" : "";
};

// Event listener for the check-box to disable the other checkboxes
win.checkPanel.chkDisable.onClick = function () {
if(win.checkPanel.chkDisable.value) {
win.checkPanel.chkOne.enabled = false;
win.checkPanel.chkTwo.enabled = false;
}
else {
win.checkPanel.chkOne.enabled = true;
win.checkPanel.chkTwo.enabled = true;
}
};

// Event listener for the radio buttons
win.radioPanel.radOne.onClick = win.radioPanel.radTwo.onClick = win.radioPanel.radThree.onClick = function () {
var selected = "";
if(win.radioPanel.radOne.value) {
selected = "Radio One";
}
else if(win.radioPanel.radTwo.value) {
selected = "Radio Two";
}
else if(win.radioPanel.radThree.value) {
selected = "Radio Three";
}

win.radioPanel.radTxtOne.text = selected;
};

// Event listener for the quit button
win.quitBtn.onClick = function() { 
win.close(); 
}

win.show();