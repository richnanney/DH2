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
			if (this.field.weather in ['raindance','primordialsea']) return;
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (!pokemon || pokemon.fainted) continue;
					if (pokemon.baseSpecies.name == 'Terapagos-Stellar') return;
				}
			}
			this.add('-weather', 'raindance');
			this.field.weather = 'raindance' as ID;
			this.field.weatherState = { id: 'raindance'};
		},
		onBegin() {
			this.add('-weather', 'Rain Dance');
			this.field.weather = 'raindance' as ID;
			this.field.weatherState = { id: 'raindance'};
		},
		onSetWeather(target, source, weather) {
			if (this.field.weather == 'raindance','primordialsea') {
				this.add('-message', 'The downpour is too strong to be removed!')
				return false;
			}
		},
		onAfterTerastallization(pokemon) {
			if (pokemon.baseSpecies.name == 'Terapagos-Stellar') {
				this.add('-message', 'Terapagos clears the field! The rain will return once Terapagos exits the battle!')
			};
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
		onAfterTerastallization(pokemon) {
			if (pokemon.baseSpecies.name == 'Terapagos-Stellar') {
				this.add('-message', 'Terapagos clears the field! The sun will return once Terapagos exits the battle!')
			};
		},
		onResidual(battle) {
			if (this.field.weather == 'sunnyday') return;
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (!pokemon || pokemon.fainted) continue;
					if (pokemon.baseSpecies.name == 'Terapagos-Stellar') return;
				}
			}
			this.add('-weather', 'sunnyday');
			this.field.weather = 'sunnyday' as ID;
			this.field.weatherState = { id: 'sunnyday'};
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
			if (sourceEffect.name == 'Teraform Zero') return;
			if (sourceEffect.name != 'grassyterrain') {
			    this.add('-message', 'The grassy terrain regrew instantly!')
			    this.add('-fieldstart', 'Grassy Terrain')
			    this.field.terrain = 'grassyterrain' as ID;
			    this.field.terrainState = { id: 'grassyterrain'};
			}
		},
		onAfterTerastallization(pokemon) {
			if (pokemon.baseSpecies.name == 'Terapagos-Stellar') {
				this.add('-message', 'Terapagos clears the field! The grassy terrain will return once Terapagos exits the battle!')
			};
		},
		onResidual(battle) {
			if (this.field.terrain == 'grassyterrain') return;
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (!pokemon || pokemon.fainted) continue;
					if (pokemon.baseSpecies.name == 'Terapagos-Stellar') return;
				}
			}
			this.add('-fieldstart', 'Grassy Terrain')
			this.field.terrain = 'grassyterrain' as ID;
			this.field.terrainState = { id: 'grassyterrain'};
		},
	},
	electricgym: {
		effectType: 'Rule',
		name: 'Electric Gym',
		desc: "Electric is super-effective to ground-types.",
		onBegin() {
			this.add('-message', "Electricity arcs across the ground below!")
		},
		onEffectiveness(typeMod, target, type, move) {
			if (move.type == "Electric" && type == "Ground") return typeMod + 1;
		},
		onNegateImmunity(pokemon, type) {
			if (pokemon.hasType("Ground") && type == "Electric"){
				return false;
			}
		},
	},
	/*
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
			if (sourceEffect.name == 'Teraform Zero') return;
			if (sourceEffect.name != 'electricterrain') {
			    this.add('-message', 'The electric terrain was restored instantly!')
			    this.add('-fieldstart', 'Electric Terrain')
			    this.field.terrain = 'electricterrain' as ID;
			    this.field.terrainState = { id: 'electricterrain'};
			}
		},
		onAfterTerastallization(pokemon) {
			if (pokemon.baseSpecies.name == 'Terapagos-Stellar') {
				this.add('-message', 'Terapagos clears the field! The electric terrain will return once Terapagos exits the battle!')
			};
		},
		onResidual(battle) {
			if (this.field.terrain == 'electricterrain') return;
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (!pokemon || pokemon.fainted) continue;
					if (pokemon.baseSpecies.name == 'Terapagos-Stellar') return;
				}
			}
			this.add('-fieldstart', 'Electric Terrain')
			this.field.terrain = 'electricterrain' as ID;
			this.field.terrainState = { id: 'electricterrain'};
		},
		
	},
	*/
	ghostgym: {
		effectType: 'Rule',
		name: 'Ghost Gym',
		desc: "All Ghost-Type Pokemon benefit from a slightly worse Multiscale, and pokemon are slowed when fainting a ghost type.",
		onBegin() {
			this.add('-message', `Sinners are shown no mercy.`)
		},
		onModifyDamage(relayVar, source, target, move) {
			if (target.hp >= target.maxhp && target.hasType('Ghost')) {
				this.add('-message', `${target.name}'s drive to torment preserves it from damage.`)
				return this.chainModify(0.7);
			}
		}, 
		onDamagingHit(damage, target, source, move) {
			if (!target.hp && target.hasType("Ghost")) {
				this.add('-message', `${source.name} is slowed by the weight of sin...`);
				this.boost({spe: -1,}, source, target, null, true);
			}
		},
	},
	/*
	ghostgym: {
		effectType: 'Rule',
		name: 'Ghost Gym',
		desc: "All Ghost-Type Pokemon benefit from Multiscale.",
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
	flyinggym: {
		effectType: 'Rule',
		name: 'Flying Gym',
		desc: "Flying type pokemon get permanent tail wind.",
		onBegin() {
			this.add('-message', `A tailwind blows in behind all Flying type pokemon!`);
		},
		onDamage(damage, target, source, effect) {
			if (target.hasType("Flying") && effect.fullname == 'Stealth Rock') {
				this.add('-message', `The tailwind lets ${target.name} dodge the stealth rocks!`);
				return false;
			}
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.hasType('Flying')) {
				return this.modify(spe, 1.25);
			}
		},
	},
	/*flyinggym: {
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
	},*/
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
			if (pokemon.hasType('Steel')) {
				this.add('-message', `${pokemon.name} started levitating from the magnetic field!`)
				pokemon.addVolatile('magnetrise');
			}
		},
		onResidual(target, source, effect) {
			if (target && target.hasType("Steel") && !target.volatiles['magnetrise']) {
				target.addVolatile('magnetrise');
			}
		},
	},
	darkgym: {
		effectType: 'Rule',
		name: 'Dark Gym',
		desc: "All Dark type pokemon benefit from Supreme Overlord.",
		onSwitchIn(pokemon) {
			if (pokemon.hasType("Dark") && pokemon.side.totalFainted) {
				this.add('-activate', pokemon, 'Gym: Supreme Overlord');
				const fallen = Math.min(pokemon.side.totalFainted, 5);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
			}
		},
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.fallen) {
				const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
				return this.chainModify([powMod[this.effectState.fallen], 4096]);
			}
		},
	},
	/*
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
		onAfterTerastallization(pokemon) {
			if (pokemon.baseSpecies.name == 'Terapagos-Stellar') {
				this.add('-message', 'Terapagos clears the field! The snow will return once Terapagos exits the battle!')
			};
		},
		onResidual(battle) {
			if (this.field.weather == 'snow') return;
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (!pokemon || pokemon.fainted) continue;
					if (pokemon.baseSpecies.name == 'Terapagos-Stellar') return;
				}
			}
			this.add('-weather', 'snow');
			this.field.weather = 'snow' as ID;
			this.field.weatherState = { id: 'snow'};
		},
	},
	groundgym: {
		effectType: 'Rule',
		name: 'Ground Gym',
		desc: "Permanent sandstorm. Also ground types benefit from the spdef increase that sandstorm gives.",
		onBegin() {
			this.add('-weather', 'sandstorm');
			this.field.weather = 'sandstorm' as ID;
			this.field.weatherState = { id: 'sandstorm'};
		},
		onSetWeather(target, source, weather) {
			if (this.field.weather == 'sandstorm') {
				this.add('-message', `The sandstorm is too strong to set up ${weather.name}!`)
				return false;
			}
		},
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Ground') && !pokemon.hasType('Rock') && this.field.isWeather('sandstorm')) {
				return this.modify(spd, 1.5);
			}
		},
		onAfterTerastallization(pokemon) {
			if (pokemon.baseSpecies.name == 'Terapagos-Stellar') {
				this.add('-message', 'Terapagos clears the field! The sandstorm will return once Terapagos exits the battle!')
			};
		},
		onResidual(battle) {
			if (this.field.weather == 'sandstorm') return;
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (!pokemon || pokemon.fainted) continue;
					if (pokemon.baseSpecies.name == 'Terapagos-Stellar') return;
				}
			}
			this.add('-weather', 'sandstorm');
			this.field.weather = 'sandstorm' as ID;
			this.field.weatherState = { id: 'sandstorm'};
		},
	},
	poisongym: {
		effectType: 'Rule',
		name: 'Poison Gym',
		desc: "Poison type pokemon get Corrosion.",
		onTryHitPriority: 4,
		onTryHit(source, target, move) {
			if (move.id == 'toxic' && target.hasType('Poison')) {
				source.setStatus('tox',null,null,true)
			}
			if (source.getVolatile('banefulbunker') && this.checkMoveMakesContact(move, target, source)){
				target.setStatus('psn', null,null, true)
			}
			if (move.id == 'psychoshift' && ['tox', 'psn'].includes(target.status) && target.hasType('Poison')) {
				source.setStatus(target.status, null,null, true)
				target.cureStatus();
			}

		},
		onHit(target, source, move) {
			if (move.secondaries) {
				for (const secondary of move.secondaries) {
					if (secondary.status !== undefined && ['tox', 'psn'].includes(secondary.status)) {
						if (secondary.chance && this.randomChance(secondary.chance,100))
							target.setStatus(secondary.status,null,null,true)
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
			if (move.self?.chance && pokemon.hasType('Dragon')) {
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
	fightinggym: {
		effectType: 'Rule',
		name: 'Fighting Gym',
		desc: "Fighting type pokemon take stances that either let them deal more damage, take less damage, or move faster.",
		onModifyDamage(damage, source, target, move) {
			if (source.hasType("Fighting") && (this.turn % 6 == 1 || this.turn % 6 == 2  )) {
				this.add('-message', `${source.name}'s stance allows it to do more damage!`)
				return this.chainModify(1.2);
			}
			if (target.hasType("Fighting") && (this.turn % 6 == 3 || this.turn % 6 == 4  )) {
				this.add('-message', `${target.name}'s stance allows it take less damage!`)
				return this.chainModify(.8);
			}
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.hasType("Fighting") && (this.turn % 6 == 5 || this.turn % 6 == 0  )) {
				return this.modify(spe, 1.2);
			}
		},
		onBeforeTurn(pokemon) {
			if (pokemon.hasType("Fighting") && (this.turn % 6 == 5 || this.turn % 6 == 0  )) {
				this.add('-message', `${pokemon.name}'s stance lets it move faster this turn!`)
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.hasType("Fighting")) {
				if (this.turn == 0) {
					this.add('-start', pokemon, `Attack Stance`, '[silent]');
					return;
				}
				if (pokemon.side.faintedThisTurn) { 
					switch((this.turn + 1 ) % 6)  {
						case 1:
						case 2:
							this.add('-end', pokemon, `Speed Stance`, '[silent]');
							this.add('-start', pokemon, `Attack Stance`, '[silent]');
							break;
						case 3:
						case 4:
							this.add('-end', pokemon, `Attack Stance`, '[silent]');
							this.add('-start', pokemon, `Defense Stance`, '[silent]');
							break;
						case 5:
						case 0:
							this.add('-end', pokemon, `Defense Stance`, '[silent]');
							this.add('-start', pokemon, `Speed Stance`, '[silent]');
							break;
					}
				}
				else {
					switch(this.turn % 6)  {
						case 1:
						case 2:
							this.add('-end', pokemon, `Speed Stance`, '[silent]');
							this.add('-start', pokemon, `Attack Stance`, '[silent]');
							break;
						case 3:
						case 4:
							this.add('-end', pokemon, `Attack Stance`, '[silent]');
							this.add('-start', pokemon, `Defense Stance`, '[silent]');
							break;
						case 5:
						case 0:
							this.add('-end', pokemon, `Defense Stance`, '[silent]');
							this.add('-start', pokemon, `Speed Stance`, '[silent]');
							break;
						}
				}
			}
		},
		onResidual(target, source, effect) {			
			if (target && target.hasType("Fighting")) {
				switch((this.turn + 1) % 6)  {
					case 1:
					case 2:
						this.add('-end', target, `Speed Stance`, '[silent]');
						this.add('-start', target, `Attack Stance`, '[silent]');
						break;
					case 3:
					case 4:
						this.add('-end', target, `Attack Stance`, '[silent]');
						this.add('-start', target, `Defense Stance`, '[silent]');
						break;
					case 5:
					case 0:
						this.add('-end', target, `Defense Stance`, '[silent]');
						this.add('-start', target, `Speed Stance`, '[silent]');
						break;
				}
			}
		},
	},
	/*
	fightinggym: {
		effectType: 'Rule',
		name: 'Fighting Gym',
		desc: "Fighting type pokemon take less damage from super effective moves.",
		onModifyDamage(damage, source, target, move) {
			if (target.hasType('Fighting') && target.getMoveHitData(move).typeMod > 0) {
				this.add('-message', `${target.name} takes less damage from the super-effective move!`)
				return this.chainModify(0.875); //Meant to be 1.75x instead of 2x damage
			}
		},
	},
	*/
	normalgym: {
		effectType: 'Rule',
		name: 'Normal Gym',
		desc: "Abilities are disabled.",
		onBegin() {
			this.add('-message', `Neutralizing gas fills the room!`)
		},
		onSwitchIn(pokemon) {
			if (pokemon.hasItem("abilityshield")) {
				this.add('-message', `${pokemon.name}'s Ability Shield was dissolved to nothing!`)
				pokemon.setItem('');
			};
			pokemon.addVolatile('gastroacid');
		},
	}
};