// volume slider, by chapel; for sugarcube 2
// version 1.1.0

/*
    Changelog:

    v1.1.1:
      - Removed compatiblity to make it clear what should be updated
      - fixed not saving to API

    v1.1.0:
      - Fixed compatiblity issues with SugarCube version 2.28 (still compatible with older versions, too).
      - Added settings API integration for SugarCube 2.26.
      - Internal improvements and greater style consistency with my other work.
      - Added a pre-minified version.
      - By default, the slider is now more granual than before (101 possible positions vs 11).
        Change the `current` and `rangemax` options to 10 to restore the old feel.
*/

(function () {
    Setting.addRange('volume', {
        label : 'Volume: ',
        min : 0,
        max : 100,
        step : 1,
        default : 50,
        onInit : updateVolume,
        onChange : updateVolume
    });

	// Function to update the volume level.
	function setVolume (val) {
		if (typeof val !== 'number') val = Number(val);
		if (Number.isNaN(val) || val < 0) val = 0.5;
		if (val > 1) val = 1;
		settings.volume = val * 100;
		Setting.save();

		if ($("input[name='volume']").val() != settings.volume) {
			$("input[name='volume']").val(settings.volume);
		}
		try {
			if (SimpleAudio) {
				if (typeof SimpleAudio.volume === 'function') {
					SimpleAudio.volume(val);
				} else {
					SimpleAudio.volume = val;
				}
				return val;
			} else {
				throw new Error('Cannot access audio API.');
			}
		} catch (err) {
			// Fall back to the wikifier if we have to.
			console.error(err.message, err);
			$.wiki('<<masteraudio volume ' + val + '>>');
			return val;
		}
	}

	// Grab volume level changes from the volume slider.
	$(document).on('input', "input[name='volume']", function() {
		var change = parseInt($("input[name='volume']").val());
		setVolume(change / 100);
	});

	// Create the <<volume>> macro.
	Macro.add('volume', {
		handler : function () {
			var wrapper = $(document.createElement('span'));
			var slider = $(document.createElement('input'));
			var className = 'macro-' + this.name;
			slider.attr({
				id		: 'volume-control',
				type	: 'range',
				name	: 'volume',
				min		: 0,
				max		: 100,
				step	: 1,
				value	: settings.volume
			});
			// Class '.macro-volume' and ID '#volume-control' for styling the slider
			wrapper.append(slider).addClass(className).appendTo(this.output);
		}
	});

	function updateVolume () {
		setVolume(settings.volume / 100);
	}

	
}());