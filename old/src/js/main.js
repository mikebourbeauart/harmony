const circles = require("./brushes/circles.js");
const chrome = require("./brushes/chrome.js");
const fur = require("./brushes/fur.js");
const grid = require("./brushes/grid.js");
const longfur = require("./brushes/longfur.js");
const ribbon = require("./brushes/ribbon.js");
const shaded = require("./brushes/shaded.js");
const simple = require("./brushes/simple.js");
const sketchy = require("./brushes/sketchy.js");
const squares = require("./brushes/squares.js");
const web = require("./brushes/web.js");
const ColorSelector = require("./colorselector.js");
const Palette = require("./palette.js");
const Menu = require("./menu.js");
const About = require("./about.js");

const REV = 7,
	BRUSHES = [
		"sketchy",
		"shaded",
		"chrome",
		"fur",
		"longfur",
		"web",
		"",
		"simple",
		"squares",
		"ribbon",
		"",
		"circles",
		"grid",
	],
	USER_AGENT = navigator.userAgent.toLowerCase();

var SCREEN_WIDTH = window.innerWidth,
	SCREEN_HEIGHT = window.innerHeight,
	PIXEL_RATIO = Math.max(1, window.devicePixelRatio),
	BRUSH_SIZE = 1,
	BRUSH_PRESSURE = 1,
	COLOR = [0, 0, 0],
	BACKGROUND_COLOR = [250, 250, 250],
	STORAGE = window.localStorage,
	brush,
	saveTimeOut,
	wacom,
	i,
	mouseX = 0,
	mouseY = 0,
	container,
	foregroundColorSelector,
	backgroundColorSelector,
	menu,
	about,
	canvas,
	flattenCanvas,
	context,
	isFgColorSelectorVisible = false,
	isBgColorSelectorVisible = false,
	isAboutVisible = false,
	isMenuMouseOver = false,
	shiftKeyIsDown = false,
	altKeyIsDown = false;

init();

