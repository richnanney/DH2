export const Conditions: {[k: string]: ModdedConditionData} = {
	vicioussandstorm: {
		name: 'Vicious Sandstorm',
		effectType: 'Weather',
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasItem('smoothrock')) {
				return 8;
			}
			return 5;
		},
		onFieldStart(field, source, effect) {
			this.add('-weather', 'Vicious Sandstorm');
		},
		onModifySpD(spd, pokemon) {
			if (pokemon.hasType('Rock') && this.field.isWeather('vicioussandstorm')) {
				return this.modify(spd, 1.5);
			}
		},
		onFieldResidualOrder: 1,
		onFieldResidual() {
			this.add('-weather', 'Vicious Sandstorm', '[upkeep]');
			if (this.field.isWeather('vicioussandstorm')) this.eachEvent('Weather');
		},
		onWeather(target) {
			this.damage(target.baseMaxhp / 8);
			},
		onFieldEnd() {
			this.add('-weather', 'none', '[silent]');
		},
	},

};