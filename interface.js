/*
	interface.js: Controls for interacting with the L-system
*/

$(document).ready( function() {
	lsys.calculateString();

	$('#generate').click(() => {
		$('#error-message').text('');	// clear any left-over errors

		// extract raw text from inputs
		const axiom = $('#axiom').val();
		const productionRules = $('#prod-rules').val();
		const graphicsInstructions = $('#graphics-instructs').val();

		if (!axiom) return showError('Axiom', "The axiom cannot be empty");

		// attempt to parse inputted production rules
		parseProductionRules(productionRules, (err, rules) => {
			if (err) return showError('Production Rule Parse Error', err.message);

			// TODO: ... add the rules to the lsys

			// attempt to parse inputted graphics instructions
			parseActions(graphicsInstructions, (err, actions) => {
				if (err) return showError('Graphics Instructions Parse Error', err.message);

				// TODO: ... add actions to lsys

				lsys.axiom = axiom;
				lsys.calculateString();
			});
		});
	});

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