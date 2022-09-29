const regexCube = {
	urlHttp:
		// eslint-disable-next-line no-useless-escape
		/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
	email:
		/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
};

class Regex {
	static testUrlHttp(url) {
		return regexCube.urlHttp.test(url);
	}
	static testEmail(email) {
		return regexCube.email.test(email);
	}
}

module.exports = {
	Regex,
};
