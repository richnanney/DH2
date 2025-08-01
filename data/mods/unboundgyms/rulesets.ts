import { EffectState } from "../../../sim/pokemon";

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
		onBegin() {
			this.add('-weather', 'Rain Dance');
			this.field.weather = 'raindance' as ID;
			this.field.weatherState = { id: 'raindance'};
		},
		onSetWeather(target, source, weather) {
			if (this.field.weather == 'raindance') {
				this.add('-message', 'The rain from the gym effect can\'t be removed!')
				return false;
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
		desc: "All Ghost-Type Pokemon also benefit from MultiScale and are immune to hazards.",
		onModifyDamage(relayVar, source, target, move) {
			if (target.hp >= target.maxhp && target.hasType('Ghost')) {
				this.add('-message', `${target.name} takes less damage thanks to the gym effect!`)
				return this.chainModify(0.5);
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
		onTryHitSide(target, source, move) {
			this.add('-message',`Debug: TryHitSide triggered.`)
			if (target === source) {
				return;
			}
			if (move.hasBounced) {
				return;
			}
			if (!move.flags['reflectable']) {
				return;
			}
			if (target.hasType('Psychic')) {
				this.add('-message',`${target.name} reflects the move thanks to the gym effect!`)
				const newMove = this.dex.getActiveMove(move.id);
				newMove.hasBounced = true;
				newMove.pranksterBoosted = false;
				this.actions.useMove(newMove, target, source);
				return null;
			}
		},
		onTryHit(target, source, move) {
			this.add('-message',`Debug: TryHit triggered.`)
			if (target === source) {
				return;
			}
			if (move.hasBounced) {
				return;
			}
			if (!move.flags['reflectable']) {
				return;
			}
			if (target.hasType('Psychic')) {
				this.add('-message',`${target.name} reflects the move thanks to the gym effect!`)
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
		onSwitchIn(pokemon) {
			if (pokemon.hasType(['Electric', 'Steel'])) {
				pokemon.addVolatile('magnetrise');
			}
		},
		onModifyType(move, pokemon, target) {
			if (pokemon.hasType(['Electric', 'Steel'])) {
				pokemon.addVolatile('magnetrise');
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
				this.add('-message', `${target.fullname} takes damage from the Gym's Dark Aura!`);
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
		onSetWeather(target, source, weather) {
			if (this.field.weather == 'snow') {
				this.add('-message', 'The snow from the gym effect can\'t be removed!')
				return false;
			}
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
		onWeather(target, source, effect) {
			if (target.hasType(['ground','rock','steel']) && effect.id == 'vicioussandstorm') {
				return false;
			}
		},
	},
	poisongym: {
		effectType: 'Rule',
		name: 'Poison Gym',
		desc: "Poison type pokemon get toxic debris.",
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const toxicSpikes = side.sideConditions['toxicspikes'];
			if (move.category === 'Physical' && (!toxicSpikes || toxicSpikes.layers < 2) && target.hasType('Poison')) {
				this.add('-activate', target, 'ability: Toxic Debris');
				side.addSideCondition('toxicspikes', target);
			}
		},
	},
	dragongym: {
		effectType: 'Rule',
		name: 'Dragon Gym',
		desc: "All Dragon type pokemon benefit from Serene Grace.",
		onModifyMove(move, pokemon, target) {
			if (move.secondaries && pokemon.hasType('Dragon')) {
				this.add('-message', 'The move is a little luckier thanks to the gym effect!')
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 2;
				}
			}
			if (move.self?.chance && pokemon.hasType('dragon')) {
				this.add('-message', 'The move is a little luckier thanks to the gym effect!')
				move.self.chance *= 2;
			}
		},
	},
	fairygym: {
		effectType: 'Rule',
		name: 'Fairy Gym',
		desc: "Permanent Wonder Room.",
		onBegin() {
			this.add('-fieldstart', 'move: Wonder Room');
			this.field.pseudoWeather.wonderroom = { id: 'wonderroom' };
		},
		onAnyPseudoWeatherChange(target, source, pseudoWeather) {
			this.add('-message', `Debug: pseudoweather had changed to ${pseudoWeather}`);
			this.add('-message', `The spotlights are too strong to set up!`);
			this.field.pseudoWeather.wonderroom = { id: 'wonderroom' };
			return false;
		},
		onTryMove(source, target, move) {
			this.add('-message', `Debug: onTryMove is ${move.name}`);
			if (move.name in ['wonderroom', 'trickroom', 'magicroom', 'Wonder Room', 'Trick Room', 'Magic Room']) {
				this.add('-message', `The spotlights are too strong to set up ${move.name}!`);
				return false;
			}
		},
	},
};