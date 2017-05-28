// volume slider, by chapel; for sugarcube 2
// version 1.0

// create namespace
setup.vol = {};

// options object
setup.vol.options = {
	current  : 10,
	rangeMax : 10,
	step     : 1
};

setup.vol.last = setup.vol.options.current;
setup.vol.start = setup.vol.last / setup.vol.options.rangeMax;

postdisplay['volume-task'] = function (taskName) {
	delete postdisplay[taskName];
	SimpleAudio.volume = setup.vol.start;
}

!function () {
	$(document).on('input', 'input[name=volume]', function() {
		// grab new volume from input
		var volRef     = setup.vol.options;
		var change     = $('input[name=volume]').val();
		var newVol     = change / volRef.rangeMax;
		volRef.current = newVol.toFixed(2);
		// console.log(newVol + ' : ' + volRef.current);

		// change volume; set slider poisition
		SimpleAudio.volume = volRef.current;
		setup.vol.last = change;
	});
}();

Macro.add('volume', {
	handler : function () {
		
		// set up variables
		var $wrapper  = $(document.createElement('span'));
		var $slider   = $(document.createElement('input'));
		var className = 'macro-' + this.name;
		var volRef    = setup.vol.options;
		
		// create range input
		$slider
			.attr({
				id    : 'volume-control',
				type  : 'range',
				name  : 'volume',
				min   : '0',
				max   : volRef.rangeMax,
				step  : volRef.step,
				value : setup.vol.last
			});
		// class '.macro-volume' and id '#volume-control' for styling
			
		// output
		$wrapper
			.append($slider)
			.addClass(className)
			.appendTo(this.output);
	}
});