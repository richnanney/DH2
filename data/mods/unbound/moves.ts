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
	snore: {
		inherit: true,
		basePower: 80,
	},
	flamethrower: {
		inherit: true,
		basePower: 95,
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
	steelyhit: {
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		desc: "A physical attack in which the user charges, full body, into the foe.",
		shortDesc: "A weak hit.",
		name: "Steelyhit",
		gen: 7,
		pp: 35,
		priority: 0,
		flags: {contact: 1},
		secondary: null,
		target: "normal",
		type: "Steel",
		contestType: "Tough",
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
	aurasphere: {
		inherit: true,
		basePower: 90,
	},
	blizzard: {
		inherit: true,
		basePower: 120,
	},
	dracometeor: {
		inherit: true,
		basePower: 140,
	},
	dragonpulse: {
		inherit: true,
		basePower: 90,
	},
	fireblast: {
		inherit: true,
		basePower: 120,
	},
	heatwave: {
		inherit: true,
		basePower: 100,
	},
	hurricane: {
		inherit: true,
		basePower: 120
	},
	hydropump: {
		inherit: true,
		basePower: 120
	},
	icebeam: {
		inherit: true,
		basePower: 95,
		secondary:
		{
			chance: 100,
			status: 'frz',
		},
	},
	leafstorm: {
		inherit: true,
		basePower: 140
	},
	magmastorm: {
		inherit: true,
		basePower: 120
	},
	meteormash: {
		inherit: true,
		basePower: 100,
	},
	muddywater: {
		inherit: true,
		basePower: 95
	},
	overheat: {
		inherit: true,
		basePower: 140
	},
	surf: {
		inherit: true,
		basePower: 95
	},
	thunder: {
		inherit: true,
		basePower: 120
	},
	thunderbolt: {
		inherit: true,
		basePower: 95
	},







	/*
	PLA Attacks: Altered based on similar moves -- Figure out what this means.
	King's Shield lowers Attack by 2 on contact (Gen 7)
	New PLA attacks with increased action speed are priority moves
	Freeze-Dry has a 30% chance to inflict frostbite, Freezing Glare 20% (and still doubles in Hail)
	Infernal Parade & Bitter Malice only double damage on burn and frostbite respectively
	*/
};