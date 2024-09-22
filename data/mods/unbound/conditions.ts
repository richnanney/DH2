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
            if (sourceEffect && sourceEffect.effectType === 'Ability') {
                this.add('-status', target, 'frz', '[from] ability: ' + sourceEffect.name, '[of] ' + source);
            } else {
                this.add('-status', target, 'frz');
            }
            if (target.species.name === 'Shaymin-Sky' && target.baseSpecies.baseSpecies === 'Shaymin') {
                target.formeChange('Shaymin', this.effect, true);
            }
        },
        onBeforeMovePriority: 10,
        onBeforeMove(pokemon, target, move) {
            if (move.flags['defrost']) return;
            if (this.randomChance(1, 5)) {
                pokemon.cureStatus();
                return;
            }
            this.add('cant', pokemon, 'frz');
            return false;
        },
        onModifyMove(move, pokemon) {
            if (move.flags['defrost']) {
                this.add('-curestatus', pokemon, 'frz', '[from] move: ' + move);
                pokemon.clearStatus();
            }
        },
        onAfterMoveSecondary(target, source, move) {
            if (move.thawsTarget) {
                target.cureStatus();
            }
        },
        onDamagingHit(damage, target, source, move) {
            if (move.type === 'Fire' && move.category !== 'Status') {
                target.cureStatus();
            }
        },
    },

	
	/*
	Freeze -> Frostbite (halves special attack)
	Frostbite does 1/8 damage (like burn)
	*/
};