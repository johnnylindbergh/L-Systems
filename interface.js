$(document).ready( function() {
	lsys.calculateString();

	$('#matrix').prop('checked', lsys.pushAndPop);
	$('#maxRotationDiv').hide();
	$('#generate').click( function() {
		lsys.calculateString();
	});
	$('#setXrule').change( function() {
		lsys.Xrule = $('#setXrule').val();
	});
	$('#setYrule').change( function() {
		lsys.Yrule = $('#setYrule').val();
	});
	$('#setIterations').mousemove( function() {
		lsys.iteration = $('#setIterations').val();
		$('#iterations').text(lsys.iteration);
	});
	$('#setAxiom').change( function() {
		lsys.axiom = $('#setAxiom').val();
	});
	$('#setAngle').mousemove( function() {
		lsys.angle = $('#setAngle').val();
		if (lsys.Lstring != ''){
			lsys.drawLsys();
		}
	});

	$('#maxRotation').change( function(){
		lsys.maxRotation = $('#maxRotation').val();
	});

	$('#randomRotation').change( function() {
		lsys.randomRotation = $('#randomRotation').prop("checked");
		console.log(lsys.randomRotation);
			$('#maxRotationDiv').toggle();
	});



	$('#matrix').change( function() {
		lsys.pushAndPop = $('#matrix').prop("checked");
	});

	$('#setStepLength').mousemove( function() {
		lsys.stepLength = $('#setStepLength').val();
		$('#stepLength').text(lsys.stepLength);
		lsys.drawLsys();
	});
});