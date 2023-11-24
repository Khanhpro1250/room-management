export default class ApiUtil {
    static GLOBAL_DOMAIN_PATH = `${window.location.protocol}//${window.location.host}`;

    static GLOBAL_API_PATH = '/api';

    static createFormMultipartForNet = (formValues: Record<string, any>, form?: FormData, key?: string) => {
        const formData = form || new FormData();
        const bindForm = (form: FormData, fieldValue: string, value: any) => {
            if (value instanceof File) {
                if (key != null) {
                    form.append(`${key}.` + fieldValue, value);
                } else {
                    form.append(fieldValue, value);
                }
            } else if (value instanceof Object) {
                if (key != null) {
                    form.append(`${key}.` + fieldValue, JSON.stringify(value));
                } else {
                    form.append(fieldValue, JSON.stringify(value));
                }
            } else {
                if (key != null) {
                    form.append(`${key}.` + fieldValue, value);
                } else {
                    form.append(fieldValue, value);
                }
            }
        };
        Object.keys(formValues).forEach((key: string, index) => {
            const fieldValue = formValues[key];

            if (fieldValue == null) return;
            if (Array.isArray(fieldValue)) {
                if (fieldValue[0] instanceof File) {
                    fieldValue.forEach(value => {
                        bindForm(formData, key, value);
                    });
                } else {
                    //Nếu ko phải file mà là array thì path thành
                    //Vd: proposalEventDetails[0].money: "value"
                    fieldValue.forEach((value, k) => {
                        this.createFormMultipartForNet(value, formData, key + `[${k}]`);
                    });
                }
            } else {
                bindForm(formData, key, fieldValue);
            }
        });
        return formData;
    };
    // sort array
}
