export const validationResults: Record<string, boolean | null> = {
    'login': null,
    'first_name': null,
    'second_name': null,
    'password': null,
    'password_repeat': null,
    'password_old': null,
    'email': null,
    'phone': null,
    'message': null,
}

export function validate(evt: Event, checkFunctionName: { (value: string): boolean | null; }, result: string) {
    const input = (evt.target as HTMLTextAreaElement),
        value = input.value;

    validationResults[result] = checkFunctionName(value);

    if (checkFunctionName(value)) {
        input.classList.remove('_error');
        (input.nextElementSibling as HTMLDivElement).textContent = '';
    } else {
        input.classList.add('_error');
        (input.nextElementSibling as HTMLDivElement).textContent = 'Поле ' + input.name + ' заполнено неправильно';
    }
}

export function setField(name: string, functionName: (value: string) => boolean) {
    const input = document.querySelector(`[name="${name}"]`),
        value = (input as HTMLInputElement).value;
    validationResults[name] = functionName(value);
}

export function validateForm(evt: Event, object: Record<string, boolean | null>) {
    const failedResults = Object.fromEntries(
            Object.entries(object).filter(([__, value]) => !value)),
        keysFailedResults = Object.keys(failedResults);

    keysFailedResults.forEach((el) => {
        const input = (evt.target as HTMLInputElement).querySelector(`[name="${el}"]`);
        (input as HTMLInputElement).classList.add('_error');
        if(input !== null) {
            (input.nextElementSibling as HTMLDivElement).textContent = 'Поле ' + (input as HTMLInputElement).name + ' заполнено неправильно';
        }
    })
}

export function checkLogin(value: string) {
    const basicExpression = /^[\w-]{3,20}$/,
        additionalExpression = /^[A-Za-z]{1,}$/,
        resultBasic = basicExpression.test(value),
        resultAdditional = additionalExpression.test(value);

    return resultBasic && resultAdditional;
}

export function checkName(value: string) {
    const basicExpression = /^(([A-Z]|[А-Я])([a-z]|[а-я]|\-)*)+$/;
    return basicExpression.test(value);
}

export function checkEmail(value: string) {
    const basicExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return basicExpression.test(value);
}

export function checkPhone(value: string) {
    const basicExpression = /^[\+]?[0-9]{10,15}$/;
    return basicExpression.test(value);
}

export function checkPassword(value: string) {
    const basicExpression = /((?=.*[A-Z])(?=.*\d))^.{8,40}$/;
    return basicExpression.test(value);
}

const isEmpty = (value: string): boolean => value.trim().length === 0;

export function checkMessage(value: string) {
    return !isEmpty(value);
}
