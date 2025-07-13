export const Rulesets: {[k: string]: ModdedFormatData} = {
	watergym: {
		effectType: 'Rule',
		name: 'WaterGym',
		desc: "All Water-type Pokémon gain Aqua Ring at the end of each turn.",
		onResidual(battle) {
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (!pokemon || pokemon.fainted) continue;
					if (pokemon.hasType('Water') && !pokemon.volatiles['aquaring']) {
						this.add('-activate', pokemon, 'move: Aqua Ring');
						pokemon.addVolatile('aquaring');
					}
				}
			}
		},

	},
	firegym: {
		effectType: 'Rule',
		name: 'FireGym',
		desc: "Permanent sun.",
		onBegin() {
			this.add('-weather', 'Sunny Day');
			this.field.weather = 'sunnyday' as ID;
			this.field.weatherState = { id: 'sunnyday'};
		},
	},
	grassgym: {
		effectType: 'Rule',
		name: 'GrassGym',
		desc: "Permanent Grassy Terrain.",
		onBegin() {
			this.add('-fieldstart', 'Grassy Terrain')
			this.field.terrain = 'grassyterrain' as ID;
			this.field.terrainState = { id: 'grassyterrain'};
		},
	},
	ghostgym: {
		effectType: 'Rule',
		name: 'GhostGym',
		desc: "All Ghost-Type Pokemon also benefit from Marvel Scale.",
		onModifyDef(relayVar, target, source, move) {
			if (target.hasType('Ghost') && target.status) {
				return this.chainModify(1.5);
			}
		},
	},
	flyinggym: {
		effectType: 'Rule',
		name: 'FlyingGym',
		desc: "Flying type pokemon get permanent tail wind.",
		onModifySpe(spe, pokemon) {
			if (pokemon.hasType('Flying')) {
				return this.chainModify(1.5);
			}
		},
	},
	psychicgym: {
		effectType: 'Rule',
		name: 'PsychicGym',
		desc: "All Psychic type pokemon get Magic Bounce.",
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable']) {
				return;
			}
			if (target.hasType('Psychic')) {
				const newMove = this.dex.getActiveMove(move.id);
				newMove.hasBounced = true;
				newMove.pranksterBoosted = false;
				this.actions.useMove(newMove, target, source);
				return null;
			}
		},
	},
	steelgym: {
		effectType: 'Rule',
		name: 'SteelGym',
		desc: "All Steel type pokemon get levitate.",
		onTryHit(source, target, move) {
			if (source.hasType('Steel')) {
				if (move.type === 'Ground') return false;
			}
		},
		onImmunity(type, pokemon) {
			if (pokemon.hasType('Steel')) {
				if (type === 'Ground') return false;
			}
		},

	},
	darkgym: {
		effectType: 'Rule',
		name: 'Dark Gym',
		desc: "All non-dark and non-ghost pokemon take 1/16 hp as damage each turn.",
		onResidual(target, source, effect) {
			if (!target.hasType(['Dark','Ghost'])) {
				target.damage(target.baseMaxhp / 16);
			}
		},

	},
	icegym: {
		effectType: 'Rule',
		name: 'IceGym',
		desc: "Permanent snow.",
		onBegin() {
			this.add('-weather', 'Snow');
			this.field.weather = 'snow' as ID;
			this.field.weatherState = { id: 'snow'};
		},
	},
	groundgym: {
		effectType: 'Rule',
		name: 'GroundGym',
		desc: "A vicious sandstorm takes place and deals 1/8th hp of damage to non-ground types.",
		onBegin() {
			this.add('-weather', 'Vicious Sandstorm');
			this.field.weather = 'vicioussandstorm' as ID;
			this.field.weatherState = { id: 'vicioussandstorm'};
		},
	},
	poisongym: {
		effectType: 'Rule',
		name: 'PoisonGym',
		desc: "Two layes of toxic spikes poison the field.",
		onBegin() {
			for (const side of this.sides) {
				side.addSideCondition('toxicspikes');
				side.addSideCondition('toxicspikes');
			}
		},
		onTryMove(source, target, move) {
			if (move.fullname === 'Rapid Spin') {
				this.add('The debris couldn\'t be removed!')
				return false;
			}
		},
	},
	dragongym: {
		effectType: 'Rule',
		name: 'DragonGym',
		desc: "All Dragon type pokemon benefit from Serene Grace.",
		onModifyMove(move, pokemon, target) {
			if (move.secondaries && pokemon.hasType('Dragon')) {
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 2;
				}
			}
			if (move.self?.chance) move.self.chance *= 2;
		},
	},
};