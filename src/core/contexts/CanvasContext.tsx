"use client";
import React, { createContext } from "react";

type CanvasContextType = {
	canvas: HTMLCanvasElement | null;
	canvasContext: CanvasRenderingContext2D | null;
	screenSize: { width: number; height: number };
	pixelRatio: number;
	brushSize: number;
	brushPressure: number;
	color: number[];
	backgroundColor: number[];
	storage: Storage | null;
	brush: any;
	saveTimeOut: any;
	wacom: any;
	i: number;
	mouseX: number;
	mouseY: number;
	container: any;
	foregroundColorSelector: any;
	backgroundColorSelector: any;
	menu: any;
	about: any;
	flattenCanvas: any;
	isFgColorSelectorVisible: boolean;
	isBgColorSelectorVisible: boolean;
	isAboutVisible: boolean;
	isMenuMouseOver: boolean;
	shiftKeyIsDown: boolean;
	altKeyIsDown: boolean;
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
	pixelRatio: 0,
	brushSize: 1,
	brushPressure: 1,
	color: [0, 0, 0],
	backgroundColor: [250, 250, 250],
	storage: null,
	brush: null,
	saveTimeOut: null,
	wacom: null,
	i: 0,
	mouseX: 0,
	mouseY: 0,
	container: null,
	foregroundColorSelector: null,
	backgroundColorSelector: null,
	menu: null,
	about: null,
	flattenCanvas: null,
	isFgColorSelectorVisible: false,
	isBgColorSelectorVisible: false,
	isAboutVisible: false,
	isMenuMouseOver: false,
	shiftKeyIsDown: false,
	altKeyIsDown: false,
	setCanvas: () => {},
	setCanvasContext: () => {},
	setScreenSize: () => {},
};

export const CanvasContext =
	createContext<CanvasContextType>(initialCanvasContext);
