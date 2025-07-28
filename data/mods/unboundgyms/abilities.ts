export const Abilities: {[k: string]: ModdedAbilityData} = {
	grassdash: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.type === 'Grass') return priority + 1;
		},
		name: "Grass Dash",
		desc: "All grass type moves used by this Pokemon have +1 to their priority.",
		shortDesc: "Grass moves hit first.",
		rating: 4.0,
		num: 307,
	},
	evaporate: {
		onStart(source) {
			if (['raindance', 'primordialsea'].includes(source.effectiveWeather())) {
				this.field.clearWeather();
			}
		},
		onAnySetWeather(target, source, weather) {
			if (weather.id === 'raindance') return false;
		},
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({spa: 1})) {
					this.add('-immune', target, '[from] ability: Evaporate');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Water' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Evaporate');
				}
				return this.effectState.target;
			}
		},
		name: "Evaporate",
		desc: "Immune to water type moves, and also removes rain.",
		shortDesc: "No more water or rain!",
		rating: 3.5,
		num: 308,
	},
	galewings: {
		inherit: true,
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.type === 'Flying') return priority + 1;
		},
		rating: 4,
	},
	drillbeak: {
		onModifyMove(move) {
			if (move.name.includes("Drill")) {
				move.willCrit = true;
			}
		},
		name: "Drill Beak",
		desc: "All drill moves always critical hit.",
		shortDesc: "'Drill' moves crit.",
		rating: 4.0,
		num:309,
	},
	brainbond: {
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.multihit || move.flags['noparentalbond'] || move.flags['charge'] ||
			move.flags['futuremove'] || move.spreadHit || move.isZ || move.isMax) return;
			move.multihit = 2;
			// We're just gonna steal the damage calcs from parental bond so we don't have to mod the damage sim.
			move.multihitType = 'parentalbond';
		},
		// Damage modifier implemented in BattleActions#modifyDamage()
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		name: "Brain Bond",
		desc: "Moves have a second, weaker hit.",
		shortDesc:"Attacks hit twice.",
		rating: 4.5,
		num: 310,
	},
	slipperytail: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move && move.name.includes("Tail")) return priority + 1;
		},
		name: "Slippery Tail",
		desc: "'Tail' moves are given +1 priority.",
		shortDesc: "'Tail' moves go first.",
		rating: 4.0,
		num: 311,
	},
	portalpower: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (!move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
		name: "Portal Power",
		rating: 3.5,
		num: 312,
	},
	ripen: {
		onTryHeal(damage, target, source, effect) {
			if (!effect) return;
			if (effect.name === 'Berry Juice' || effect.name === 'Leftovers') {
				this.add('-activate', target, 'ability: Ripen');
			}
			const confuse_heal_berries = [
				"Figy Berry", "Wiki Berry", "Mago Berry", "Aguav Berry", "Iapapa Berry",
			];
			if ((effect as Item).isBerry){
				if (confuse_heal_berries.includes(effect.name)){
					return this.chainModify(1.32);
				} else {
					return this.chainModify(2);
				}
			} 
		},
		onChangeBoost(boost, target, source, effect) {
			if (effect && (effect as Item).isBerry) {
				let b: BoostID;
				for (b in boost) {
					boost[b]! *= 2;
				}
			}
		},
		onSourceModifyDamagePriority: -1,
		onSourceModifyDamage(damage, source, target, move) {
			if (target.abilityState.berryWeaken) {
				target.abilityState.berryWeaken = false;
				return this.chainModify(0.5);
			}
		},
		onTryEatItemPriority: -1,
		onTryEatItem(item, pokemon) {
			this.add('-activate', pokemon, 'ability: Ripen');
		},
		onEatItem(item, pokemon) {
			const weakenBerries = [
				'Babiri Berry', 'Charti Berry', 'Chilan Berry', 'Chople Berry', 'Coba Berry', 'Colbur Berry', 'Haban Berry', 'Kasib Berry', 'Kebia Berry', 'Occa Berry', 'Passho Berry', 'Payapa Berry', 'Rindo Berry', 'Roseli Berry', 'Shuca Berry', 'Tanga Berry', 'Wacan Berry', 'Yache Berry',
			];
			// Record if the pokemon ate a berry to resist the attack
			pokemon.abilityState.berryWeaken = weakenBerries.includes(item.name);
		},
		flags: {},
		name: "Ripen",
		rating: 2,
		num: 247,
	},
	overcoat: {

	},
	sandforce: {

	},
	sandrush: {

	},
	sandveil: {

	},
	
};