
  function removeEmptyFields(items) {
    // Ensure items is an array
    if (!Array.isArray(items)) {
        return items;
    }

    // Iterate through each item
    return items.map(item => {
        // Filter out keys with empty values
        const filteredItem = Object.fromEntries(
            Object.entries(item).filter(([_, value]) => value !== "" && value !== null && value !== undefined)
        );
        return filteredItem;
    });
}

export { removeEmptyFields }