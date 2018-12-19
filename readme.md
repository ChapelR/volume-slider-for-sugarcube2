### Volume Slider Control for Sugarcube 2

Now compatible with the audio system overhaul introduced in SugarCube 2.28.0, and with settings API integration for SugarCube 2.26 and newer. (Thanks to Greyelf for bringing these issues to my attention).

Throw the code of `volume-slider.min.js` (or `volume-slider.js` if you want to edit some of the options) in a script-tagged passage (Twine 1) or in your story's JavaScript area (Twine 2).  Adds one new macro, `<<volume>>`, which creates a volume slider that controls the volume of all sound playing via SugarCube's audio macros in real-time.

#### Options

This script comes with a few options.  You can change them via the options object near the top of the script.  It should look like this:

```javascript
// options object
setup.vol.options = {
	current  : 100,
	rangeMax : 100,
	step     : 1,
    setting  : true
};
```

* **`current` option**: Named current because it does a couple of things throughout the script, but you can alter it to set what position volume slider starts at.  It'll also set the starting volume level, but that effect can be overwritten by `<<masteraudio>>` macros.

* **`rangeMax` option**: Sets the length of the slider.  Longer sliders will give the player finer control over the volume.

* **`step` option**: Controls the 'step' attribute of the range input.  Makes the slider settle on values at this increment.  

* **`setting` option**: Adds a volume slider to the settings API modal. If this is all you want, I recommend just using the example here: http://www.motoslave.net/sugarcube/2/docs/#setting-api-method-addrange

#### Styling

The volume slider sits in a span with the class `.macro-volume`.  The slider itself has a `name` attribute of `volume` and an id of `#volume-control`, so you can use those selectors to style it.

You might want to check out [range.css](http://danielstern.ca/range.css/#/) for your styling needs.