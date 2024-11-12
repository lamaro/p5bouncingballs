class BouncingBall {
	constructor(r = 10, notes) {
		const x = random(-width/5, width/5)
		const y = -height/4 + random(-height/10, height/10)
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);
		this.applyGravity();
		this.r = 10;
		this.clr = color(random(["navy", "darkred", "purple", "cyan", "orange"]));
		this.col = this.clr; // color(255, 0, 0);
		this.notes = notes || ['Fb4', 'G4'];
	}
	
	applyGravity() {
		this.acc.add(createVector(0, 1));
	}
	
	update() {
		if (this.r + this.r > outerDiameter) return;
		
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		
		const dst = this.pos.mag() + this.r;
		const hit = dst >= outerDiameter / 2;
		if (hit) {
			this.col = color(255);
	
			// bounce
			this.r += 0.5;
			const aMag = this.acc.mag() * 0.9;
			const vMag = this.vel.mag() * 0.9;
			// this.acc = this.vel.copy();
			this.pos.setMag(outerDiameter / 2 - this.r)
			this.vel = this.pos.copy().normalize().mult(-vMag)
			this.acc = this.vel.copy().mult(aMag)
			
			// play sound
			const note = random(this.notes);
			const velocity = random(0.2, 0.5);
			const time = 0;
			const dur = 1/6;
			userStartAudio();
			monoSynth.play(note, velocity, time, dur);
			
			// noLoop();
		}

		this.vel.mult(0.9);
		this.acc.mult(0.8);
		this.vel.limit(outerDiameter / 10)
		this.acc.limit(outerDiameter / 50)
		this.applyGravity();
		
		return hit;
	}
	
	show() {
		push()
		noStroke()
		this.col = lerpColor(this.col, this.clr, 0.1);
		fill(this.col)
		circle(this.pos.x, this.pos.y, this.r + this.r)
		pop()
	}
}