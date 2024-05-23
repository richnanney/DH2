export const Pokedex: { [k: string]: ModdedSpeciesData } = {
	clawitzer: {
		num: 693,
		name: "Clawitzer",
		types: ["Water"],
		baseStats: {hp: 71, atk: 73, def: 88, spa: 120, spd: 89, spe: 80},
		abilities: {0: "Mega Launcher"},
		heightm: 1.3,
		weightkg: 35.3,
		color: "Blue",
		prevo: "Clauncher",
		evoLevel: 37,
		eggGroups: ["Water 1", "Water 3"],
	},
	escavalier: {
		num: 589,
		name: "Escavalier",
		types: ["Bug", "Steel"],
		baseStats: {hp: 100, atk: 135, def: 105, spa: 60, spd: 105, spe: 20},
		abilities: {0: "Swarm", 1: "Shell Armor", H: "Overcoat"},
		heightm: 1,
		weightkg: 33,
		color: "Gray",
		prevo: "Karrablast",
		evoType: "trade",
		evoCondition: "with a Shelmet",
		eggGroups: ["Bug"],
	},
	rotom: {
		num: 479,
		name: "Rotom",
		types: ["Electric", "Ghost"],
		gender: "N",
		baseStats: {hp: 50, atk: 65, def: 87, spa: 105, spd: 87, spe: 126},
		abilities: {0: "Levitate"},
		heightm: 0.3,
		weightkg: 0.3,
		color: "Red",
		eggGroups: ["Amorphous"],
		otherFormes: ["Rotom-Heat", "Rotom-Wash", "Rotom-Frost", "Rotom-Fan", "Rotom-Mow"],
		formeOrder: ["Rotom", "Rotom-Heat", "Rotom-Wash", "Rotom-Frost", "Rotom-Fan", "Rotom-Mow"],
	},
	eevee: {
		inherit: true,
		evos: ["Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Aleon"],
	},
	aleon: {
		name: "Aleon",
		copyData: "Eevee",

		baseStats: {hp: 103, atk: 79, def: 53, spa: 89, spd: 67, spe: 134},
		abilities: {0: "Adaptability", H: "Normalize", S: "Beast Boost"},
		movepoolAdditions: [
			"blizzard", "chargebeam", "discharge", "expandingforce", "futuresight", "gigaimpact", "haze", "hyperbeam", "icebeam", "icywind", "magiccoat",
			"naturepower", "psychic", "psyshock", "reflect", "reflecttype", "risingvoltage", "scald", "shockwave", "signalbeam", "skillswap", "snarl", "solarbeam",
			"suckerpunch", "surf", "terrainpulse", "thunder", "thunderbolt", "thunderwave", "trick", "voltswitch", "waterpulse", "wonderroom", "zapcannon",
		],

		prevo: "Eevee",
		evoType: "levelExtra",
		evoCondition: "in Ultra Space",
		creator: "inkbug",
	},
	snover: {
		inherit: true,
		evos: ["Abomasnow", "Skiversnow"],
	},
	skiversnow: {
		name: "Skiversnow",
		copyData: "Abomasnow",

		baseStats: {hp: 90, atk: 92, def: 55, spa: 92, spd: 65, spe: 100},
		abilities: {0: "Snow Warning", H: "Pressure"},

		copyMoves: "Snover", // although its data is based on Abomasnow, it doesn't have all of Abomasnow's moves
		movepoolAdditions: [
			"brickbreak", "bulldoze", "earthpower", "focuspunch", "gigaimpact", "hyperbeam", "leafstorm", "outrage", "rapidspin", "rockclimb", "rockslide",
			"rocktomb", "uturn",
		],

		prevo: "Snover",
		evoType: "levelExtra",
		evoCondition: "on steep cliffs",
		creator: "ausma",
	},
	noibat: {
		inherit: true,
		evos: ["Noivern", "Noivern-Variant"],
	},
	noivernvariant: {
		name: "Noivern-Variant",
		baseSpecies: "Noivern",
		forme: "Variant",
		copyData: "Noivern",

		types: ["Fighting", "Dragon"],
		baseStats: {hp: 95, atk: 70, def: 80, spa: 97, spd: 80, spe: 113},
		abilities: {0: "Levitate"},
		movepoolAdditions: ["aurasphere", "bulldoze", "rocktomb", "vacuumwave"],
		movepoolDeletions: ["boomburst", "dragondance"],

		prevo: "Noibat",
		evoType: "other",
		evoCondition: "A newly-discovered evolution",
		creator: "Hematite",
	},
};
