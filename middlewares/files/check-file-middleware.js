const {ErrorHandler} = require('../../errors');
const {fileConfigEnum, responceStatusCodesEnum} = require('../../constants');

module.exports = (req, res, next) => {
    req.photos = [];
    req.docs = [];
    console.log("----------------------------")
    console.log(req.files)
    console.log("----------------------------")

    if (!req.files) {
        next()
    }

    const files = Object.values(req.files);

    for (let i = 0; i < files.length; i++) {
        const {size, mimetype, name} = files[i]
        if (fileConfigEnum.PHOTO_MIMETYPES.includes(mimetype)) {

            if (fileConfigEnum.MAX_PHOTO_SIZE < size) {
                next(
                    new ErrorHandler(
                        `Max file size greater than ${fileConfigEnum.MAX_PHOTO_SIZE}`,
                        responceStatusCodesEnum.BAD_REQUEST,
                    )
                );
            }

            req.photos.push(files[i]);

        } else if (fileConfigEnum.DOC_MIMETYPES.includes(mimetype)) {

            if (fileConfigEnum.MAX_DOC_SIZE < size) {
                next(
                    new ErrorHandler(
                        `Max file size greater than ${fileConfigEnum.MAX_DOC_SIZE}`,
                        responceStatusCodesEnum.BAD_REQUEST,
                    )
                );
            }

            req.docs.push(files[i]);

        } else {
            next(new ErrorHandler(`File ${name} invalid`, 400))
        }
    }

    next();
}
