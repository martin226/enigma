const isSequential = (charOne: string, charTwo: string): boolean => {
    const charCodeOne = charOne.charCodeAt(0);
    const charCodeTwo = charTwo.charCodeAt(0);
    if (
        charCodeTwo - charCodeOne === 1 &&
        ((charCodeOne >= 48 && charCodeOne <= 56) ||
            (charCodeOne >= 65 && charCodeOne <= 89) ||
            (charCodeOne >= 97 && charCodeOne <= 121))
    ) {
        return true;
    }
    return false;
};

const GeneratePassword = (
    length: number,
    upperCase: boolean,
    lowerCase: boolean,
    digits: boolean,
    specialChars: boolean,
    noSimilarChars: boolean,
    uniqueChars: boolean,
    noSequentialChars: boolean
): string => {
    let password = '';
    let chars = '';
    if (upperCase) {
        chars += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    }
    if (lowerCase) {
        chars += 'abcdefghjkmnpqrstuvwxyz';
    }
    if (digits) {
        chars += '23456789';
    }
    if (specialChars) {
        chars += '!@#$%^&*()_+=-';
    }
    if (!noSimilarChars) {
        if (upperCase) chars += 'IO';
        if (lowerCase) chars += 'ilo';
        if (digits) chars += '01';
    }
    if (chars.length === 0 || (length > chars.length && uniqueChars)) {
        return password;
    }
    for (let i = 0; i < length; i += 1) {
        if (!uniqueChars) {
            password += chars[Math.floor(Math.random() * chars.length)];
        } else {
            for (;;) {
                const index = Math.floor(Math.random() * chars.length);
                const char = chars[index];
                if (password.indexOf(char) === -1) {
                    password += char;
                    break;
                }
            }
        }
        if (noSequentialChars && password.length >= 2) {
            const lastChar = password.charAt(password.length - 1);
            const secondLastChar = password.charAt(password.length - 2);
            if (isSequential(secondLastChar, lastChar)) {
                password = password.substr(0, password.length - 1);
                i -= 1;
            }
        }
    }
    return password;
};

export default GeneratePassword;
