// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
/*
If you want to add custom formats, create a file in this folder named: "custom-formats.ts"

Paste the following code into the file and add your desired formats and their sections between the brackets:
--------------------------------------------------------------------------------
// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts

export const Formats: FormatList = [
];
--------------------------------------------------------------------------------

If you specify a section that already exists, your format will be added to the bottom of that section.
New sections will be added to the bottom of the specified column.
The column value will be ignored for repeat sections.
*/

export const Formats: FormatList = [
	{
		section: "Pokemon Unbound",
		column: 1,
	},
	{
		name: "[Gen 8] Unbound Singles",
		mod: 'unbound',
	},
	{
		name: "[Gen 8] Unbound Doubles",
		mod: 'unbound',
		gameType: 'doubles',
	},
		{
		section: "Gym Gimmick Testing",
		column: 1,
	},
	{
		name: "[Gen 8] Unbound Water Gym",
		mod: 'unbound',
		ruleset: ['watergym']
	},
	{
		name: "[Gen 8] Unbound Fire Gym",
		mod: 'unbound',
		ruleset: ['firegym']
	},
	{
		name: "[Gen 8] Unbound Grass Gym",
		mod: 'unbound',
		ruleset: ['grassgym']
	},
	{
		name: "[Gen 8] Unbound Ghost Gym",
		mod: 'unbound',
		ruleset: ['ghostgym']
	},
	{
		name: "[Gen 8] Unbound Flying Gym",
		mod: 'unbound',
		ruleset: ['Flyinggym']
	},
	{
		name: "[Gen 8] Unbound Psychic Gym",
		mod: 'unbound',
		ruleset: ['psychicgym']
	},
	{
		name: "[Gen 8] Unbound Steel Gym",
		mod: 'unbound',
		ruleset: ['steelgym']
	},
	{
		name: "[Gen 8] Unbound Dark Gym",
		mod: 'unbound',
		ruleset: ['Darkgym']
	},
	{
		name: "[Gen 8] Unbound Ice Gym",
		mod: 'unbound',
		ruleset: ['icegym']
	},
	{
		name: "[Gen 8] Unbound Ground Gym",
		mod: 'unbound',
		ruleset: ['groundgym']
	},
	{
		name: "[Gen 8] Unbound Poison Gym",
		mod: 'unbound',
		ruleset: ['poisongym']
	},
	{
		name: "[Gen 8] Unbound Dragon Gym",
		mod: 'unbound',
		ruleset: ['dragongym']
	},
];
