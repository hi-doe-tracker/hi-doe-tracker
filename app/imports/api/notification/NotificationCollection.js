import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const notificationPublications = {
  notification: 'Notification',
  notificationAdmin: 'NotificationAdmin',
};

class NotificationCollection extends BaseCollection {
  constructor() {
    super('Notifications', new SimpleSchema({
      message: { type: String, optional: true },
      messageType: { type: String, optional: true },
      recipient: { type: String, optional: true },
      link: { type: String, optional: true },
    }));
  }

  /**
   * Defines a new Notification item.
   * @param message the message of the notification.
   * @param messageType the type of message.
   * @param recipient the recipient of the message.
   * @param link the link to the appropriate area.
   * @return {String} the docID of the new document.
   */
  define({ message, messageType, recipient, link }) {
    const docID = this._collection.insert({
      message,
      messageType,
      recipient,
      link,
    });
    return docID;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(notificationPublications.notification, function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(notificationPublications.notificationAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribeNotification() {
    if (Meteor.isClient) {
      return Meteor.subscribe(notificationPublications.notification);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeNotificationAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(notificationPublications.notificationAdmin);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const message = docID.message;
    const messageType = docID.messageType;
    const recipient = docID.recipient;
    const link = docID.link;
    return { message, messageType, recipient, link };
  }
}

export const Notifications = new NotificationCollection();
