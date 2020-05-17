/*
	interface.js: Controls for interacting with the L-system
*/

const SCALE_DELTA = 0.5;

$(document).ready( function() {
	$('#generate').click(() => {
		makeLSystem();
	});

	function makeLSystem() {
		$('#error-message').text('');	// clear any left-over errors

		// extract raw text from inputs
		const axiom = $('#axiom').val();
		const productionRules = $('#prod-rules').val();
		const graphicsInstructions = $('#graphics-instructs').val();
		const iterations = parseInt($('#iterations').val(), 10);

		if (isNaN(iterations) || iterations < 0) return showError('Iterations', 'Invalid number of iterations');
		if (!axiom) return showError('Axiom', 'The axiom cannot be empty');

		// attempt to parse inputted production rules
		parseProductionRules(productionRules, (err, rules) => {
			if (err) return showError('Production Rule Parse Error', err.message);

			// attempt to parse inputted graphics instructions
			parseActions(graphicsInstructions, (err, actions) => {
				if (err) return showError('Graphics Instructions Parse Error', err.message);

				// update the L-system instance
				lsys.axiom = axiom;
				lsys.productionRules = rules;
				lsys.actions = actions;
				lsys.iteration = iterations;

				// calculate a new string to be displayed
				lsys.calculateString();
				renderLSys();
			});
		});
	}

	function showError(context, message) {
		$('#error-message').text(`${context}: ${message}`);
	}

	$('#toggle-ui').click(() => {
		$('#controls-wrapper').slideToggle();
	});

	$('#line-color').change(() => {
		let col = document.getElementById('line-color').value;
		LINE_COLOR = color(col);
		renderLSys();
	});

	// load a preset into the visualizer
	function loadLibraryItem(params) {
		// update all params in the UI
		$('#axiom').val(params.axiom);
		$('#prod-rules').text(params.productionRules);
		$('#graphics-instructs').text(params.actions);
		$('#iterations').val(params.iterations);

		$('#generate').click();	// run everything
	}

	loadLibraryItem(dragonCurve);	// default to dragon curve

});