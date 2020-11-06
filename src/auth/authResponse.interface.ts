interface IServerResponse {
    ALREADY_REGISTERED_USER: string
    SUCCESSFULLY_CREATED_USER: string
    INVALID_INPUT_DATA: string
    UNAUTHORIZED: string
    PARAMS_REQUIRED: string
}

export const serverResponseInterface: IServerResponse = {
    ALREADY_REGISTERED_USER: 'User with such email already registered',
    SUCCESSFULLY_CREATED_USER: 'User successfully created',
    INVALID_INPUT_DATA: 'Invalid email or password',
    UNAUTHORIZED: 'Invalid token or not provided',
    PARAMS_REQUIRED:
        'Please provide needed parameters. Check your request endpoint at \'localhost:3000/api\' '
}
