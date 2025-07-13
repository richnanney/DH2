export const Conditions: {[k: string]: ModdedConditionData} = {
	brn: {
		inherit: true,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
	},
	par: {
		inherit: true,
		onModifySpe(spe, pokemon) {
			// Paralysis occurs after all other Speed modifiers, so evaluate all modifiers up to this point first
			spe = this.finalModify(spe);
			if (!pokemon.hasAbility('quickfeet')) {
				spe = Math.floor(spe * 25 / 100);
			}
			return spe;
		},
	},
	frz: {
        name: 'frz',
        effectType: 'Status',
		onStart(target, source, sourceEffect) {
            this.add('-status', target, 'frz');
		},
        onBasePower(basePower, attacker, defender, move) {
			if (move.category === 'Special') {
				return this.chainModify(.5);
            }
		},
		onResidualOrder: 10,
		onResidual(pokemon) {
			this.damage(pokemon.baseMaxhp / 8);
		},
	},
    hail: {
        inherit: true,
        onModifyMove(move) {
            if (move.secondaries) {
				for (const secondary of move.secondaries) {
					if (secondary.status === 'frz' && secondary.chance) secondary.chance *= 2;
				}
			}
		},
    },
	vicioussandstorm: {
		name: 'Vicious Sandstorm',
		effectType: 'Weather',
		duration: 0,
		onModifySpDPriority: 10,
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType(['Rock', 'Ground']) && this.field.isWeather('vicioussandstorm')) {
				return this.modify(spd, 1.5);
			}
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'Vicious Sandstorm');
		},
		onFieldResidualOrder: 1,
		onWeather(target) {
			this.damage(target.baseMaxhp / 8);
		},
	}

};