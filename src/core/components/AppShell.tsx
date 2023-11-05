"use client";
import { CanvasContext } from "@/core/contexts/CanvasContext";
import { useRef, useState } from "react";

function AppShell({ children }: React.PropsWithChildren<{}>) {
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
	const [canvasRef, setCanvasRef] =
		useState<React.RefObject<HTMLCanvasElement> | null>(null);
	const [canvasContext, setCanvasContext] =
		useState<CanvasRenderingContext2D | null>(null);
	const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
	const [pixelRatio, setPixelRatio] = useState(0);
	const [brushSize, setBrushSize] = useState(1);
	const [brushPressure, setBrushPressure] = useState(1);
	const [color, setColor] = useState("#0af42d");
	const [backgroundColor, setBackgroundColor] = useState([250, 250, 250]);
	const [storage, setStorage] = useState(null);
	const [brush, setBrush] = useState(null);
	const [saveTimeOut, setSaveTimeOut] = useState(null);
	const [wacom, setWacom] = useState(null);
	const [i, setI] = useState(0);
	const [mouseX, setMouseX] = useState(0);
	const [mouseY, setMouseY] = useState(0);
	const [container, setContainer] = useState(null);
	const [foregroundColorSelector, setForegroundColorSelector] =
		useState(null);
	const [backgroundColorSelector, setBackgroundColorSelector] =
		useState(null);
	const [menu, setMenu] = useState(null);
	const [about, setAbout] = useState(null);
	const [flattenCanvas, setFlattenCanvas] = useState(null);
	const [isFgColorSelectorVisible, setIsFgColorSelectorVisible] =
		useState(false);
	const [isBgColorSelectorVisible, setIsBgColorSelectorVisible] =
		useState(false);
	const [isAboutVisible, setIsAboutVisible] = useState(false);
	const [isMenuMouseOver, setIsMenuMouseOver] = useState(false);
	const [shiftKeyIsDown, setShiftKeyIsDown] = useState(false);
	const [altKeyIsDown, setAltKeyIsDown] = useState(false);

	return (
		<CanvasContext.Provider
			value={{
				canvas,
				canvasRef,
				canvasContext,
				screenSize,
				pixelRatio,
				brushSize,
				brushPressure,
				color,
				backgroundColor,
				storage,
				brush,
				saveTimeOut,
				wacom,
				i,
				mouseX,
				mouseY,
				container,
				foregroundColorSelector,
				backgroundColorSelector,
				menu,
				about,
				flattenCanvas,
				isFgColorSelectorVisible,
				isBgColorSelectorVisible,
				isAboutVisible,
				isMenuMouseOver,
				shiftKeyIsDown,
				altKeyIsDown,
				setColor,
				setCanvas,
				setCanvasRef,
				setCanvasContext,
				setScreenSize,
			}}
		>
			{children}
		</CanvasContext.Provider>
	);
}

export default AppShell;