function init() {
	var hash, palette, embed, localStorageImage;

	if (USER_AGENT.search("android") > -1 || USER_AGENT.search("iphone") > -1)
		BRUSH_SIZE = 2;

	if (USER_AGENT.search("safari") > -1 && USER_AGENT.search("chrome") == -1)
		// Safari
		STORAGE = false;

	document.body.style.backgroundRepeat = "no-repeat";
	document.body.style.backgroundPosition = "center center";

	container = document.createElement("div");
	document.body.appendChild(container);

	/*
	 * TODO: In some browsers a naste "Plugin Missing" window appears and people is getting confused.
	 * Disabling it until a better way to handle it appears.
	 *
	 * embed = document.createElement('embed');
	 * embed.id = 'wacom-plugin';
	 * embed.type = 'application/x-wacom-tablet';
	 * document.body.appendChild(embed);
	 *
	 * wacom = document.embeds["wacom-plugin"];
	 */

	canvas = document.createElement("canvas");
	canvas.width = SCREEN_WIDTH * PIXEL_RATIO;
	canvas.height = SCREEN_HEIGHT * PIXEL_RATIO;

	canvas.style.cursor = "crosshair";
	canvas.style.width = SCREEN_WIDTH + "px";
	canvas.style.height = SCREEN_HEIGHT + "px";
	container.appendChild(canvas);

	context = canvas.getContext("2d");

	flattenCanvas = document.createElement("canvas");
	flattenCanvas.width = SCREEN_WIDTH * PIXEL_RATIO;
	flattenCanvas.height = SCREEN_HEIGHT * PIXEL_RATIO;

	palette = new Palette();

	foregroundColorSelector = new ColorSelector(palette);
	foregroundColorSelector.addEventListener(
		"change",
		onForegroundColorSelectorChange,
		{ passive: false }
	);
	container.appendChild(foregroundColorSelector.container);

	backgroundColorSelector = new ColorSelector(palette);
	backgroundColorSelector.addEventListener(
		"change",
		onBackgroundColorSelectorChange,
		{ passive: false }
	);
	container.appendChild(backgroundColorSelector.container);

	menu = new Menu(COLOR, BACKGROUND_COLOR, BRUSHES);
	menu.foregroundColor.addEventListener("click", onMenuForegroundColor, {
		passive: false,
	});
	menu.foregroundColor.addEventListener("touchend", onMenuForegroundColor, {
		passive: false,
	});
	menu.backgroundColor.addEventListener("click", onMenuBackgroundColor, {
		passive: false,
	});
	menu.backgroundColor.addEventListener("touchend", onMenuBackgroundColor, {
		passive: false,
	});
	menu.selector.addEventListener("change", onMenuSelectorChange, {
		passive: false,
	});
	menu.save.addEventListener("click", onMenuSave, { passive: false });
	menu.save.addEventListener("touchend", onMenuSave, { passive: false });
	menu.clear.addEventListener("click", onMenuClear, { passive: false });
	menu.clear.addEventListener("touchend", onMenuClear, { passive: false });
	menu.about.addEventListener("click", onMenuAbout, { passive: false });
	menu.about.addEventListener("touchend", onMenuAbout, { passive: false });
	menu.container.addEventListener("mouseover", onMenuMouseOver, {
		passive: false,
	});
	menu.container.addEventListener("mouseout", onMenuMouseOut, {
		passive: false,
	});
	container.appendChild(menu.container);

	if (STORAGE) {
		if (localStorage.canvas) {
			localStorageImage = new Image();

			localStorageImage.addEventListener(
				"load",
				function (event) {
					localStorageImage.removeEventListener(
						event.type,
						arguments.callee,
						false
					);
					context.drawImage(localStorageImage, 0, 0);
				},
				{ passive: false }
			);

			localStorageImage.src = localStorage.canvas;
		}

		if (localStorage.brush_color_red) {
			COLOR[0] = localStorage.brush_color_red;
			COLOR[1] = localStorage.brush_color_green;
			COLOR[2] = localStorage.brush_color_blue;
		}

		if (localStorage.background_color_red) {
			BACKGROUND_COLOR[0] = localStorage.background_color_red;
			BACKGROUND_COLOR[1] = localStorage.background_color_green;
			BACKGROUND_COLOR[2] = localStorage.background_color_blue;
		}
	}

	foregroundColorSelector.setColor(COLOR);
	backgroundColorSelector.setColor(BACKGROUND_COLOR);

	if (window.location.hash) {
		hash = window.location.hash.substr(1, window.location.hash.length);

		for (i = 0; i < BRUSHES.length; i++) {
			if (hash == BRUSHES[i]) {
				brush = eval("new " + BRUSHES[i] + "(context)");
				menu.selector.selectedIndex = i;
				break;
			}
		}
	}

	if (!brush) {
		brush = eval("new " + BRUSHES[0] + "(context)");
	}

	about = new About(REV);
	container.appendChild(about.container);

	window.addEventListener("mousemove", onWindowMouseMove, { passive: false });
	window.addEventListener("resize", onWindowResize, { passive: false });
	window.addEventListener("keydown", onWindowKeyDown, { passive: false });
	window.addEventListener("keyup", onWindowKeyUp, { passive: false });
	window.addEventListener("blur", onWindowBlur, { passive: false });

	document.addEventListener("mousedown", onDocumentMouseDown, {
		passive: false,
	});
	document.addEventListener("mouseout", onDocumentMouseOut, {
		passive: false,
	});

	document.addEventListener("dragenter", onDocumentDragEnter, {
		passive: false,
	});
	document.addEventListener("dragover", onDocumentDragOver, {
		passive: false,
	});
	document.addEventListener("drop", onDocumentDrop, { passive: false });

	canvas.addEventListener("mousedown", onCanvasMouseDown, { passive: false });
	canvas.addEventListener("touchstart", onCanvasTouchStart, {
		passive: false,
	});

	onWindowResize(null);
}

// WINDOW

function onWindowMouseMove(event) {
	mouseX = event.clientX;
	mouseY = event.clientY;
}

function onWindowResize() {
	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;

	menu.container.style.left =
		(SCREEN_WIDTH - menu.container.offsetWidth) / 2 + "px";

	about.container.style.left =
		(SCREEN_WIDTH - about.container.offsetWidth) / 2 + "px";
	about.container.style.top =
		(SCREEN_HEIGHT - about.container.offsetHeight) / 2 + "px";
}

