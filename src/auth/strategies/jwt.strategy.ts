import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtConstants } from '../constants';
import { LoggedInUser } from '../types/logged-in-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      ignoreExpired: false,
    });
  }

  async validate(payload: LoggedInUser) {
    return {
      email: payload.email,
      user_id: payload.user_id,
      role_id: payload.role_id,
    };
  }
}
