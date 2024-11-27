import IQuery from "src/interfaces/query.Interface"

const generateApiFilter = (query: Partial<IQuery>) => {
	const keys = Object.keys(query)
	const values = Object.values(query)
	const valueArrays = values.map((value) => value.split(","))
	const filter = []

	const generate = (index: number, combination: any) => {
		if (index === keys.length) {
			// only add the combination to the filter if it's not empty
			if (Object.keys(combination).length) {
				filter.push(combination)
			}
			return
		}

		const key = keys[index]
		const keyValues = valueArrays[index]

		for (const value of keyValues) {
			const updatedCombination = { ...combination }
			const boleans = ["true", "false"]
			updatedCombination[key] = boleans.includes(value)
				? JSON.parse(value)
				: value
			generate(index + 1, updatedCombination)
		}
	}

	generate(0, {})

	return filter
}

export default generateApiFilter
