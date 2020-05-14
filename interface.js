/*
	interface.js: Controls for interacting with the L-system
*/

const SCALE_DELTA = 0.05;

function mouseWheel(event) {
	// scale up or down depending on scroll direction
	if (event.delta > 0) {
		SCALE += SCALE_DELTA;
	} else if (event.delta < 0) {
		SCALE -= SCALE_DELTA;
		if (SCALE < 0) SCALE = 0;
	}

	// lsys.startX += (lsys.startX - mouseX) * (SCALE - 1);
	// lsys.startY += (lsys.startY - mouseY) * (SCALE - 1);
}

$(document).ready( function() {

	makeLSystem();

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
			});
		});
	}

	function showError(context, message) {
		$('#error-message').text(`${context}: ${message}`);
	}



	// $('#matrix').prop('checked', lsys.pushAndPop);
	// $('#maxRotationDiv').hide();
	// $('#generate').click( function() {
	// 	lsys.calculateString();
	// });
	// $('#setXrule').change( function() {
	// 	lsys.Xrule = $('#setXrule').val();
	// });
	// $('#setYrule').change( function() {
	// 	lsys.Yrule = $('#setYrule').val();
	// });
	// $('#setIterations').mousemove( function() {
	// 	lsys.iteration = $('#setIterations').val();
	// 	$('#iterations').text(lsys.iteration);
	// });
	// $('#setAxiom').change( function() {
	// 	lsys.axiom = $('#setAxiom').val();
	// });
	// $('#setAngle').mousemove( function() {
	// 	lsys.angle = $('#setAngle').val();
	// 	if (lsys.Lstring != ''){
	// 		lsys.drawLsys();
	// 	}
	// });

	// $('#maxRotation').change( function(){
	// 	lsys.maxRotation = $('#maxRotation').val();
	// });

	// $('#randomRotation').change( function() {
	// 	lsys.randomRotation = $('#randomRotation').prop("checked");
	// 	console.log(lsys.randomRotation);
	// 		$('#maxRotationDiv').toggle();
	// });

	// $('#matrix').change( function() {
	// 	lsys.pushAndPop = $('#matrix').prop("checked");
	// });

	// $('#setStepLength').mousemove( function() {
	// 	lsys.stepLength = $('#setStepLength').val();
	// 	$('#stepLength').text(lsys.stepLength);
	// 	lsys.drawLsys();
	// });
});