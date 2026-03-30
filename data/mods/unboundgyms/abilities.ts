export const Abilities: {[k: string]: ModdedAbilityData} = {
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
	flashierfire: {
		name: "",
		desc: "Immune to fire type moves, and gains a boost of speed when hit by them.",
		shortDesc: "Fire immunity and buffs when hit by fire.",
		rating: 4.0,
		num: 407,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				this.add('-immune', target, '[from] ability: Flashier Fire');
				this.boost({spe: 1,});
				return null;
			}
		},
	},
};