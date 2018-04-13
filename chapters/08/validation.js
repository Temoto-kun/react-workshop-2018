const EMAIL_REGEX = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/;
const PHONE_REGEX = /^[0-9]{11,15}$/;

export function validateEmail(s) {
	return EMAIL_REGEX.test(s);
}

export function validatePhone(s) {
	return PHONE_REGEX.test(s);
}
