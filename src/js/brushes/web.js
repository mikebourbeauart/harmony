function web(context) {
	this.init(context);
}

web.prototype = {
	context: null,

	prevMouseX: null,
	prevMouseY: null,

	points: null,
	count: null,

	init: function (context) {
		this.context = context;
		this.context.globalCompositeOperation = "source-over";

		this.points = new Array();
		this.count = 0;
	},

	destroy: function () {},

	strokeStart: function (mouseX, mouseY) {
		this.prevMouseX = mouseX;
		this.prevMouseY = mouseY;
	},

	stroke: function (mouseX, mouseY, COLOR, BRUSH_SIZE, BRUSH_PRESSURE) {
		var i, dx, dy, d;

		this.points.push([mouseX, mouseY]);

		this.context.lineWidth = BRUSH_SIZE;
		this.context.strokeStyle =
			"rgba(" +
			COLOR[0] +
			", " +
			COLOR[1] +
			", " +
			COLOR[2] +
			", " +
			0.5 * BRUSH_PRESSURE +
			")";
		this.context.beginPath();
		this.context.moveTo(this.prevMouseX, this.prevMouseY);
		this.context.lineTo(mouseX, mouseY);
		this.context.stroke();

		this.context.strokeStyle =
			"rgba(" +
			COLOR[0] +
			", " +
			COLOR[1] +
			", " +
			COLOR[2] +
			", " +
			0.1 * BRUSH_PRESSURE +
			")";

		for (i = 0; i < this.points.length; i++) {
			dx = this.points[i][0] - this.points[this.count][0];
			dy = this.points[i][1] - this.points[this.count][1];
			d = dx * dx + dy * dy;

			if (d < 2500 && Math.random() > 0.9) {
				this.context.beginPath();
				this.context.moveTo(
					this.points[this.count][0],
					this.points[this.count][1]
				);
				this.context.lineTo(this.points[i][0], this.points[i][1]);
				this.context.stroke();
			}
		}

		this.prevMouseX = mouseX;
		this.prevMouseY = mouseY;

		this.count++;
	},

	strokeEnd: function () {},
};

module.exports = web;
