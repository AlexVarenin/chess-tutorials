import { Pipe, PipeTransform } from '@angular/core';
import { GroupUser } from "../../store/groups/models";

@Pipe({
  name: 'userName'
})
export class UserNamePipe implements PipeTransform {

  transform(user: GroupUser): string {
    if (!user) {
      return '';
    }
    const { firstName, lastName, email } = user;
    const name = firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName;
    return name || email;
  }
}
