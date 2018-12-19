// volume slider, by chapel; for sugarcube 2
// version 1.1.0

/*
    Changelog:

    v1.1.0:
      - Fixed compatiblity issues with SugarCube version 2.28 (still compatible with older versions, too).
      - Added settings API integration for SugarCube 2.26.
      - Internal improvements and greater style consistency with my other work.
      - Added a pre-minified version.
      - By default, the slider is now more granual than before (101 possible positions vs 11).
        Change the `current` and `rangemax` options to 10 to restore the old feel.
*/

(function () {

    var vol = {};

    // options object
    var options = {
        current  : 100,
        rangeMax : 100,
        step     : 1,
        setting  : true
    };

    vol.last = options.current;
    vol.start = vol.last / options.rangeMax;

    function setVolume (val) {
        // fix for SugarCube 2.28 and higher
        if (typeof val !== 'number') {
            val = Number(val);
        }
        if (Number.isNaN(val) || val < 0) {
            val = 0;
        }
        if (val > 1) {
            val = 1;
        }

        try {
            if (SimpleAudio) {
                if (typeof SimpleAudio.volume === 'function') {
                    SimpleAudio.volume(val);
                } else {
                    SimpleAudio.volume = val;
                }
            } else {
                throw new Error('Cannot access audio API.');
            }
        } catch (err) {
            // fall back to the wikifier if we have to
            console.error(err.message, err);
            $.wiki('<<masteraudio volume ' + val + '>>');
        } finally {
            return val;
        }
    }

    postdisplay['volume-task'] = function (taskName) {
        delete postdisplay[taskName];
        setVolume(vol.start.toFixed(2));
    }

    $(document).on('input', 'input[name=volume]', function() {
        // grab new volume from input
        var change      = $('input[name=volume]').val();
        var newVol      = change / options.rangeMax;
        options.current = newVol.toFixed(2);

        // change volume; set slider position
        setVolume(options.current);
        vol.last = change;
    });

    Macro.add('volume', {
        handler : function () {
            
            // set up variables
            var $wrapper  = $(document.createElement('span'));
            var $slider   = $(document.createElement('input'));
            var className = 'macro-' + this.name;
            
            // create range input
            $slider
                .attr({
                    id    : 'volume-control',
                    type  : 'range',
                    name  : 'volume',
                    min   : '0',
                    max   : options.rangeMax,
                    step  : options.step,
                    value : vol.last
                });
            // class '.macro-volume' and id '#volume-control' for styling
                
            // output
            $wrapper
                .append($slider)
                .addClass(className)
                .appendTo(this.output);
        }
    });

    if (options.setting) {
        // settings API integration, for SugarCube 2.26 and higher
        if (Setting && Setting.addRange && typeof Setting.addRange === 'function') {
            
            function settingsVol () {
                var newVol = settings.volume / options.rangeMax;
                options.current = newVol.toFixed(2);
                setVolume(options.current);
            }

            Setting.addRange('volume', {
                label : 'Volume: ',
                min : 0,
                max : options.rangeMax,
                step : options.step,
                default : options.current,
                onInit : settingsVol,
                onChange : settingsVol
            });
        } else {
            console.error('This version of SugarCube does not include the `Settings.addRange()` method; please try updating to the latest version of SugarCube.')
        }
    }

}());