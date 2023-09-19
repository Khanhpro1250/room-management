export class ValidateUtils {
    static ValidateEmail(email: string) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    static ValidatePhone(phone: string) {
        const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
        return phoneRegex.test(phone);
    }
}
