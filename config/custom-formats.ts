import { Formats as unboundgyms } from '../data/mods/unboundgyms/formats';

export const Formats: import('../sim/dex-formats').FormatList = [
	{
		section: "Stundera Gym Mods",
		column: 1,
	},
	...unboundgyms
];
