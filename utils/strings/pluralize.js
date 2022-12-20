// pluralize value to values or use custom plural
module.exports = (count, singular, plural) => {
	const multi = plural ?? `${singular}s`
	return `${count} ${count !== 1 ? multi : singular}`
}
