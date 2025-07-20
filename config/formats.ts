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
		name: "[Gen 9] Unbound Water Gym",
		mod: 'unboundgyms',
		ruleset: ['watergym']
	},
	{
		name: "[Gen 9] Unbound Fire Gym",
		mod: 'unboundgyms',
		ruleset: ['firegym']
	},
	{
		name: "[Gen 9] Unbound Grass Gym",
		mod: 'unboundgyms',
		ruleset: ['grassgym']
	},
	{
		name: "[Gen 9] Unbound Ghost Gym",
		mod: 'unboundgyms',
		ruleset: ['ghostgym']
	},
	{
		name: "[Gen 9] Unbound Flying Gym",
		mod: 'unboundgyms',
		ruleset: ['flyinggym']
	},
	{
		name: "[Gen 9] Unbound Psychic Gym",
		mod: 'unboundgyms',
		ruleset: ['psychicgym']
	},
	{
		name: "[Gen 9] Unbound Steel Gym",
		mod: 'unboundgyms',
		ruleset: ['steelgym']
	},
	{
		name: "[Gen 9] Unbound Dark Gym",
		mod: 'unboundgyms',
		ruleset: ['darkgym']
	},
	{
		name: "[Gen 9] Unbound Ice Gym",
		mod: 'unboundgyms',
		ruleset: ['icegym']
	},
	{
		name: "[Gen 9] Unbound Ground Gym",
		mod: 'unboundgyms',
		ruleset: ['groundgym']
	},
	{
		name: "[Gen 9] Unbound Poison Gym",
		mod: 'unboundgyms',
		ruleset: ['poisongym']
	},
	{
		name: "[Gen 9] Unbound Dragon Gym",
		mod: 'unboundgyms',
		ruleset: ['dragongym']
	},
];
