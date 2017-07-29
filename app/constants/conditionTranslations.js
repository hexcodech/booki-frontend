export const KEYS = {
	new: "neu",
	"as-new": "neuwertig",
	"very-good": "sehr gut",
	good: "gut",
	acceptable: "akzeptabel",
	bad: "schlecht"
};

export const mapConditionKey = key => {
	return key in KEYS ? KEYS[key] : key;
};
