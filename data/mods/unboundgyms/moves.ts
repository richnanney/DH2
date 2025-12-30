export const Moves: {[k: string]: ModdedMoveData} = {
	fourofakind : {
		num:	1111,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		name: "Four of a Kind",
		desc: "Hits the foe with cards up to 4 times. The fourth hit always crits.",
		shortDesc: "Crits on the 4th hit.",
		flags: {protect: 1, mirror: 1, metronome: 1},
		onModifyMove(move, pokemon, target) {
			if (move.multihit && Array.isArray(move.multihit) && move.multihit.length && pokemon.item === 'loadeddice') {
				move.multihit = move.multihit[1];
			}
		},
		onTryHit(target, source, move) {
			if (move.hit === 4){
				this.add('-message', `${source.name} finds the Ace!`);
				move.critRatio = 5;
			} 
		},
		pp: 10,
		priority: 0,
		multihit: [2,4],
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
	brambleshot: {
		num: 1112,
		accuracy: 90,
		basePower: 120,
		category: "Special",
		name: "Bramble Shot",
		desc: "Hits the foe with a massive ball of brambles. Change to lower evasion on hit.",
		shortDesc: "Chance to lower evasion on hit.",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, bullet: 1},
		secondary: {
			chance: 10,
			boosts: {
				evasion: -1,
			},
		},
		target: "normal",
		type: "Grass",
	},
	maxpitchpunt: {
		num: 1113,
		accuracy: true,
		basePower: 160,
		category: "Special",
		isNonstandard: "Gigantamax",
		name: "Max Pitch Punt",
		desc: "Stunderian Cinderace ignores abilities with this move.",
		shortDesc: "Ignores abilites.",
		pp: 5,
		priority: 0,
		flags: {},
		isMax: "Cinderace",
		ignoreAbility: true,
		secondary: null,
		target: "adjacentFoe",
		type: "Grass",
		contestType: "Cool",
	},
	tictactorch: {
		num: 1114,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		name: "Tic-Tac-Torch",
		desc: "User does a sick-ass skateboard move and gains speed.",
		shortDesc: "Gains speed on hit.",
		pp: 10,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	mintrush: {
		num: 1112,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Mint Rush",
		desc: "Strikes at a blinding speed and leaves a minty aroma behind, setting grassy terrain.",
		shortDesc: "Priority and sets grass terrain on hit.",
		pp: 10,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		self: {
			onHit(source) {
				this.field.setTerrain('grassyterrain');
			},
		},
		target: "normal",
		type: "Grass",
	},
};