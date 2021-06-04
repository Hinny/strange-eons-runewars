/*
 * namedobj.js
 *
 * This script is normally called from the main plug-in script.
 * It defines an object to contain fonts and other shared resources,
 * and then registers it as a named object. A named object is an
 * object that can be created in one script, and used from another
 * script that is run at a later time.
 */

useLibrary( 'fontutils' );
useLibrary( 'imageutils' );
useLibrary( 'markup' );

importClass( resources.ResourceKit );

// Note that anything that we put in 'this' while inside this function will
// be available from our named object later.
function runewarsObject() {
	this.GAME_CODE = 'RW';

	const base = '/';
	this.base = base;

	// Register the fonts needed for our cards, and store the family names
    var eurostile = new Array( 'fonts/eurostile.ttf, eurostile-bold.ttf' );

	this.textFamily = FontUtils.registerFontFamilyFromResources.apply( this, eurostile );


	//
	// Define some helper functions for creating markup boxes
	//

	/**
	 * headingBox( sheet, size )
	 * Creates a new markup box for title areas.
	 *
	 * sheet : the sheet to create the box for
	 * size : font size
	 */
	this.headingBox = function titleBox( sheet, size ) {
		var box = markupBox( sheet );

		box.defaultStyle = new TextStyle(
			FAMILY, this.textFamily,
			COLOR, Color.WHITE,
			SIZE,   size
		);

		iconStyle = new TextStyle(
			FAMILY,		this.iconFamily,
			SIZE,		size,
			COLOR,		Color(0,0,0),
			WEIGHT,		WEIGHT_REGULAR,
			WIDTH,		WIDTH_REGULAR,
			POSTURE,	POSTURE_REGULAR
		);

		box.alignment = box.LAYOUT_CENTER | box.LAYOUT_MIDDLE;
		box.headlineAlignment = box.LAYOUT_CENTER | box.LAYOUT_MIDDLE;

		box.lineTightness = -0.5;
		box.tightnessLimit = -0.5;

		box.textFitting = box.FIT_SCALE_TEXT;

		return box;
	};

}

//
// Create the object and place it in the named object database;
// then we can look it up from other scripts in the same way, e.g.:
//
// const Xwing = Eons.namedObjects.Xwing;
// println( Xwing.titleFamily );
//

Eons.namedObjects.runewars = new runewarsObject();
