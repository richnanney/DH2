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

export const Formats: import('../sim/dex-formats').FormatList = [
	{
		section: "Pokemon Unbound",
		column: 1,
	},
	{
		name: "[Gen 8] Unbound Singles",
		mod: 'unbound',
	},
	{
		section: "Gym Gimmick Testing",
		column: 1,
	},
	{
		name: "[Gen 9] Generic Stundera Testing",
		mod: 'unboundgyms',
	},
	{
		name: "[Gen 9] Unbound Water Gym",
		mod: 'unboundgyms',
		ruleset: ['watergym']
	},
	{
		name: "[Gen 9] Unbound Ghost Gym",
		mod: 'unboundgyms',
		ruleset: ['ghostgym']
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
		name: "[Gen 9] Unbound Poison Gym",
		mod: 'unboundgyms',
		ruleset: ['poisongym']
	},
	{
		name: "[Gen 9] Unbound Fairy Gym",
		mod: 'unboundgyms',
		ruleset: ['fairygym']
	},
	{
		name: "[Gen 9] Unbound Normal Gym",
		mod: 'unboundgyms',
		ruleset: ['normalgym']
	},
	{
		name: "[Gen 9] Unbound Electric E4",
		mod: 'unboundgyms',
		ruleset: ['electricefour']
	},
	{
		name: "[Gen 9] Unbound Fighting E4",
		mod: 'unboundgyms',
		ruleset: ['fighting_e4']
	},
	{
		name: "[Gen 9] Unbound Fire E4",
		mod: 'unboundgyms',
		ruleset: ['fire_e4']
	},
	{
		name: "[Gen 9] Unbound Flying E4",
		mod: 'unboundgyms',
		ruleset: ['flying_e4']
	},
];
