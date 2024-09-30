const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

function queryStringify(data: string) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
}

const timeout = 0;

type HTTPMethod = (url: string, options?: {}) => Promise<unknown>

export type HTTPData = Record<string, string | number | Array<string | number>>;

export default class HTTPTransport {
    get: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.GET}, timeout)
    )

    post: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.POST}, timeout)
    )

    put: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.PUT}, timeout)
    )

    delete: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.DELETE}, timeout)
    )

    request = (url: string, options: { method: any; timeout?: number; headers?: any; data?: any; }, timeout = 5000) => {
        const {headers, method, data} = options;

        return new Promise(function(resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${url}${queryStringify(data)}`
                    : url,
            );

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            xhr.withCredentials = true;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
