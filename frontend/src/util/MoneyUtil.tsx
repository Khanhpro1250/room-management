export class MoneyUtil {
    static formatMoney(value: number): string {
        return value?.toLocaleString('vi', { maximumFractionDigits: 0 });
    }

    static renderMoneyShort = (amount: number) => {
        const suffixes = ['', 'K', 'M', 'B', 'T'];
        if (('' + amount).length <= 4) return amount?.toLocaleString('vi', { maximumFractionDigits: 0 });
        if ((('' + amount).length - 1) % 3 === 0) {
            const suffixNum = Math.floor(('' + amount).length / 3);
            let shortValue = parseFloat((suffixNum !== 0 ? amount / Math.pow(1000, suffixNum) : amount).toPrecision(2));
            if (shortValue % 1 !== 0) {
                //@ts-ignore
                shortValue = shortValue.toFixed(1);
            }
            return shortValue + suffixes[suffixNum];
        } else {
            const suffixNum = Math.floor((('' + amount).length - 1) / 3);
            const shortValue = parseFloat(
                (suffixNum !== 0
                    ? (amount * Math.pow(1, (('' + amount).length - 1) % 3)) / Math.pow(1000, suffixNum)
                    : amount
                ).toPrecision(2),
            );
            if (shortValue % 1 !== 0) {
                //@ts-ignore
                shortValue = shortValue.toFixed(1);
            }
            return shortValue + suffixes[suffixNum];
        }
    };
}
