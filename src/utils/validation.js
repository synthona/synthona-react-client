export const validUrl = (value) => {
	try {
		new URL(value);
	} catch (_) {
		return false;
	}
	return true;
};

export const isImageUrl = (url) => {
	return url.match(/\..+(jpeg|jpg|gif|png|webp)/) != null || url.includes('http://localhost');
};