function onWindowKeyDown(event) {
	if (shiftKeyIsDown) return;

	switch (event.keyCode) {
		case 16: // Shift
			shiftKeyIsDown = true;
			foregroundColorSelector.container.style.left = mouseX - 125 + "px";
			foregroundColorSelector.container.style.top = mouseY - 125 + "px";
			foregroundColorSelector.container.style.visibility = "visible";
			break;

		case 18: // Alt
			altKeyIsDown = true;
			break;

		case 68: // d
			if (BRUSH_SIZE > 1) BRUSH_SIZE--;
			break;

		case 70: // f
			BRUSH_SIZE++;
			break;
	}
}

function onWindowKeyUp(event) {
	switch (event.keyCode) {
		case 16: // Shift
			shiftKeyIsDown = false;
			foregroundColorSelector.container.style.visibility = "hidden";
			break;

		case 18: // Alt
			altKeyIsDown = false;
			break;

		case 82: // r
			brush.destroy();
			brush = eval(
				"new " + BRUSHES[menu.selector.selectedIndex] + "(context)"
			);
			break;
		case 66: // b
			document.body.style.backgroundImage = null;
			break;
	}

	context.lineCap = BRUSH_SIZE == 1 ? "butt" : "round";
}

function onWindowBlur(event) {
	shiftKeyIsDown = false;
	altKeyIsDown = false;
}

// DOCUMENT

function onDocumentMouseDown(event) {
	if (!isMenuMouseOver) event.preventDefault();
}

function onDocumentMouseOut(event) {
	onCanvasMouseUp();
}

function onDocumentDragEnter(event) {
	event.stopPropagation();
	event.preventDefault();
}

function onDocumentDragOver(event) {
	event.stopPropagation();
	event.preventDefault();
}

function onDocumentDrop(event) {
	event.stopPropagation();
	event.preventDefault();

	var file = event.dataTransfer.files[0];

	if (file.type.match(/image.*/)) {
		/*
		 * TODO: This seems to work on Chromium. But not on Firefox.
		 * Better wait for proper FileAPI?
		 */

		var fileString = event.dataTransfer.getData("text").split("\n");
		document.body.style.backgroundImage = "url(" + fileString[0] + ")";
	}
}

// COLOR SELECTORS

function onForegroundColorSelectorChange(event) {
	COLOR = foregroundColorSelector.getColor();

	menu.setForegroundColor(COLOR);

	if (STORAGE) {
		localStorage.brush_color_red = COLOR[0];
		localStorage.brush_color_green = COLOR[1];
		localStorage.brush_color_blue = COLOR[2];
	}
}

function onBackgroundColorSelectorChange(event) {
	BACKGROUND_COLOR = backgroundColorSelector.getColor();

	menu.setBackgroundColor(BACKGROUND_COLOR);

	document.body.style.backgroundColor =
		"rgb(" +
		BACKGROUND_COLOR[0] +
		", " +
		BACKGROUND_COLOR[1] +
		", " +
		BACKGROUND_COLOR[2] +
		")";

	if (STORAGE) {
		localStorage.background_color_red = BACKGROUND_COLOR[0];
		localStorage.background_color_green = BACKGROUND_COLOR[1];
		localStorage.background_color_blue = BACKGROUND_COLOR[2];
	}
}

// MENU

function onMenuForegroundColor() {
	cleanPopUps();

	foregroundColorSelector.show();
	foregroundColorSelector.container.style.left =
		(SCREEN_WIDTH - foregroundColorSelector.container.offsetWidth) / 2 +
		"px";
	foregroundColorSelector.container.style.top =
		(SCREEN_HEIGHT - foregroundColorSelector.container.offsetHeight) / 2 +
		"px";

	isFgColorSelectorVisible = true;
}

function onMenuBackgroundColor() {
	cleanPopUps();

	backgroundColorSelector.show();
	backgroundColorSelector.container.style.left =
		(SCREEN_WIDTH - backgroundColorSelector.container.offsetWidth) / 2 +
		"px";
	backgroundColorSelector.container.style.top =
		(SCREEN_HEIGHT - backgroundColorSelector.container.offsetHeight) / 2 +
		"px";

	isBgColorSelectorVisible = true;
}

function onMenuSelectorChange() {
	if (BRUSHES[menu.selector.selectedIndex] == "") return;

	brush.destroy();
	brush = eval("new " + BRUSHES[menu.selector.selectedIndex] + "(context)");

	window.location.hash = BRUSHES[menu.selector.selectedIndex];
}

function onMenuMouseOver() {
	isMenuMouseOver = true;
}

