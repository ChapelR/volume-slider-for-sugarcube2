### Volume Slider Control for Sugarcube 2

Throw the code of volume-slider.js in a script-tagged passage (Twine 1) or in your story's JavaSCript area (Twine 2).  Adds one new macro, `<<volume>>`, which creates a volume slider that controls the volume of all sound playing via SugarCube's audio macros in real-time.

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

**current option**: Named current because it does a couple things throughout the script, but you can alter it to set what position volume slider starts in.  It'll also set the starting volume level, but that effect is overridden by `<<masteraudio>>` macros.

**rageMax option**: Sets the length of the slider.  Default is 10, but it can get up to around 100 before things start getting weird.

**step option**: Controls the 'step' attribute of the range input.  Makes the slider feel smoother at lower values, and clickier? at higher values.

#### Styling

The volume slider sits in a span with the class `.macro-volume`.  The slider itself has a `name` attribute of `volume` and an id of `#volume-control`, so you can use those selectors to style it.

You might want to check out [range.css](http://danielstern.ca/range.css/#/) to make styling it to match your story a breeze.