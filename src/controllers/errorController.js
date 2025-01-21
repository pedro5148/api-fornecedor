import AppErro from './../utils/appError.js'

export const handleCastErrorDB = (err) => {
    const message = `Informado ID invalido ${err.path}: ${err.value}`
    return new AppErro(message, 400)
}

export const sendErrorDev = (error, res) => {
    res.status(error.statusCode).json({
        status: error.status,
        error: error,
        message: error.message,
        stack: error.stack
    });
};

export const sendErrorProd = (error, res) => {
    // Erros operacionais, sao erros conhecidos e podem ser retornados ao cliente.
    if (error.isOperational) {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message
        })

        //Erros de programacao, retorna mensagem de erro generico
    } else { 
        console.log('Error: ', error)
        res.status(500).json({
            status: 'error',
            message: 'Alguma coisa deu errado...'
        })
    }
}

export default (error, req, res, next) => {

    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(error, res);
    } else if (process.env.NODE_ENV === 'production') {

        let err = { ...error, 
            name: error.name,
            message: error.message,
            stack: error.stack,
            path: error.path, // Inclui `path` para CastError
            value: error.value, 
        }
        if (err.name === 'CastError') err = handleCastErrorDB(err)

        sendErrorProd(err, res);
    }

    // res.status(err.statusCode).json({
    //     status: err.status,
    //     message: err.message
    // })
}