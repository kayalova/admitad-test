// low: Лучше называть такие вещи интерфейсами и перенести внутрь модуля auth
export const serverResponse = {
    ALREADY_REGISTERED_USER: 'User with such email already registered',
    SUCCESSFULLY_CREATED_USER: 'User successfully created',
    INVALID_INPUT_DATA: 'Invalid email or password',
    UNAUTHORIZED: 'Invalid token or not provided',
    PARAMS_REQUIRED:
        'Please provide needed parameters. Check your request endpoint at \'localhost:3000/api\' '
}
