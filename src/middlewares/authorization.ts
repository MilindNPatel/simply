const authorization = function (options: any) {
    return options.authenticate('jwt', { session: false });
}

export default authorization;