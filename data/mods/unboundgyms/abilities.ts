export const Abilities: {[k: string]: ModdedAbilityData} = {
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
	hotstreak: {
		name: "Hot Streak",
		desc: "Immune to fire type moves, and gains a boost of speed when hit by them.",
		shortDesc: "Fire immunity and buffs when hit by fire.",
		rating: 4.0,
		num: 407,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				this.add('-immune', target, '[from] ability: Hot Streak');
				this.boost({spe: 1,});
				return null;
			}
		},
	},
	sandbath: {
		name: "Sand Bath",
		desc: "Hydration but for sand.",
		shortDesc: "Hydration but for sand.",
		rating: 4.0,
		num: 408,
		onResidual(pokemon) {
			if (pokemon.status && this.field.isWeather('sandstorm')) {
				this.add('-activate', pokemon, 'ability: Sand Bath');
				pokemon.cureStatus();
			}
		},
	},
	encaptivate: {
		name: "Encaptivate",
		desc: "Intimidate but for Special Attack.",
		shortDesc: "Intimidate but for Special Attack.",
		rating: 4.0,
		num: 409,
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Encaptivate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({spa: -1}, target, pokemon, null, true);
				}
			}
		},
	}
};