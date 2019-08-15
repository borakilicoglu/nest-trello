import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { UserEntity } from './user.entity';
import { UserDTO } from './user.dto';
import { UserRO } from './user.dto';

@Injectable()
export class UserService {
  private logger = new Logger('UserService')
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly mailerService: MailerService,
  ) { }

  public mail(user: any) {
    const date = Date.now();
    const link = `http://localhost:4200/auth/reset/${user.id}` + `-` + date;
    this
      .mailerService
      .sendMail({
        to: user.email, // sender address
        from: '"Angular Trello" <noreply@angulartrello.com>', // list of receivers
        subject: 'Reset your password ✔', // Subject line
        text: 'Someone (hopefully you) has requested a password reset for your Heroku account. Follow the link below to set a new password:', // plaintext body
        template: 'reset',
        context: {  // Data to be sent to template engine.
          username: user.username,
          email: user.email,
          link: link
        },
      })
      .then(() => { })
      .catch(() => { });
  }

  async showAll(page: number = 1) {
    const users = await this.userRepository.find({
      relations: ['boards', 'stars'],
      take: 25,
      skip: 25 * (page - 1),
    });
    return users.map(user => user.toResponseObject(false));
  }

  async read(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['boards', 'stars'],
    });
    return user.toResponseObject(false);
  }

  async edit(
    id: string,
    data: Partial<UserDTO>,
  ): Promise<UserRO> {
    let user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.update({ id }, data);
    return user.toResponseObject();
  }

  async login(data: UserDTO) {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject();
  }

  async register(data: UserDTO) {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }

  async forgot(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.mail(user.toResponseObject(false));
  }

  async reset(id: string, data: any) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const diff = await this.diff_hours(data.id.substr(data.id.lastIndexOf('-') + 1))
    if (diff > 2) {
      throw new HttpException(
        'Invalid Token',
        HttpStatus.BAD_REQUEST,
      );
    }
    let password = await bcrypt.hash(data.password, 10);
    await this.userRepository.update({ id }, { password: password });
    return user.toResponseObject();
  }

  async diff_hours(date: any): Promise<number> {
    let diff = (date - Date.now()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  }
}