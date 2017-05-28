### Volume Slider Control for Sugarcube 2

Throw the code of volume-slider.js in a script-tagged passage (Twine 1) or in your story's JavaScript area (Twine 2).  Adds one new macro, `<<volume>>`, which creates a volume slider that controls the volume of all sound playing via SugarCube's audio macros in real-time.

#### Options

This script comes with a few options.  You can change them via the options object near the top of the script.  It should look like this:

```javascript
// options object
setup.vol.options = {
	current  : 10,
	rangeMax : 10,
	step     : 1
};
```

* **`current` option**: Named current because it does a couple of things throughout the script, but you can alter it to set what position volume slider starts at.  It'll also set the starting volume level, but that effect can be overwritten by `<<masteraudio>>` macros.

* **`rangeMax` option**: Sets the length of the slider.  Longer sliders will give the player finer control over the volume.

* **`step` option**: Controls the 'step' attribute of the range input.  Makes the slider settle on values at this increment.

#### Styling

The volume slider sits in a span with the class `.macro-volume`.  The slider itself has a `name` attribute of `volume` and an id of `#volume-control`, so you can use those selectors to style it.

You might want to check out [range.css](http://danielstern.ca/range.css/#/) for your styling needs.