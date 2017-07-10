export const KEYS = {
	GOOD: "gut",
	BAD: "schlecht"
};

export const mapConditionKey = key => {
	return key in KEYS ? KEYS[key] : key;
};
