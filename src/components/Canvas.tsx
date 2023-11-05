"use client";
import { useRef, useEffect, useState, useContext } from "react";
import { CanvasContext } from "@/core/contexts/CanvasContext";

const Canvas: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const {
		canvas,
		canvasContext: context,
		screenSize,
		setCanvas,
		setCanvasRef,
		setCanvasContext,
		setScreenSize,
	} = useContext(CanvasContext);
	const [pixelRatio, setPixelRatio] = useState(0);

	const handleResize = () => {
		setScreenSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useEffect(() => {
		// Set initial screen size and pixel ratio
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
		setCanvasRef(canvasRef);
		setCanvas(canvasRef.current);
		setCanvasContext(canvas?.getContext("2d") ?? null);

		if (canvas && context) {
			canvas.width = screenSize.width;
			canvas.height = screenSize.height;

			canvas.style.cursor = "crosshair";
			canvas.style.width = screenSize.width + "px";
			canvas.style.height = screenSize.height + "px";

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
	}, [
		canvas,
		context,
		screenSize.height,
		screenSize.width,
		setCanvas,
		setCanvasRef,
		setCanvasContext,
	]);

	// const setBackgroundColor = (color: number[]) => {
	// 	var context = backgroundColor.getContext("2d");
	// 	context.fillStyle =
	// 		"rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
	// 	context.fillRect(
	// 		0,
	// 		0,
	// 		this.backgroundColor.width,
	// 		this.backgroundColor.height
	// 	);
	// 	context.fillStyle = "rgba(0, 0, 0, 0.1)";
	// 	context.fillRect(0, 0, this.backgroundColor.width, 1);
	// };

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
