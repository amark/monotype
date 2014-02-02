$(function(){
	$('#size').keyup(function(e){
		var val = $(this).val();
		$('html, body, pre, code').css({
			'font-size': val
		});
	});
	$('#theme').change(function(e){
		var val = $(this).val();
		$('#style').remove();
		$('head').append('<link id="style" rel="stylesheet" href="http://yandex.st/highlightjs/8.0/styles/'+ val +'.min.css">');
	});
	$('#font').keyup(function(e){
		var val = $(this).val();
		$('html, body, pre, code').css({
			'font-family': val
		});
		WebFontConfig = {
			google: {families: [val]}
		};
		if(window.WebFont && WebFont.load){
			return WebFont.load(WebFontConfig);
		}
		(function() {
			var wf = document.createElement('script');
			wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
				'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
			wf.type = 'text/javascript';
			wf.async = 'true';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(wf, s);
			console.log("fontAPI");
			console.log(val);
		})();
	});
});