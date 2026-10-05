export const Rulesets: import('../../../sim/dex-formats').ModdedFormatDataTable = {
	watergym: {
		effectType: 'Rule',
		name: 'Water Gym',
		desc: "All Water-type Pokémon gain Aqua Ring at the end of each turn + perma rain.",
		onResidualOrder: 1,
		onResidual(target, source, effect) {
			if (target.hasType('Water') && !target.volatiles['aquaring']) {
				this.add('-activate', target, 'move: Aqua Ring');
				target.addVolatile('aquaring');
				this.add('-message', `The water from the lake forms a ring around ${target.name}!`);
			}
			//This is specifically to handle Terapagos, who removes weather.
			if (this.field.weather in ['raindance', 'primordialsea']) return;
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (!pokemon || pokemon.fainted) continue;
					if (pokemon.baseSpecies.name == 'Terapagos-Stellar') return;
				}
			}
			this.add('-message', `With Terapagos gone, the rain resumes!`);
			this.add('-weather', 'raindance');
			this.field.weather = 'raindance' as ID;
			this.field.weatherState = { id: 'raindance' };
		},
		onBegin() {
			this.add('-weather', 'Rain Dance');
			this.field.weather = 'raindance' as ID;
			this.field.weatherState = { id: 'raindance' };
		},
		onSetWeather(target, source, weather) {
			if (this.field.weather == 'raindance', 'primordialsea') {
				this.add('-message', 'The downpour is too strong to be removed!');
				return false;
			}
		},
		onAfterTerastallization(pokemon) {
			if (pokemon.baseSpecies.name == 'Terapagos-Stellar') {
				this.add('-message', 'Terapagos clears the field! The rain will return once Terapagos exits the battle!');
			};
		},
	},
	normalgym: {
		effectType: 'Rule',
		name: 'Normal Gym',
		desc: "Abilities are disabled.",
		onBegin() {
			this.add('-message', `Neutralizing gas fills the room!`);
		},
		onSwitchIn(pokemon) {
			if (pokemon.hasItem("abilityshield")) {
				this.add('-message', `${pokemon.name}'s Ability Shield was dissolved to nothing!`);
				pokemon.setItem('');
			};
			pokemon.addVolatile('gastroacid');
		},
	},
	rockgym: {
		effectType: 'Rule',
		name: 'Rock Gym',
		desc: "All rock types have Filter. Being hit by a super effective move boosts the defense of the kind being hit.",
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0 && target.hasType('Rock')) {
				return this.chainModify(0.75);
			}
		},
		onHit(target, source, move) {
			if (move?.effectType === 'Move' && target.getMoveHitData(move).typeMod > 0 && target.hasType('Rock')) {
				if (move.category = 'Physical') this.boost({ def: 2 }, target);
				if (move.category = 'Special') this.boost({ spd: 2 }, target);
			}
		}
	},
	ghostgym: {
		effectType: 'Rule',
		name: 'Ghost Gym',
		desc: "All Ghost-Type Pokemon benefit from a slightly worse Multiscale, and pokemon are slowed when fainting a ghost type.",
		onBegin() {
			this.add('-message', `Error: missing trainer texture.`);
		},
		onModifyDamage(relayVar, source, target, move) {
			if (target.hp >= target.maxhp && target.hasType('Ghost')) {
				this.add('-message', `${target.name}, some things can't be undone.`); //except this can because healing reactivates this!
				return this.chainModify(0.7);
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (!target.hp && target.hasType("Ghost")) {
				this.add('-message', `${source.name} looks around uneasily...`);
				this.boost({ spe: -1, }, source, target, null, true);
			}
		},
	},
	steelgym: {
		effectType: 'Rule',
		name: 'Steel Gym',
		desc: "All Steel type pokemon are immune to fire, until they are hit by a water move, where they will have +1 to both defenses instead.",
		onModifySpecies(species, target, source, effect) {
			if (this.turn == 0 && target) {
				target.m = { cooled: false };
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.hasType("Steel") && pokemon.m?.cooled == false) {
				this.add('-activate', pokemon, 'Gym: Smelted');
				this.add('-start', pokemon, `Gym: Smelted`, '[silent]');
			}
			else if (pokemon.hasType("Steel") && pokemon.m?.cooled == true) {
				this.add('-activate', pokemon, 'Gym: Forged');
				this.add('-start', pokemon, `Gym: Forged`, '[silent]');
				this.boost({ def: 1, spd: 1 });
			}
		},
		onTryHit(source, target, move) {
			if (move.type == "Fire" && target.hasType("Steel") && target?.m?.cooled == false) {
				return null;
			}
		},
		onHit(target, source, move) {
			if (move.type == 'Water' && target.hasType("Steel") && target?.m?.cooled == false) {
				this.add('-message', `${target.name} has cooled off!`);
				this.add('-end', target, `Gym: Smelted`, '[silent]');
				this.add('-activate', target, 'Gym: Forged');
				this.add('-start', target, `Gym: Forged`, '[silent]');
				target.m.cooled = true;
				this.boost({ def: 1, spd: 1 }, target);
			}
		},

	},
	darkgym: {
		effectType: 'Rule',
		name: 'Dark Gym',
		desc: "All Dark type pokemon benefit from Serene Grace and their moves cannot miss.",
		onModifyMove(move, pokemon, target) {
			if (pokemon.hasType('Dark')) {
				if (move.secondaries) {
					this.add('-message', `${move.name} is a little luckier thanks to the gym effect!`);
					for (const secondary of move.secondaries) {
						if (secondary.chance) secondary.chance *= 2;
					}
				}
				if (move.self?.chance) {
					this.add('-message', `${move.name} is a little luckier thanks to the gym effect!`);
					move.self.chance *= 2;
				}
				move.ignoreAccuracy = true;
			}
		},
	},
	icegym: {
		effectType: 'Rule',
		name: 'Ice Gym',
		desc: "Permanent snow. Aurora veil always lasts the max amount of turns.",
		onBegin() {
			this.add('-weather', 'Snow');
			this.field.weather = 'snow' as ID;
			this.field.weatherState = { id: 'snow' };
		},
		onSetWeather(target, source, weather) {
			if (this.field.weather == 'snow') {
				this.add('-message', `The snow machine blew away the ${weather.name}!`);
				return false;
			}
		},
		onAnySetStatus(status, target, source, effect) {
			if (status.name == 'Aurora Veil') {
				status.duration = 8;
			}
		},
		// the turtle....
		onAfterTerastallization(pokemon) {
			if (pokemon.baseSpecies.name == 'Terapagos-Stellar') {
				this.add('-message', 'Terapagos clears the field! The snow will return once Terapagos exits the battle!');
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
			this.add('-message', `With Terapagos gone, the snowfall resumes!`);
			this.add('-weather', 'snow');
			this.field.weather = 'snow' as ID;
			this.field.weatherState = { id: 'snow' };
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
	poisongym: {
		effectType: 'Rule',
		name: 'Poison Gym',
		desc: "Randomizes non-Poison secondary types, or assigns a random type to the secondary type.",
		onModifySpeciesPriority: 2,
		onModifySpecies(species, target, source, effect) {
			if (!target) return;
			if (effect && ['imposter', 'transform'].includes(effect.id)) return;
			//if (this.turn > 0) return {...species, types: target.getTypes(true)};
			const allTypes = ['Normal', 'Grass', 'Fire', 'Water', 'Electric', 'Bug', 'Flying', 'Rock', 'Poison', 'Ground', 'Ice', 'Fighting', 'Psychic', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
			const thisTypes = target.getTypes();
			var newtypes = [];
			if (thisTypes.length > 1) {
				if (thisTypes[1] != 'Poison') {
					const validTypes = allTypes.filter(item => !thisTypes[0].includes(item));
					const thisNewType = validTypes[Math.floor(Math.random() * validTypes.length)];
					newtypes = [thisTypes[0], thisNewType];
				}
				else {
					const validTypes = allTypes.filter(item => !thisTypes[1].includes(item));
					const thisNewType = validTypes[Math.floor(Math.random() * validTypes.length)];
					newtypes = [thisNewType, thisTypes[1]];
				}
			}
			else {
				const validTypes = allTypes.filter(item => !thisTypes[0].includes(item));
				const thisNewType = validTypes[Math.floor(Math.random() * validTypes.length)];
				newtypes = [thisTypes[0], thisNewType];
			}
			//const types = [...new Set(target.baseMoveSlots.slice(0, 2).map(move => this.dex.moves.get(move.id).type))];
			return { ...species, types: newtypes };
		},
		onSwitchIn(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]', '[from] format: Poison Type Gym');
		},
		onAfterMega(pokemon) {
			this.add('-start', pokemon, 'typechange', (pokemon.illusion || pokemon).getTypes(true).join('/'), '[silent]', '[from] format: Poison Type Gym');
		},
	},
	fightinge4: {
		effectType: 'Rule',
		name: 'Fighting e4',
		desc: "Fighting type pokemon take stances that either let them deal more damage, take less damage, or move faster.",
		onBegin() {
			this.add('-message', `The Flow of the Force shapes the battlefield.`);
			this.add('-message', `The Force surges. Power answers power. Djem So.`);
		},
		onModifyDamage(damage, source, target, move) {
			if (source.hasType("Fighting") && (this.turn % 6 == 1 || this.turn % 6 == 2)) {
				return this.chainModify(1.25);
			}
			if (target.hasType("Fighting") && (this.turn % 6 == 3 || this.turn % 6 == 4)) {
				return this.chainModify(.75);
			}
		},
		onModifySpe(spe, pokemon) {
			if (pokemon.hasType("Fighting") && (this.turn % 6 == 5 || this.turn % 6 == 0)) {
				return this.modify(spe, 1.25);
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.hasType("Fighting")) {
				if (this.turn == 0) {
					this.add('-start', pokemon, `Attack Stance`, '[silent]');
					return;
				}
				let faintedmod = 0;
				if (pokemon.side.faintedThisTurn) faintedmod = 1;
				switch ((this.turn + faintedmod) % 6) {
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
		},
		onResidual(target, source, effect) {
			if (target && target.hasType("Fighting")) {
				switch ((this.turn + 1) % 6) {
					case 1:
					case 2:
						this.add('-end', target, `Speed Stance`, '[silent]');
						this.add('-start', target, `Attack Stance`, '[silent]');
						this.add('-message', `The Force surges. Power answers power. Djem So.`);
						break;
					case 3:
					case 4:
						this.add('-end', target, `Attack Stance`, '[silent]');
						this.add('-start', target, `Defense Stance`, '[silent]');
						this.add('-message', `The Force steadies. Patience becomes strength. Soresu.`);
						break;
					case 5:
					case 0:
						this.add('-end', target, `Defense Stance`, '[silent]');
						this.add('-start', target, `Speed Stance`, '[silent]');
						this.add('-message', `The Force sharpens. Precision becomes speed. Makashi.`);
						break;
				}
			}
		},
	},
	firee4: {
		effectType: 'Rule',
		name: 'Fire e4',
		desc: "Permanent sun. Burn chance doubled and landing a burn will destroy hazards.",
		onBegin() {
			this.add('-weather', 'Sunny Day');
			this.field.weather = 'sunnyday' as ID;
			this.field.weatherState = { id: 'sunnyday' };
		},
		onSetWeather(target, source, weather) {
			if (this.field.weather == 'sunnyday') {
				this.add('-message', `The heat from the volcano evaporated the ${weather.name}!`);
				return false;
			}
		},
		onAnySetStatus(status, target, source, effect) {
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			if (status.name == 'brn') {
				for (const condition of sideConditions) {
					if (source.side.removeSideCondition(condition)) {
						this.add('-sideend', source.side, this.dex.conditions.get(condition).name, '[from] move: Burned Away', '[of] ' + source);
					}
				}
			}
		},
		onModifyMove(move, pokemon, target) {
			if (move.secondaries) {
				for (const secondary of move.secondaries) {
					if (secondary.chance && secondary.status == 'brn') secondary.chance *= 2;
				}
			}
		},
		onAfterTerastallization(pokemon) {
			if (pokemon.baseSpecies.name == 'Terapagos-Stellar') {
				this.add('-message', 'Terapagos clears the field! The sun will return once Terapagos exits the battle!');
			};
		},
		onResidual() {
			// Terapagos nonsense.
			if (this.field.weather == 'sunnyday') return;
			for (const side of this.sides) {
				for (const pokemon of side.active) {
					if (!pokemon || pokemon.fainted) continue;
					if (pokemon.baseSpecies.name == 'Terapagos-Stellar') return;
				}
			}
			this.add('-message', `With Terapagos gone, the heat resumes!`);
			this.add('-weather', 'sunnyday');
			this.field.weather = 'sunnyday' as ID;
			this.field.weatherState = { id: 'sunnyday' };
		},
	},
	flyinge4: {
		effectType: 'Rule',
		name: 'Flying e4',
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
	electrice4: {
		effectType: 'Rule',
		name: 'Electric E4',
		desc: "Electric is super-effective to ground-types. All electric moves crit.",
		onBegin() {
			this.add('-message', "Electricity arcs across the ground below!");
		},
		onModifyMove(move, pokemon, target) {
			if (move.type == "Electric") move.willCrit = true;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (move.type == "Electric" && type == "Ground") {
				return typeMod + 1;
			}
		},
		onNegateImmunity(pokemon, type) {
			if (pokemon.hasType("Ground") && type == "Electric") {
				this.add('-message', `The ionized atmosphere conducts on ${pokemon.name}!`);
				return false;
			}
		}
	}
};