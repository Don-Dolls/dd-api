import { UserRepository } from './../../repositories/user.repository';
import User from '../../definitions/user.model';

export const handler = async (event) => {
    const user = Object.assign(new User(),  {
      name: 'Rajesh',
      phone: '981740445',
      email: 'vitorpiovezam@yandex.com',
      photoUrls: [
        'https://rd1.com.br/cinema/wp-content/uploads/2019/05/Kunal-Nayyar.jpg',
        'https://vignette.wikia.nocookie.net/thebigbangtheory/images/9/97/Raj.jpg/revision/latest/top-crop/width/360/height/450?cb=20160122211825&path-prefix=pt-br',
      ],
      type: 'admin'
    });

    console.log(await new UserRepository().save(user));
    return { body: 'salve' }
};
