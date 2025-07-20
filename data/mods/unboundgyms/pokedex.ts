export const Pokedex: {[k: string]: ModdedSpeciesData} = {
	sunflora: {
		inherit: true,
		abilities: {0:"Chlorophyll",1:"Solar Power",H:"Grass Dash"},
	},
	magcargo: {
		inherit: true,
		abilities: {0:"Evaporate",1:"Flame Body",H:"Weak Armor"},
	},
	fearow: {
		inherit: true,
		abilities: {0:"Keen Eye",1:"Sniper",H:"Drill Beak"},
	},
	girafarig: {
		inherit: true,
		abilities: {0:"Inner Focus",1:"Sap Sipper",H:"Brain Bond"},
	},
	seviper: {
		inherit: true,
		abilities: {0:"Shed Skin",1:"Infiltrator",H:"Slippery Tail"},
	},
	aegislash: {
		inherit: true,
		baseStats: {hp: 60, atk: 50, def: 150, spa: 50, spd: 150, spe: 60},
	},
	aegislashblade: {
		inherit: true,
		baseStats: {hp: 60, atk: 150, def: 50, spa: 150, spd: 50, spe: 60},
	}
};