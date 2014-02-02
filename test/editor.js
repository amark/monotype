// Syntax code editor in 20 LOC with fancy fonts!
$(function(){
	var prevent = {
		'13': '\n'
		,'9': '\t'
	}, write = $('[contenteditable=true]').keyup(function(e){
		var r = monotype(write);
		write.html(hljs.highlight('javascript', write.text()).value);
		r.restore();
	}).keydown(function(e){
		if(e.keyCode in prevent){
			e.preventDefault();
			var r = monotype(write);
			write.html(write.text().slice(0, r.s)
				+ prevent[e.keyCode] +
			write.text().slice(r.e));
			r.e = ++r.s;
			r.restore();
		}
	});
});
/* Courtesy the excellent Monotype, Highlight.js, and jQuery libraries! */