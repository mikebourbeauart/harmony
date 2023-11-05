"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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

import { IBrush } from "@/lib/brushes/types/brush";

const brushes: IBrush[] = [
	{
		value: "sketchy",
		label: "Sketchy",
	},
	{
		value: "chrome",
		label: "Chrome",
	},
	{
		value: "fur",
		label: "Fur",
	},
];

export function BrushCombobox() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(brushes[0].value);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-fit justify-between "
				>
					{value
						? brushes.find((brushes) => brushes.value === value)
								?.label
						: "Sketchy"}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0 bg-black" side="right">
				<Command>
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
				</Command>
			</PopoverContent>
		</Popover>
	);
}

export default BrushCombobox;
