const GeneratePassword = (
    length: number,
    upperCase: boolean,
    lowerCase: boolean,
    digits: boolean,
    specialChars: boolean,
    noSimilarChars: boolean,
    uniqueChars: boolean
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
    if (chars.length === 0) {
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
    }
    return password;
};

const GeneratePassphrase = (): string => {
    // TODO: Generate a passphrase
    return '';
};

export { GeneratePassword, GeneratePassphrase };
