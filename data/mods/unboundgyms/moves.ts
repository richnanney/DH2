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
		name: "Steely Hit",
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
	kingsshield: {
		num: 588,
		accuracy: true,
		basePower: 0,
		category: "Status",
		isNonstandard: "Past",
		name: "King's Shield",
		pp: 10,
		priority: 4,
		flags: {noassist: 1, failcopycat: 1, failinstruct: 1},
		stallingMove: true,
		volatileStatus: 'kingsshield',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect'] || move.category === 'Status') {
					if (['gmaxoneblow', 'gmaxrapidflow'].includes(move.id)) return;
					if (move.isZ || move.isMax) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				if (this.checkMoveMakesContact(move, source, target)) {
					this.boost({atk: -2}, source, target, this.dex.getActiveMove("King's Shield"));
				}
				return this.NOT_FAIL;
			},
			onHit(target, source, move) {
				if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
					this.boost({atk: -2}, source, target, this.dex.getActiveMove("King's Shield"));
				}
			},
		},
		secondary: null,
		target: "self",
		type: "Steel",
		zMove: {effect: 'clearnegativeboost'},
		contestType: "Cool",
	},
	freezedry : {
		inherit: true,
		secondary: {
			chance: 30,
			status: "frz",
		}
	},
	freezingglare : {
		inherit: true,
		secondary: {
			chance: 20,
			status: "frz",
		}
	},
	fourofakind : {
		num:	1111,
		accuracy: 90,
		basePower: 20,
		category: "Special",
		name: "Four of a Kind",
		desc: "Hits the foe with cards up to 4 times. The fourth hit always crits.",
		shortDesc: "Crits on the 4th hit.",
		flags: {protect: 1, mirror: 1, metronome: 1},
		onTryHit(target, source, move) {
			if (source.item === 'loadeddice') delete move.multiaccuracy;
			if (move.hit === 4){
				this.add('-message', `${source.name} finds the Ace!`);
				move.critRatio = 5;
			} 
		},
		pp: 15,
		priority: 0,
		multihit: [2,4],
		secondary: null,
		target: "normal",
		type: "Psychic",
		zMove: {basePower: 140},
		maxMove: {basePower: 130},
		contestType: "Cool",
	},
};