"use client";
import { useRef, useEffect, useState } from "react";

// let SCREEN_WIDTH = window.innerWidth,
// 	SCREEN_HEIGHT = window.innerHeight,
// 	PIXEL_RATIO = Math.max(1, window.devicePixelRatio),
// 	BRUSH_SIZE = 1,
// 	BRUSH_PRESSURE = 1,
// 	COLOR = [0, 0, 0],
// 	BACKGROUND_COLOR = [250, 250, 250],
// 	STORAGE = window.localStorage,
// 	brush,
// 	saveTimeOut,
// 	wacom,
// 	i,
// 	mouseX = 0,
// 	mouseY = 0,
// 	container,
// 	foregroundColorSelector,
// 	backgroundColorSelector,
// 	menu,
// 	about,
// 	canvas,
// 	flattenCanvas,
// 	context,
// 	isFgColorSelectorVisible = false,
// 	isBgColorSelectorVisible = false,
// 	isAboutVisible = false,
// 	isMenuMouseOver = false,
// 	shiftKeyIsDown = false,
// 	altKeyIsDown = false;

const Canvas: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
	const [pixelRatio, setPixelRatio] = useState(0);

	const handleResize = () => {
		setScreenSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useEffect(() => {
		setScreenSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});

		setPixelRatio(Math.max(1, window.devicePixelRatio));

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext("2d");

		if (canvas && context) {
			canvas.width = screenSize.width;
			canvas.height = screenSize.height;

			context.fillStyle = "white";
			context.fillRect(0, 0, canvas.width, canvas.height);

			let isDrawing = false;
			let lastX = 0;
			let lastY = 0;

			const draw = (e: MouseEvent) => {
				if (!isDrawing) return;
				context.strokeStyle = "black";
				context.lineWidth = 2;
				context.lineCap = "round";

				context.beginPath();
				context.moveTo(lastX, lastY);
				context.lineTo(e.offsetX, e.offsetY);
				context.stroke();

				lastX = e.offsetX;
				lastY = e.offsetY;
			};

			canvas.addEventListener("mousedown", (e) => {
				isDrawing = true;
				lastX = e.offsetX;
				lastY = e.offsetY;
			});

			canvas.addEventListener("mousemove", draw);
			canvas.addEventListener("mouseup", () => (isDrawing = false));
			canvas.addEventListener("mouseout", () => (isDrawing = false));
		}
	}, [screenSize.height, screenSize.width]);

	return (
		<canvas
			ref={canvasRef}
			width={screenSize.width}
			height={screenSize.height}
			className="flex w-full h-full "
		/>
	);
};

export default Canvas;
