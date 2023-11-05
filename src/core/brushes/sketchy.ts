import React, { useState, useRef, useEffect, useContext } from "react";
import { CanvasContext } from "../contexts/CanvasContext";

const Sketchy = () => {
	const canvasContext = useContext(CanvasContext);
	const canvas = canvasContext.canvasRef?.current;
	const context = canvasContext.canvasContext;
	const [prevMouseX, setPrevMouseX] = useState(0);
	const [prevMouseY, setPrevMouseY] = useState(0);
	const [points, setPoints] = useState<[number, number][]>([]);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (canvasContext.canvasRef?.current) {
			context!.globalCompositeOperation = "source-over";
		}
	}, []);

	const destroy = () => {};

	const strokeStart = (mouseX: number, mouseY: number) => {
		setPrevMouseX(mouseX);
		setPrevMouseY(mouseY);
	};

	const stroke = (
		mouseX: number,
		mouseY: number,
		COLOR: [number, number, number],
		BRUSH_SIZE: number,
		BRUSH_PRESSURE: number
	) => {
		var i, dx, dy, d;

		points.push([mouseX, mouseY]);

		context!.lineWidth = BRUSH_SIZE;
		context!.strokeStyle =
			"rgba(" +
			COLOR[0] +
			", " +
			COLOR[1] +
			", " +
			COLOR[2] +
			", " +
			0.05 * BRUSH_PRESSURE +
			")";

		context!.beginPath();
		context!.moveTo(prevMouseX, prevMouseY);
		context!.lineTo(mouseX, mouseY);
		context!.stroke();

		for (i = 0; i < points.length; i++) {
			dx = points[i][0] - points[count][0];
			dy = points[i][1] - points[count][1];
			d = dx * dx + dy * dy;

			if (d < 4000 && Math.random() > d / 2000) {
				context!.beginPath();
				context!.moveTo(
					points[count][0] + dx * 0.3,
					points[count][1] + dy * 0.3
				);
				context!.lineTo(
					points[i][0] - dx * 0.3,
					points[i][1] - dy * 0.3
				);
				context!.stroke();
			}
		}

		setPrevMouseX(mouseX);
		setPrevMouseY(mouseY);

		setCount(count + 1);
	};

	const strokeEnd = () => {};
};

export default Sketchy;
