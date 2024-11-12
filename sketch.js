/*
 #generativeart #p5js #generativemusic
 */

// Bouncing ball sound
let monoSynth;
let bballs;
let outerDiameter;
let circles;

function setup() {
  createCanvas(windowWidth, windowHeight);
	describe("Bouncing ball increasing radius when hitting outer Circle and playing sound");
	frameRate(30);
	outerDiameter = 1000 * 0.69;
	describe("bouncing ball");
  monoSynth = new p5.MonoSynth();
	// not working: monoSynth.setVolume(0.5); // pan() rate()
	
	const notes = [['A3', 'G3'], ['Fb4', 'G4']]
	const num = ~~random(3) + 1;
	bballs = []
	for (let i = 0; i < num; i++) {
		bballs.push(new BouncingBall(10, notes[i % notes.length]));	
	}
	
	circles = [];
}

function draw() {
	background(0, 0, 12);
	
	push();
	translate(width/2, height/2)

	let hit = false;
	for (let bball of bballs) {
		if (bball.update()) hit = true;
		bball.show();		
	}

	if (hit) {
		circles.push({d: outerDiameter});
	}
	

	noFill()
	
	strokeWeight(1);
	for (let c of circles) {
		stroke(255-(c.d-outerDiameter))
		circle(0, 0, c.d)
		c.d += outerDiameter/50;
	}
	const maxWH = max(width, height);
	circles = circles.filter((c) => c.d < maxWH);
	
	stroke(255)
	strokeWeight(2)
	circle(0, 0, outerDiameter)
	pop();
	
	// drawPost();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawPost() {
	stroke(0);
	strokeWeight(0.7)
	for (let y = 2; y < height; y += 4) {
		line(0, y, width, y)
	}

	const ctx = drawingContext;
	const gradient = ctx.createRadialGradient(
		width/2, height/2, min(width, height)/1000, 
		width/2, height/2, max(width, height)*1.45
	);

	// Add three color stops
	gradient.addColorStop(0, color(0, 1));
	gradient.addColorStop(1, color(0, 255));

	// Set the fill style and draw a rectangle
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, width, height);
}