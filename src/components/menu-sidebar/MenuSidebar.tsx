"use client";
import * as React from "react";

import BrushDropdown from "./BrushDropdown";
import BrushCombobox from "./BrushCombobox";
import ColorPicker from "./ColorPicker";

const MenuSidebar: React.FC = () => {
	return (
		<div className="fixed left-0 top-1/2 transform -translate-y-1/2 flex flex-col bg-gray-200 rounded-md text-black items-center">
			<BrushCombobox />
			<ColorPicker />
			<div>Background</div>
			<div>Save</div>
			<div>Clear</div>
			<div>About</div>
		</div>
	);
};

export default MenuSidebar;
