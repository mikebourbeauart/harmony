"use client";

import { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { IColor } from "@/lib/color/types/color";
import { CanvasContext } from "@/core/contexts/CanvasContext";

const color: IColor[] = [
	{
		hex: "#ffffff",
		value: [255, 255, 255],
	},
];

export function ColorPicker() {
	const { color, setColor } = useContext(CanvasContext);
	const [open, setOpen] = useState(false);
	// const [color, setColor] = useState("#000000");

	// Have to use inline style for dynamic background color
	const buttonStyle = {
		backgroundColor: color,
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="default"
					role="button"
					aria-expanded={open}
					style={buttonStyle} // Apply the inline style here
					className="w-fit justify-between rounded-full"
				></Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0 bg-black" side="right">
				{/* <Command>
					<CommandInput placeholder="Search brushes..." />
					<CommandEmpty>No framework found.</CommandEmpty>
					<CommandGroup>
						{brushes.map((brushes) => (
							<CommandItem
								key={brushes.value}
								value={brushes.value}
								onSelect={(currentValue) => {
									setValue(
										currentValue === value
											? ""
											: currentValue
									);
									setOpen(false);
								}}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === brushes.value
											? "opacity-100"
											: "opacity-0"
									)}
								/>
								{brushes.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command> */}
				<HexColorPicker color={color} onChange={setColor} />
			</PopoverContent>
		</Popover>
	);
}

export default ColorPicker;
