export const Rulesets: {[k: string]: ModdedFormatData} = {
	watergym: {
		effectType: 'Rule',
		name: 'Water Gym',
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
		name: 'Fire Gym',
		desc: "Permanent sun.",
		onBegin() {
			this.add('-weather', 'Sunny Day');
			this.field.weather = 'sunnyday' as ID;
			this.field.weatherState = { id: 'sunnyday'};
		},
		onSetWeather(target, source, weather) {
			if (this.field.weather == 'sunnyday') {
				this.add('-message', 'The sun from the gym effect can\'t be removed!')
				return false;
			}
		},
	},
	grassgym: {
		effectType: 'Rule',
		name: 'Grass Gym',
		desc: "Permanent Grassy Terrain.",
		onBegin() {
			this.add('-fieldstart', 'Grassy Terrain')
			this.field.terrain = 'grassyterrain' as ID;
			this.field.terrainState = { id: 'grassyterrain'};
		},
		onTerrainChange(target, source, sourceEffect) {
			this.add('-message', 'But the grassy terrain remained!')
			this.add('-fieldstart', 'Grassy Terrain')
			this.field.terrain = 'grassyterrain' as ID;
			this.field.terrainState = { id: 'grassyterrain'};
		},

	},
	ghostgym: {
		effectType: 'Rule',
		name: 'Ghost Gym',
		desc: "All Ghost-Type Pokemon also benefit from Marvel Scale and are immune to hazards.",
		onModifyDef(relayVar, target, source, move) {
			if (target.hasType('Ghost') && target.status) {
				return this.chainModify(1.5);
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.hasType('Ghost')) {
				const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const condition of sideConditions) {
					if (pokemon.side.removeSideCondition(condition)){
						this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name);
					}
				}
			};
		},
	},
	flyinggym: {
		effectType: 'Rule',
		name: 'Flying Gym',
		desc: "Flying type pokemon get permanent tail wind.",
		onModifySpe(spe, pokemon) {
			if (pokemon.hasType('Flying')) {
				return this.modify(spe, 2);
			}
		},
		onTryHit(source, target, move) {
			if (target.hasType("Flying")) {
				this.add('-message', `${target.name} moves faster thanks to the strong winds!`)
			}
		},
	},
	psychicgym: {
		effectType: 'Rule',
		name: 'Psychic Gym',
		desc: "All Psychic type pokemon get Magic Bounce.",
		onTryHit(target, source, move) {
			if (target === source) {
				this.add('-message',`Debug: Target is source and thus won't bounce.`)
				return;
			}
			if (move.hasBounced) {
				this.add('-message',`Debug: Move has already bounced and thus won't bounce again.`)
				return;
			}
			if (!move.flags['reflectable']) {
				this.add('-message',`Debug: Move isn't considered 'reflectable' and thus won't bounce.`)
				return;
			}
			if (target.hasType('Psychic')) {
				this.add('-message',`Debug: ${target.fullname} reflects the move thanks to the gym effect!`)
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
		name: 'Steel Gym',
		desc: "All Steel type pokemon get levitate.",
		onTryHit(source, target, move) {
			if (source.hasType('Steel')) {
				if (move.type === 'Ground') return false;
			}
		},
	},
	darkgym: {
		effectType: 'Rule',
		name: 'Dark Gym',
		desc: "All non-dark and non-ghost pokemon take 1/16 hp as damage each turn.",
		onResidual(target, source, effect) {
			if (!target || target.fainted) {
				return;
			}
			if (!target.hasType('Dark') && !target.hasType('Ghost')) {
				this.add('-message', `${target.fullname} takes damage from the Gym's Dark Aura!`)
				this.damage(target.baseMaxhp / 16);
			}
		},
	},
	icegym: {
		effectType: 'Rule',
		name: 'Ice Gym',
		desc: "Permanent snow.",
		onBegin() {
			this.add('-weather', 'Snow');
			this.field.weather = 'snow' as ID;
			this.field.weatherState = { id: 'snow'};
		},
	},
	groundgym: {
		effectType: 'Rule',
		name: 'Ground Gym',
		desc: "A vicious sandstorm takes place and deals 1/8th hp of damage to non-ground/rock types.",
		onBegin() {
			this.add('-weather', 'vicioussandstorm');
			this.field.weather = 'vicioussandstorm' as ID;
			this.field.weatherState = { id: 'vicioussandstorm'};
		},
		onSetWeather(target, source, weather) {
			if (this.field.weather == 'vicioussandstorm') {
				this.add('-message', 'The sandstorm from the gym effect can\'t be removed!')
				return false;
			}
		},
	},
	poisongym: {
		effectType: 'Rule',
		name: 'Poison Gym',
		desc: "Poisons all pokemon.",
		onResidual(battle) {
			const pokemon = this.activePokemon
			if ((pokemon && !pokemon.fainted && !pokemon.status && pokemon.setStatus('psn'))) {
					this.add('-status', pokemon, 'psn');
			}
		}
	},
	dragongym: {
		effectType: 'Rule',
		name: 'Dragon Gym',
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