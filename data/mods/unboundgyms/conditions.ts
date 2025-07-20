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
    snow: {
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
		duration: 5,
		onFieldStart(field, source, effect) {
			this.add('-weather', 'Vicious Sandstorm');
		},
		onFieldResidualOrder: 1,
		onFieldResidual(field) {
			this.add('-weather', 'Vicious Sandstorm', '[upkeep]');
		},
		onWeather(target) {
						if (
				target.hasType('Rock') ||
				target.hasType('Ground') ||
				target.hasType('Steel') ||
				target.hasAbility('Overcoat') ||
				target.hasAbility('Magic Guard') ||
				target.hasItem('Safety Goggles')
			) {
				this.add('-message', `Debug: No damage to ${target.fullname}`)
				return;
			}
			this.add('-message', `Debug: Doing sand damage to ${target.fullname}`)
			this.damage(target.baseMaxhp / 8, target);
		},
		onModifySpDPriority: 10,
		onModifySpD(spd, pokemon) {
			if ((pokemon.hasType('Ground') || pokemon.hasType('Rock')) && this.field.isWeather('vicioussandstorm')) {
				return this.modify(spd, 1.5);
			}
		},


	}

};