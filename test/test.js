$(function(){
	/*
		Tests not finished!
		How does one automate testing of human input?
	*/
	describe('Flatten',function(){
		it('Down',function(){
			var m = monotype($('#imgs'))
			, c = m.root.contents()
			, z = m.root[0]
			, t = m.crux(z, 11);
			expect(t.container).to.be(c.last()[0]);
			expect(t.offset).to.be(0);
			// test [text, 1] vs [text, 4]
			m.root.on('keyup',function(e){
				var r = monotype(m.root);
				m.root.html(m.root.html());
			m.root.children().last().remove();
				r.restore();
			});
		});
		var m = monotype($('#nest'));
		m.root.on('keyup',function(e){
			var r = monotype(m.root);
			m.root.html(m.root.html());
			r.restore();
		});
		it('Forwards',function(){
			var c = m.root.contents()
			, z = c[0];
			expect(z = m.next(z)).to.be(c[1]);
			expect(z = m.next(z)).to.be(c[2]);
			expect(z = m.next(z)).to.be($(c[3]).contents()[0]);
			expect(z = m.next(z)).to.be(c[4]);
			expect(z = m.next(z)).to.be($(c[5]).contents()[0]);
			expect(z = m.next(z)).to.be($($(c[5]).contents()[1]).contents()[0]);
			expect(z = m.next(z)).to.be(c[6]);
			expect(z = m.next(z)).to.be(c[7]);
			expect(z = m.next(z)).to.be(c[8]);
			expect(z = m.next(z)).to.be($(c[9]).contents()[0]);
			expect(z = m.next(z)).to.be($(c[9]).contents()[1]);
			expect(z = m.next(z)).to.be($(c[9]).contents()[2]);
			expect(z = m.next(z)).to.be($($($(c[9]).contents()[3]).contents()[0]).contents()[0]);
			expect(z = m.next(z)).to.be(c[10]);
			expect(z = m.next(z)).to.be(c[11]);
			expect(z = m.next(z)).to.be(c[12]);
			expect(z = m.next(z)).to.be(c[13]);
			expect(z = m.next(z)).to.be(null);
			expect(z = m.next(z)).to.be(null);
		});
		it('Backwards',function(){
			var c = m.root.contents()
			, z = c.last()[0];
			expect(z = m.prev(z)).to.be(c[12]);
			expect(z = m.prev(z)).to.be(c[11]);
			expect(z = m.prev(z)).to.be(c[10]);
			expect(z = m.prev(z)).to.be($($($(c[9]).contents()[3]).contents()[0]).contents()[0]);
			expect(z = m.prev(z)).to.be($(c[9]).contents()[2]);
			expect(z = m.prev(z)).to.be($(c[9]).contents()[1]);
			expect(z = m.prev(z)).to.be($(c[9]).contents()[0]);
			expect(z = m.prev(z)).to.be(c[8]);
			expect(z = m.prev(z)).to.be(c[7]);
			expect(z = m.prev(z)).to.be(c[6]);
			expect(z = m.prev(z)).to.be($($(c[5]).contents()[1]).contents()[0]);
			expect(z = m.prev(z)).to.be($(c[5]).contents()[0]);
			expect(z = m.prev(z)).to.be(c[4]);
			expect(z = m.prev(z)).to.be($(c[3]).contents()[0]);
			expect(z = m.prev(z)).to.be(c[2]);
			expect(z = m.prev(z)).to.be(c[1]);
			expect(z = m.prev(z)).to.be(c[0]);
			expect(z = m.prev(z)).to.be(null);
			expect(z = m.prev(z)).to.be(null);
		});
	});	
	var m = monotype($('#hn'));
	m.root.on('keyup',function(e){
		var r = monotype(m.root);
		m.root.html(m.root.html());
		r.restore();
	});
	mocha.run();
});