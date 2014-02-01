var monotype = monotype
|| function(r,opt){
	r = r || {};
	opt = opt || {};
	r = r.jquery? {root: r} : r;
	r.root = $(r.root || document.body);
	var range = function(n){
		var R, s, t, n = n || 0;
		if(!arguments.length) return document.createRange();
		if(!(window.Range && R instanceof Range)){
			s = window.getSelection? window.getSelection() : {};
			if(s.rangeCount){ 
				R = s.getRangeAt(n);
			} else {
				if(document.createRange){
					R = document.createRange();
					R.setStart(r.root[0], 0);
				} else 
				if (document.selection){ // <IE9
                    R = document.selection.createRange();
                    R = R.getBookmark();
                }
			}
			s.end = (s.extentNode || s.focusNode || R.startContainer);
			if(s.anchorNode === s.end){
				R.direction = s.anchorOffset <= (s.extentOffset || s.focusOffset || 0)? 1 : -1;
			} else
			if($.contains(s.anchorNode||{}, s.end||{})){
				s.end = $(s.anchorNode).contents().filter(s.end).length? s.end : $(s.end).parentsUntil(s.anchorNode).last()[0];
				R.direction = s.anchorOffset < $(s.anchorNode).contents().index(s.end)? 1 : -1; // Compare immediate descendants to see which comes first.
			} else {
				R.direction = s.anchorNode === R.endContainer? -1 : 1; // Checking against startContainer fails going backward.
			}
		}
		return R;
	}, t;
	//console.log('_______________________');
	r.R = range(0);
	r.C = {};
	r.C.R = $.extend({}, r.R);
	r.d = r.R.direction || 1;
	r.prev = function(n,d){
		return !n? null : n === r.root[0]? null
		: n[(d?'next':'previous')+'Sibling']?
			r.crux(n[(d?'next':'previous')+'Sibling'],d?-1:Infinity).container
		: r.prev($(n).parent()[0],d);
	}
	r.next = function(n){ return r.prev(n,1) }
	r.crux = function(n, o, c, i){
		return i = (o === Infinity? $(n).contents().length-1 : o),
		i = (i === -1? 0 : i),
		(c = $(n).contents()).length?
			r.crux(c = c[i < c.length? i : c.length - 1], c.nodeType === 3? 0 : o)
		: {
			container: n
			,offset: $(n).text() && o !== -1? (o === Infinity? $(n).text().length : o) : 0
		};
	}
	r.count = function(n, o){
		var g = r.crux(n, o)
		, m = g.container
		, i = g.offset || 0;
		while(m = r.prev(m)){
			i += $(m).text().length;
		}
		return i;
	}
	r.clue = function(n, o){
		var g = r.crux(n, o)
		, m = g.container
		, i = g.offset || 0
		, c = [], t;
		while(m){
			c.push({
				t: t = $(m).text()
				,n: t? 'TEXT' : m.nodeName
			});
			m = t? null : r.prev(m);
		}
		if(c.length == 1 && c[0].t){
			return [];
		}
		if((t = $(n).contents()).length && o == t.length){
			c.push(1); // Indicate that the selection is after the last element.
		}
		return c;
	}
	r.t = r.R.toString();
	r.C.s = r.clue(r.R.startContainer, r.R.startOffset);
	r.s = r.count(r.R.startContainer, r.R.startOffset);
	t = r.crux(r.R.startContainer, r.R.startOffset);
	(!t.offset && !r.C.s.length) && (r.s += 0.1); // At the beginning of a text, not at the end of a text.
	r.C.e = r.clue(r.R.endContainer, r.R.endOffset);
	r.e = (function(n, o, c, t){
		if(r.R.collapsed
		|| (o === r.R.startOffset 
		&& n === r.R.startContainer)){
			return r.s;
		} c = r.count(n, o);
		t = r.crux(n, o);
		(!t.offset && !r.C.e.length) && (c += 0.1); // Same as above.
		return c;
	})(r.R.endContainer, r.R.endOffset);
	//console.log(r.s, r.R.startOffset, r.C.s, 'M',r.d,'E', r.C.e, r.R.endOffset, r.e);
	t = r.root.text();
	r.L = t.length;
	r.T = {
		s: t.slice(r.s - 9, r.s)
		,e: t.slice(r.e, r.e + 9)
		,t: function(){ return r.T.s + r.T.e }
	}
	r.reach = function(c, o){
		o = o || {};
		o.i = o.i || o.offset || 0;
		o.$ = o.$? o.$.jquery? o.$ : $(o.$) 
		: o.container? $(o.container) : r.root;
		var n = r.crux(o.$[0], -1).container, t;
		while(n){
			t = $(n).text().length;
			if(c <= o.i + t){
				o.$ = $(n);
				o.i = c - o.i;
				n = null;
			} else {
				o.i += t;
			}
			n = r.next(n);
		}
		return o;
	}
	r.range = function(){
		//console.log('----');
		r.C = r.C || {};
		var s = r.reach(r.s)
		, st = s.$.text()
		, e = r.reach(r.e)
		, et = e.$.text()
		, R = range()
		, p = function(g, c){ // TODO: BUG! Backtracking in non-Chrome and non-IE9+ browsers. IE9 doesn't like end selections.
			if(!c || !c.length){
				return g;
			}
			var n = g.$[0], f = [], i = 0, t;
			while((n = r.next(n)) && ++i < c.length){
				t = $(n).text();
				if(t){
					n = null;
				} else {
					f.push(n);
				}
			}
			n = $(f[f.length-1] || g.$);
			t = n.parent();
			if(c[c.length-1] === 1 || (i && f.length === i)){
				return {
					i: t.contents().length
					,$: t
				}
			} if(f.length < c.length - 1){
				f = t.contents().slice(n = t.contents().index(n));
				i = f.map(function(j){ return $(this).text()? (n+j+1) : null})[0] || t.contents().length;
				f = f.slice(0, i - n);
				n = f.last()[0];
				if(g.$[0] === n){
					return g;
				}
				return {
					$: t
					,i: t.contents().index(n)
				}
			}
			return {
				i: 0
				,$: n
			};
		}
		s = p(s, r.C.s);
		e = p(e, r.C.e);
		//console.log("START", parseInt(s.i), 'in """',(s.$[0]),'""" with clue of', r.C.s, 'from original', r.s);
		//console.log("END", parseInt(e.i), 'in """',(e.$[0]),'""" with clue of', r.C.e, 'from original', r.e);
		R.setStart(s.$[0], parseInt(s.i));
		R.setEnd(e.$[0], parseInt(e.i));
		return R;
	}
	r.restore = function(R){
		if(r.R.startOffset !== r.C.R.startOffset
		|| r.R.endOffset !== r.C.R.endOffset
		|| r.R.startContainer !== r.C.R.startContainer
		|| r.R.endContainer !== r.C.R.endContainer){
			r.R = R = r.range();
		} else {
			R = r.R;
		} if(window.getSelection){
			var s = window.getSelection();
			s.removeAllRanges();
			if(s.extend && r.d < 0){
				R.esC = R.startContainer;
				R.esO = R.startOffset;
				R.setStart(R.endContainer, R.endOffset);
			}
			s.addRange(R);
			R.esC && s.extend(R.esC, R.esO);
		} else {
			if(document.body.createTextRange) { // <IE9
				var ier = document.body.createTextRange();
				ier.moveToBookmark(R);
				ier.select();
			}
		}
		return r;
	}
	return r;
}