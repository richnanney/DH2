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
		gen: 7,
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
		gen:7
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
		gen:7
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
		gen:7
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
		gen:7
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
		gen:7
	}
};