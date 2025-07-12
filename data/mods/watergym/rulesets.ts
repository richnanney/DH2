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
};
