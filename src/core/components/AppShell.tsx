"use client";
import { CanvasContext } from "@/core/contexts/CanvasContext";
import { useRef, useState } from "react";

function AppShell({ children }: React.PropsWithChildren<{}>) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
	const [canvasContext, setCanvasContext] =
		useState<CanvasRenderingContext2D | null>(null);
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

	return (
		<CanvasContext.Provider
			value={{
				canvas,
				canvasContext,
				screenSize,
				setCanvas,
				setCanvasContext,
				setScreenSize,
			}}
		>
			{children}
		</CanvasContext.Provider>
	);
}

export default AppShell;