function onMenuMouseOut() {
	isMenuMouseOver = false;
}

function onMenuSave() {
	// window.open(canvas.toDataURL('image/png'),'mywindow');
	flatten();
	window.open(flattenCanvas.toDataURL("image/png"), "mywindow");
}

function onMenuClear() {
	if (!confirm("Are you sure?")) return;

	context.clearRect(
		0,
		0,
		SCREEN_WIDTH * PIXEL_RATIO,
		SCREEN_HEIGHT * PIXEL_RATIO
	);

	saveToLocalStorage();

	brush.destroy();
	brush = eval("new " + BRUSHES[menu.selector.selectedIndex] + "(context)");
}

function onMenuAbout() {
	cleanPopUps();

	isAboutVisible = true;
	about.show();
}

// CANVAS

function onCanvasMouseDown(event) {
	var data, position;

	clearTimeout(saveTimeOut);
	cleanPopUps();

	if (altKeyIsDown) {
		flatten();

		data = flattenCanvas
			.getContext("2d")
			.getImageData(0, 0, flattenCanvas.width, flattenCanvas.height).data;
		position = (event.clientX + event.clientY * canvas.width) * 4;

		foregroundColorSelector.setColor([
			data[position],
			data[position + 1],
			data[position + 2],
		]);

		return;
	}

	BRUSH_PRESSURE = wacom && wacom.isWacom ? wacom.pressure : 1;

	brush.strokeStart(event.clientX * PIXEL_RATIO, event.clientY * PIXEL_RATIO);

	window.addEventListener("mousemove", onCanvasMouseMove, { passive: false });
	window.addEventListener("mouseup", onCanvasMouseUp, { passive: false });
}

function onCanvasMouseMove(event) {
	BRUSH_PRESSURE = wacom && wacom.isWacom ? wacom.pressure : 1;

	brush.stroke(
		event.clientX * PIXEL_RATIO,
		event.clientY * PIXEL_RATIO,
		COLOR,
		BRUSH_SIZE,
		BRUSH_PRESSURE
	);
}

function onCanvasMouseUp() {
	brush.strokeEnd();

	window.removeEventListener("mousemove", onCanvasMouseMove, false);
	window.removeEventListener("mouseup", onCanvasMouseUp, false);

	if (STORAGE) {
		clearTimeout(saveTimeOut);
		saveTimeOut = setTimeout(saveToLocalStorage, 2000, true);
	}
}

//

function onCanvasTouchStart(event) {
	cleanPopUps();

	if (event.touches.length == 1) {
		event.preventDefault();

		brush.strokeStart(
			event.touches[0].pageX * PIXEL_RATIO,
			event.touches[0].pageY * PIXEL_RATIO
		);

		window.addEventListener("touchmove", onCanvasTouchMove, {
			passive: false,
		});
		window.addEventListener("touchend", onCanvasTouchEnd, {
			passive: false,
		});
	}
}

function onCanvasTouchMove(event) {
	if (event.touches.length == 1) {
		event.preventDefault();
		brush.stroke(
			event.touches[0].pageX * PIXEL_RATIO,
			event.touches[0].pageY * PIXEL_RATIO,
			COLOR,
			BRUSH_SIZE,
			BRUSH_PRESSURE
		);
	}
}

function onCanvasTouchEnd(event) {
	if (event.touches.length == 0) {
		event.preventDefault();

		brush.strokeEnd();

		window.removeEventListener("touchmove", onCanvasTouchMove, false);
		window.removeEventListener("touchend", onCanvasTouchEnd, false);
	}
}

//

function saveToLocalStorage() {
	localStorage.canvas = canvas.toDataURL("image/png");
}

function flatten() {
	var context = flattenCanvas.getContext("2d");

	context.fillStyle =
		"rgb(" +
		BACKGROUND_COLOR[0] +
		", " +
		BACKGROUND_COLOR[1] +
		", " +
		BACKGROUND_COLOR[2] +
		")";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.drawImage(canvas, 0, 0);
}

function cleanPopUps() {
	if (isFgColorSelectorVisible) {
		foregroundColorSelector.hide();
		isFgColorSelectorVisible = false;
	}

	if (isBgColorSelectorVisible) {
		backgroundColorSelector.hide();
		isBgColorSelectorVisible = false;
	}

	if (isAboutVisible) {
		about.hide();
		isAboutVisible = false;
	}
}
