export const Moves: {[k: string]: ModdedMoveData} = {
	rocksmash: {
		inherit: true,
		basePower: 50,
		secondary: {
			chance: 100,
			boosts: {
				def: -1,
			},
		},
		desc: "100% chance of lowering the target's Defense by one stage.",
		shortDesc: "Lowers the target's Def by 1 stage.",
	},
	leechlife: {
		inherit: true,
		basePower: 20,
	},
	feint: {
		inherit: true,
		basePower: 50,
	},
	meteormash: {
		inherit: true,
		basePower: 100,
	},
	snore: {
		inherit: true,
		basePower: 80,
	},
	fly: {
		inherit: true,
		basePower: 100,
	},
	dive: {
		inherit: true,
		basePower: 100,
	},
	glaciate: {
		inherit: true,
		basePower: 75,
		accuracy: 100,
	},
	darkvoid: {
		inherit: true,
		accuracy: 80,
	},
	smog: {
		inherit: true,
		accuracy: 100,
	},
	leechfang: {
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "The user strikes with a fang, and heals for a portion of the damage dealt.",
		shortDesc: "Deal damage, heal a portion of the damage.",
		name: "Leech Fang",
		gen: 7,
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, heal:1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Bug",
		contestType: "Clever",
	},
	wavecrash: {
		inherit: true,
		basePower: 75,
		priority: 1,
	},


	/*
	TODO:
	Attack Powers:
	Moves With Power nerfed to 85 as of XY: 90
	Moves With Power nerfed to 90 as of XY: 95
	Moves With Power nerfed to 95 as of XY: 100
	Moves With Power nerfed to 110 as of XY: 120
	Moves With Power nerfed to 130 as of XY: 140
	PLA Attacks: Altered based on similar moves -- Figure out what this means.

	Steelyhit

	King's Shield lowers Attack by 2 on contact (Gen 7)
	New PLA attacks with increased action speed are priority moves
	Freeze-Dry has a 30% chance to inflict frostbite, Freezing Glare 20% (and still doubles in Hail)
	Infernal Parade & Bitter Malice only double damage on burn and frostbite respectively
	*/
};