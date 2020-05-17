/*
	interface.js: Controls for interacting with the L-system
*/

$(document).ready( function() {
	// on generate, construct L system from the inputs
	$('#generate').click(() => {
		makeLSystem();
	});

	// on color input change, redraw the L system with that line color
	$('#line-color').change(() => {
		lineColor = color(document.getElementById('line-color').value);
		renderLSys();
	});

	// hide/show the controls when button clicked
	$('#toggle-ui').click(() => {
		$('#controls-wrapper').slideToggle();
	});
});

// load a preset into the visualizer
function loadLibraryItem(params) {
	// update all params in the UI
	$('#axiom').val(params.axiom);
	$('#prod-rules').val(params.productionRules);
	$('#graphics-instructs').val(params.actions);
	$('#iterations').val(params.iterations);

	makeLSystem();	// run everything
}

// extract data from user inputs and construct/render a new L system
function makeLSystem() {
	$('#err-wrapper').hide();
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

// display an error to the user
function showError(context, message) {
	$('#err-wrapper').show();
	$('#error-message').text(`${context}: ${message}`);
}