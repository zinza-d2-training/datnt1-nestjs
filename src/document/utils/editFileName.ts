import { randomRegisterCode } from 'injection_registration/random_register_code';
import { extname } from 'path';

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = randomRegisterCode(4);

  callback(null, `${name}-${randomName}${fileExtName}`);
};
