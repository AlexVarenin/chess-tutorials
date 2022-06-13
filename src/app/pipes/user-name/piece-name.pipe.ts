import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../store/users/models';

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  transform(user: User): string {
    if (!user) {
      return '';
    }
    const { firstName, lastName, email } = user;
    const name = firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName;
    return name || email;
  }
}
