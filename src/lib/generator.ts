const GeneratePassword = (
    length: number,
    upperCase: boolean,
    lowerCase: boolean,
    digits: boolean,
    specialChars: boolean
): string => {
    let password = '';
    let chars = '';
    if (upperCase) {
        chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (lowerCase) {
        chars += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (digits) {
        chars += '0123456789';
    }
    if (specialChars) {
        chars += '!@#$%^&*()_+=-';
    }
    if (chars.length === 0) {
        return password;
    }
    for (let i = 0; i < length; i += 1) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
};

const GeneratePassphrase = (): string => {
    // TODO: Generate a passphrase
    return '';
};

export { GeneratePassword, GeneratePassphrase };
