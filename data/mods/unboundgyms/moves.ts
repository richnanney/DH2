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
			chance: 20,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		overrideOffensiveStat: 'spe',
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
	manafangs: {
		accuracy: 100,
		basePower: 60,
		category: "Physical",
		desc: "Mana charged fangs strike at the target, which absorb HP equal to 75% of dmg dealt.",
		shortDesc: "Deal damage, heal a 75% of the damage.",
		name: "Mana Fangs",
		pp: 10,
		priority: 0,
		flags: {bite: 1, contact: 1, heal:1},
		drain: [3, 4],
		secondary: null,
		target: "normal",
		type: "Dragon",
	},
	astralinfection : {
		num: 5711,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Astral Infection",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, allyanim: 1, metronome: 1},
		onHit(target) {
			if (target.hasType('Poison')) return false;
			if (!target.addType('Poison')) return false;
			this.add('-start', target, 'typeadd', 'Poison', '[from] move: Astral Infection');
		},
		secondary: null,
		target: "normal",
		type: "Poison",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Clever",
	},
	judgementcut: {
		num: 5711,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Judgement Cut",
		pp: 20,
		flags: {contact: 1, protect: 1, mirror: 1, metronome: 1, },
		priority: 0,
		onHit(target) {
			target.addVolatile('Taunt')
		},
		secondary: null,
		target: "normal",
		type: "Normal",
	},
	dragonscurse: {
		num: 5713,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Dragon's Curse",
		pp: 20,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		priority: 0,
		onHit(target) {
			const bestStat = target.getBestStat(false, true);
			this.boost({[bestStat]: -1}, target);
		},
		target: "allAdjacentFoes",
		secondary: null,
		type: "Normal",
	},
	royalmaelstrom: {
		num: 5714,
		accuracy: 90,
		basePower: 130,
		category: "Physical",
		name: "Royal Maelstrom",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		self: {
			boosts: {
				spa: -2,
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Beautiful",
	},
	faeflare: {
		num: 5715,
		accuracy: 100,
		basePower: 150,
		basePowerCallback(pokemon, target, move) {
			const bp = move.basePower * pokemon.hp / pokemon.maxhp;
			this.debug('BP: ' + bp);
			return bp;
		},
		category: "Special",
		name: "Fae Flare",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Fairy",
		contestType: "Beautiful",
	},
};