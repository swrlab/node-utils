// provide util to confert readable stream to buffer
module.exports = async (readable) => {
	// create output details
	let string = ''
	const chunks = []

	// handle each chunk
	for await (const chunk of readable) {
		string += chunk
		chunks.push(chunk)
	}

	// reformat buffer
	const buffer = Buffer.concat(chunks)

	// return data
	return { string, buffer }
}
