import { RcFile } from 'antd/lib/upload';
import _ from 'lodash';

export default class FileUtil {
    static getBase64 = (file: RcFile): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });

    static handleDownLoad = (url: string, fileName: string) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
    };

    static handleDownLoadByBlob = (blob: Blob, fileName: string) => {
        const url = window.URL.createObjectURL(blob);
        FileUtil.handleDownLoad(url, fileName);
    };

    static downloadFileTest = async (response: any) => {
        try {
            const filename = _.get(response.headers, 'content-disposition')
                .split(';')
                .find((part: any) => part.trim().startsWith('filename='))
                .split('=')[1];

            const contentType = _.get(response.headers, 'content-type');

            const blob = new Blob([response.data], { type: contentType });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };
}
