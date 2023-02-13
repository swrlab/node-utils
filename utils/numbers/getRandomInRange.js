// Returns a random integer between min (inclusive) and max (inclusive)
module.exports = (min, max) => {
	// Using Math.round() will give you a non-uniform distribution!
	return Math.floor(Math.random() * (max - min + 1)) + min
}
