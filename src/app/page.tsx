// "use client";
import { useEffect, useState } from "react";

import Canvas from "@/components/Canvas";

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

export default function Home() {
	// const REV = 7,
	// 	BRUSHES = [
	// 		"sketchy",
	// 		"shaded",
	// 		"chrome",
	// 		"fur",
	// 		"longfur",
	// 		"web",
	// 		"",
	// 		"simple",
	// 		"squares",
	// 		"ribbon",
	// 		"",
	// 		"circles",
	// 		"grid",
	// 	];

	return (
		<main className="flex min-h-screen flex-col items-center justify-between ">
			<Canvas />
		</main>
	);
}
