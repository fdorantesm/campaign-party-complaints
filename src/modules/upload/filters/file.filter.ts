import { ConflictException, HttpStatus } from '@nestjs/common';

export const fileFilter = (req, file, callback) => {
  if (
    !file.originalname
      .toLowerCase()
      .match(
        /\.(jpg|jpeg|png|gif|mp4|flv|webm|mkv|vob|ogg|ogv|mp3|avi|wmv|mpg|mpeg|3gp|m4u|flac|wav|wma|aac|mov)$/,
      )
  ) {
    return callback(
      new ConflictException(
        'Formatos válidos: jpg|jpeg|png|gif|mp4|flv|webm|mkv|vob|ogg|ogv|mp3|avi|wmv|mpg|mpeg|3gp|m4u|flac|wav|wma|aac|mov',
        HttpStatus.CONFLICT.toString(),
      ),
      false,
    );
  }
  callback(null, true);
};
