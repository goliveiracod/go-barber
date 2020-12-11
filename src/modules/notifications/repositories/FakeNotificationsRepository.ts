import { ObjectID } from 'mongodb';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notification';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    let notification = new Notification();

    notification = {
      ...notification,
      id: new ObjectID(),
      content,
      recipient_id,
    };

    notification.id = new ObjectID();

    this.notifications = [...this.notifications, notification];

    return notification;
  }
}

export default FakeNotificationsRepository;
