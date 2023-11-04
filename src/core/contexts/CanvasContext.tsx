"use client";
import React, { createContext } from "react";

type CanvasContextType = {
	canvas: HTMLCanvasElement | null;
	canvasContext: CanvasRenderingContext2D | null;
	screenSize: { width: number; height: number };
	setCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
	setCanvasContext: React.Dispatch<
		React.SetStateAction<CanvasRenderingContext2D | null>
	>;
	setScreenSize: React.Dispatch<
		React.SetStateAction<{ width: number; height: number }>
	>;
};

const initialCanvasContext: CanvasContextType = {
	canvas: null,
	canvasContext: null,
	screenSize: { width: 0, height: 0 },
	setCanvas: () => {},
	setCanvasContext: () => {},
	setScreenSize: () => {},
};

export const CanvasContext =
	createContext<CanvasContextType>(initialCanvasContext);
