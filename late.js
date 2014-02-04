monotype.late = function(r,opt){
	var m = monotype(r,opt)
	, strhml = function(t){
		return (t[0] === '<' && $(t).length)
	}, jqtxt = function(n){
		return n.jquery?n[0]:(strhml(n))?$(n)[0]:document.createTextNode(n);
	}
	m.remove = function(n,R){
		R = m.range();
		R.deleteContents();
		monotype.restore(R);
		m = monotype(m,opt);
		return m;
	}
	m.insert = function(n,R){
		n = jqtxt(n);
		R = m.range();
		R.deleteContents();
		R.insertNode(n);
		R.selectNodeContents(n);
		monotype.restore(R);
		m = monotype(m,opt);
		return m;
	}
	m.wrap = function(n,R){
		var jq;
		n = jqtxt(n);
		R = m.range();
		if(monotype.text(R.startContainer) || monotype.text(R.endContainer)){
			var b = R.cloneContents();
			R.deleteContents();
			jq = $(n);
			jq.html(b);
			jq = jq[0];
			R.insertNode(jq);
		}else{
			R.surroundContents(n);
		}
		R.selectNodeContents(jq||n);
		monotype.restore(R);
		m = monotype(m,opt);
		return m;
	}
	return m;
}