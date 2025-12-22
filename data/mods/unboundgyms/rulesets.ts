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
						this.add('-message', `The water from the lake forms a ring around ${pokemon.name}!`)
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
				this.add('-message', 'The downpour is too strong to be removed!')
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
				this.add('-message', `The heat from the volcano evaporated the ${weather.name}!`)
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
			if (sourceEffect.name != 'grassyterrain') {
			    this.add('-message', 'The grassy terrain regrew instantly!')
			    this.add('-fieldstart', 'Grassy Terrain')
			    this.field.terrain = 'grassyterrain' as ID;
			    this.field.terrainState = { id: 'grassyterrain'};
			}
		},
	},
	electricgym: {
		effectType: 'Rule',
		name: 'Electric Gym',
		desc: "Permanent Electric Terrain.",
		onBegin() {
			this.add('-fieldstart', 'Electric Terrain')
			this.field.terrain = 'electricterrain' as ID;
			this.field.terrainState = { id: 'electricterrain'};
		},
		onTerrainChange(target, source, sourceEffect) {
			if (sourceEffect.name != 'electricterrain') {
			    this.add('-message', 'The electric terrain was restored instantly!')
			    this.add('-fieldstart', 'Electric Terrain')
			    this.field.terrain = 'electricterrain' as ID;
			    this.field.terrainState = { id: 'electricterrain'};
			}
		},
	},
	/*
	ghostgym: {
		effectType: 'Rule',
		name: 'Ghost Gym',
		desc: "All pokemon are affected by Perish Song.",
		onBegin() {
			this.add('-message', `A deathly song enchants the battlefield!`)
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (!pokemon || pokemon.fainted) continue;
					if (!pokemon.hasAbility('Soundproof') && !pokemon.volatiles["perishsong"]) {
						pokemon.addVolatile('perishsong');
					}
				}
			}
		},
		onSwitchIn(pokemon) {
			if (!pokemon.hasAbility('Soundproof') && !pokemon.volatiles["perishsong"]) {
				pokemon.addVolatile('perishsong');
			}
		},
	},
	*/
	ghostgym: {
		effectType: 'Rule',
		name: 'Ghost Gym',
		desc: "All Ghost-Type Pokemon also benefit from MultiScale and are immune to hazards.",
		onBegin() {
			this.add('-message', `A shadowy veil protects all ghost type pokemon!`)
		},
		onModifyDamage(relayVar, source, target, move) {
			if (target.hp >= target.maxhp && target.hasType('Ghost')) {
				this.add('-message', `${target.name} takes less damage thanks to the gym effect!`)
				return this.chainModify(0.5);
			}
		},
	},
	flyinggym: {
		effectType: 'Rule',
		name: 'Flying Gym',
		desc: "Flying type pokemon get permanent tail wind.",
		onBegin() {
			this.add('-message', `A tailwind blows in behind all Flying type pokemon!`);
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.hasType('Flying')) {
				return this.modify(spe, 2);
			}
		},
	},
	psychicgym: {
		effectType: 'Rule',
		name: 'Psychic Gym',
		desc: "All Psychic type pokemon get Magic Bounce.",
		onTryHitSide(target, source, move) {
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
				this.add('-message',`Telekinetic forces pushed the status move back to your side!`)
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
				this.add('-message',`Telekinetic forces pushed the field move back to your side!`)
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
		desc: "All Steel type pokemon get magnet rise.",
		onSwitchIn(pokemon) {
			if (pokemon.hasType(['Steel', 'Electric'])) {
				this.add('-message', `${pokemon.name} started levitating from the magnetic field!`)
				pokemon.addVolatile('magnetrise');
			}
		},
		onModifyType(move, pokemon, target) {
			if (pokemon.hasType(['Steel', 'Electric'])) {
				this.add('-message', `${pokemon.name} started levitating from the magnetic field!`)
				pokemon.addVolatile('magnetrise');
			}
		},
		onResidual(target, source, effect) {
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (!pokemon || pokemon.fainted) continue;
					if (pokemon.hasType(['Steel','Electric']) && !pokemon.volatiles['magnetrise']) {
						pokemon.addVolatile('magnetrise');
					}
				}
			}
		},
	},
	darkgym: {
		effectType: 'Rule',
		name: 'Dark Gym',
		desc: "KO-ing a Dark type Pokemon lowers your stats.",
		onDamagingHit(damage, target, source, move) {
			if (!target.hp && target.hasType("Dark")) {
				this.add('-message', `${this.getPokemon.name} is guilted for knocking out ${target.name}!`);
				this.boost({spa: -1, atk: -1}, source, target, null, true);
			}
		},
	},
	/*
	darkgym: {
		effectType: 'Rule',
		name: 'Dark Gym',
		desc: "All non-dark and non-ghost pokemon take 1/16 hp as damage each turn.",
		onBegin() {
			this.add('-message', `Negative emotions fill the air!`)
		},
		onResidual(target, source, effect) {
			if (!target || target.fainted) {
				return;
			}
			if (!target.hasType('Dark') && !target.hasType('Ghost')) {
				this.add('-message', `${target.name} is tomented by the negative emotions!`);
				this.damage(target.baseMaxhp / 16);
			}
		},
	},
	*/
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
				this.add('-message', `The snow machine blew away the ${weather.name}!`)
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
				this.add('-message', `The sandstorm is too strong to set up ${weather.name}!`)
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
		desc: "Poison type pokemon get Corrosion.",

		onTryHitPriority: 4,
		onTryHit(source, target, move) {
		// allow these moves to hit
			this.add('-message',  `ONTRYHIT!`)
			if (move.status && ['tox','psn'].includes(move.status) && target.hasType('Poison')) {
				move.ignoreImmunity = true;
			}
			if (source.getVolatile('banefulbunker') && this.checkMoveMakesContact(move, target, source)){
				target.setStatus('psn', null,null, true)
			}
		},
		
		onHit(target, source, move) {
			// Allow these moves to poison whoever it hits
			this.add('-message',  `ONHIT! ${move.status}`)
			if (move.secondaries) {
				for (const secondary of move.secondaries) {
					if (secondary.status !== undefined && ['tox', 'psn'].includes(secondary.status)) {
						if (secondary.chance && this.randomChance(secondary.chance,100))
							target.setStatus(secondary.status,null,null,true)
					}
				}			
			}
		},
		onResidual(target, source, effect) {
			// this is just for toxic orb poisoning poison users for some reason
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (!pokemon || pokemon.fainted) continue;
					if (pokemon.hasType('Poison') && pokemon.getItem().id == 'toxicorb') {
						pokemon.setStatus('tox', null,null, true)
					}
				}
			}
		},
		
	},
	dragongym: {
		effectType: 'Rule',
		name: 'Dragon Gym',
		desc: "All Dragon type pokemon benefit from Serene Grace.",
		onBegin() {
			this.add('-message', `A rainbow appeared in the sky across the entire battlefield!`)
			this.add('-message', `The secondary chances of moves used by Dragon types have been boosted!`)
		},
		onModifyMove(move, pokemon, target) {
			if (move.secondaries && pokemon.hasType('Dragon')) {
				this.add('-message', `${move.name} is a little luckier thanks to the gym effect!`)
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 2;
				}
			}
			if (move.self?.chance && pokemon.hasType('dragon')) {
				this.add('-message', `${move.name} is a little luckier thanks to the gym effect!`)
				move.self.chance *= 2;
			}
		},
	},
	fairygym: {
		effectType: 'Rule',
		name: 'Fairy Gym',
		desc: "Permanent Trick Room.",
		onBegin() {
			this.add('-fieldstart', 'move: Trick Room');
			this.field.pseudoWeather.trickroom = { id: 'trickroom' };
		},
		onTryMove(source, target, move) {
			if (['Wonder Room', 'Trick Room', 'Magic Room'].includes(move.name)) {
				this.add('-message', `The spotlights are too strong to set up ${move.name}!`);
				return false;
			}
		},
	},
	buggym: {
		effectType: 'Rule',
		name: 'Bug Gym',
		desc: "Bugs get Arena Trap.",
		onTrapPokemon(pokemon) {
			for (const target of pokemon.side.foe.active) {
				if (target && target.hasType('Bug') && !target.fainted && pokemon.isGrounded()) {
					pokemon.tryTrap(true);
				}
			}
		},
		onMaybeTrapPokemon(pokemon) {
			for (const foe of pokemon.side.foe.active) {
				if (foe && foe.isActive && !foe.fainted && foe.hasType('Bug') && pokemon.isGrounded()) {
					pokemon.maybeTrapped = true;
				}
			}
		},
	},
};