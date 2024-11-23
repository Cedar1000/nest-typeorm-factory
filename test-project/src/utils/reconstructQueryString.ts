function reconstructQueryString(parsedObject: Record<string, any>): string {
  let queryString = '';

  // Iterate through the keys of the parsed object
  for (const key in parsedObject) {
    const value = parsedObject[key];

    // If the value is an array, join the elements with "||"
    if (Array.isArray(value)) {
      const reconstructedPart = value
        .map((item) => `${key}=${item}`)
        .join('||');
      queryString += reconstructedPart + '||';
    } else {
      // Handle normal key-value pairs
      queryString += `${key}=${value}||`;
    }
  }

  // Remove the trailing "||" from the final string
  return queryString.slice(0, -2);
}

export default reconstructQueryString;
