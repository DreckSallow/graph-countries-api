class Arrays {
	static for(list, cb) {
		for (let i = 0; i < list.length; i++) {
			const value = list[i];
			if (cb(value, i)) {
				return true;
			}
		}
		return false;
	}
}

module.exports = {
	Arrays,
};
