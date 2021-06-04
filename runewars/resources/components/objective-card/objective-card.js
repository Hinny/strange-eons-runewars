useLibrary( 'diy' );
useLibrary( 'ui' );
useLibrary( 'imageutils' );
useLibrary( 'markup' );

importClass( arkham.diy.ListItem );
importClass( arkham.component.DefaultPortrait );

// When the script is run directly from the editor, this will load
// the test-lib library, which does the setup tasks that the
// plug-in would have done if it was run. This lets us test and
// develop the plug-in without having to rebuild the plug-in bundle
// and start a new copy of Strange Eons every time we make a change.
if( sourcefile == 'Quickscript' ) {
	useLibrary( 'project:runewars/resources/test-lib.js' );
}
const runewars = Eons.namedObjects.runewars;

portraits = [];

// Returns the number of portraits we will be using.
function getPortraitCount() {
	return portraits.length;
}

function create( diy ) {
	diy.version = 1;
	diy.extensionName = 'runewars.seext';
	diy.faceStyle = FaceStyle.TWO_FACES;
	diy.transparentFaces = false;
	diy.variableSizedFaces = false;
	diy.customPortraitHandling = false;

	diy.frontTemplateKey = 'objective-front';
	diy.backTemplateKey = 'objective-back';

	diy.name = #rw-objective-name;
}

function createInterface( diy, editor ) {

	bindings = new Bindings( editor, diy );

	// Common Panel
	nameField = textField( 'X', 30 );

	mainPanel = new Grid( '', '[min:pref][min:pref,grow][min:pref][min:pref,grow]', '');
	mainPanel.place( @rw-objective-name, '', nameField, 'span, growx, wrap para' );

	diy.setNameField( nameField );

	mainPanel.addToEditor( editor, @rw-main-panel, null, null, 0 );
	bindings.bind();
}


function createFrontPainter( diy, sheet ) {
	nameBox = runewars.headingBox( sheet, 12 );
}

function createBackPainter( diy, sheet ) {
}

function paintFront( g, diy, sheet ) {
	sheet.paintTemplateImage( g );
	nameBox.markupText = diy.name;
	nameBox.draw( g, R('name') );
}

function paintBack( g, diy, sheet ) {
	sheet.paintTemplateImage( g );
}

function onClear() {
}

// These can be used to perform special processing during open/save.
// For example, you can seamlessly upgrade from a previous version
// of the script.
function onRead( diy, ois ) {
}

function onWrite( diy, oos ) {
}

/**
 * Returns a region for this component. The nametag is
 * the middle part of the region name, without the
 * 'char-' prefix or '-region' suffix.
 */
function R( nametag, x, y ) {
	value = $('objective-' + nametag + '-region');
	if( value == null ) {
		throw new Error( 'region not defined: ' + nametag );
	}
	if( x == null ) {
		x = 0;
	}
	if( y == null ) {
		y = 0;
	}
	temp = [];
	temp = value.split(',');
	temp[0] = parseInt(temp[0]) + parseInt(x);
	temp[1] = parseInt(temp[1]) + parseInt(y);
	temp[0] = temp[0].toString();
	temp[1] = temp[1].toString();
	value = temp[0] + ',' + temp[1]	+ ',' + temp[2]	+ ',' + temp[3];
	//return value;
	return new Region( value );
}

// This will cause a test component to be created when you run the script
// from a script editor. It doesn't do anything when the script is run
// other ways (e.g., when you choose to create the component by selecting
// it in the New Game Component dialog).
testDIYScript( 'runewars' );
