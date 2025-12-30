export const Abilities: {[k: string]: ModdedAbilityData} = {
	grassdash: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.type === 'Grass') return priority + 1;
		},
		name: "Grass Dash",
		desc: "All grass type moves used by this Pokemon have +1 to their priority.",
		shortDesc: "Grass moves hit first.",
		rating: 4.0,
		num: 307,
	},
	evaporate: {
		onStart(source) {
			if (['raindance', 'primordialsea'].includes(source.effectiveWeather())) {
				this.field.clearWeather();
			}
		},
		onAnySetWeather(target, source, weather) {
			if (weather.id === 'raindance') return false;
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Evaporate');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Water' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Evaporate');
				}
				return this.effectState.target;
			}
		},
		name: "Evaporate",
		desc: "Immune to water type moves, and also removes rain.",
		shortDesc: "No more water or rain!",
		rating: 3.5,
		num: 308,
	},
	drillbeak: {
		onModifyMove(move) {
			if (move.name.includes("Drill")) {
				move.willCrit = true;
			}
		},
		name: "Drill Beak",
		desc: "All drill moves always critical hit.",
		shortDesc: "'Drill' moves crit.",
		rating: 4.0,
		num:309,
	},
	brainbond: {
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.multihit || move.flags['noparentalbond'] || move.flags['charge'] ||
			move.flags['futuremove'] || move.spreadHit || move.isZ || move.isMax) return;
			move.multihit = 2;
			// We're just gonna steal the damage calcs from parental bond so we don't have to mod the damage sim.
			move.multihitType = 'parentalbond';
		},
		// Damage modifier implemented in BattleActions#modifyDamage()
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		name: "Brain Bond",
		desc: "Moves have a second, weaker hit.",
		shortDesc:"Attacks hit twice.",
		rating: 4.5,
		num: 310,
	},
	slipperytail: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.name.includes("Tail")) return priority + 1;
		},
		name: "Slippery Tail",
		desc: "'Tail' moves are given +1 priority.",
		shortDesc: "'Tail' moves go first.",
		rating: 4.0,
		num: 311,
	},
	portalpower: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (!move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
		name: "Portal Power",
		rating: 3.5,
		num: 312,
	},
	overcoat: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'powder' || type === 'vicioussandstorm') return false;
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.flags['powder'] && target !== source && this.dex.getImmunity('powder', target)) {
				this.add('-immune', target, '[from] ability: Overcoat');
				return null;
			}
		},
		flags: {breakable: 1},
		name: "Overcoat",
		rating: 2,
		num: 142,
	},
	sandforce: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm') || this.field.isWeather('vicioussandstorm') ) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Force boost');
					return this.chainModify([5325, 4096]);
				}
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'vicioussandstorm') return false;
		},
		flags: {},
		name: "Sand Force",
		rating: 2,
		num: 159,
	},
	sandrush: {
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('sandstorm') || this.field.isWeather('vicioussandstorm')) {
				return this.chainModify(2);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type ==='vicioussandstorm') return false;
		},
		flags: {},
		name: "Sand Rush",
		rating: 3,
		num: 146,
	},
	sandveil: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'vicioussandstorm') return false;
		},
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather('sandstorm') || this.field.isWeather('vicioussandstorm')) {
				this.debug('Sand Veil - decreasing accuracy');
				return this.chainModify([3277, 4096]);
			}
		},
		flags: {breakable: 1},
		name: "Sand Veil",
		rating: 1.5,
		num: 8,
	},
	rainmaker: {
		onModifyPriority(priority, pokemon, target, move) {
			if (['Sunny Day', 'Rain Dance', 'Sandstorm', 'Hail', 'Snowscape','Chilly Reception'].includes(move.name)) {
				return priority + 1;
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'vicioussandstorm') return false;
		},
		onModifyDef(def, pokemon) {
			if (!pokemon.hasType('Ice') && this.field.isWeather('snow')) {
				return this.chainModify(1.5);
			}
		},
		onModifySpD(spd, pokemon) {
			if (!pokemon.hasType('Rock') && this.field.isWeather('sandstorm')) {
				return this.chainModify(1.5);
			}
			if (!pokemon.hasType('Rock') &&  !pokemon.hasType('Rock') && this.field.isWeather('vicioussandstorm')) {
				return this.chainModify(1.5);
			}
		},
		name: "Rainmaker",
		desc: "Grants priority to weather setting moves. Also gains the benefits that certain types would get from weather.",
		shortDesc: "Weather priority and bonuses.",
		rating: 3.0,
		num: 407,
	},
	mintcondition: {
		name: "Mint Condition",
		desc: "When hit by a grass type move, or when grassy terrain is set, gain attack and speed.",
		shortDesc: "Grass immunity and buffs when hit by grass.",
		rating: 4.0,
		num: 407,
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(target, source, sourceEffect) {
			if (this.field.isTerrain('grassyterrain')) {
				this.debug('terrain buff');
				this.boost({atk: 1,spe: 1,});
			}		
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				this.add('-immune', target, '[from] ability: Mint Condition"');
				this.boost({atk: 1,spe: 1,});
				return null;
			}
		},
	},

};