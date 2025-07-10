export const Rulesets: {[k: string]: ModdedFormatData} = {
	waterGym: {
		effectType: 'Rule',
		name: 'Water Gym',
		desc: 'Battle effects for a water-type gym. Primarily includes perma-rain.',
		onBegin() {
			this.field.setWeather('raindance');
			// this.add('-weather', 'Rain Dance');
			// this.field.weather = 'raindance' as ID;
			// this.field.weatherState = { id: 'raindance'};
		}
	}
}