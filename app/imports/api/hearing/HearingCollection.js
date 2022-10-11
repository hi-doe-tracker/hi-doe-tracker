import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { isValidMeasureType } from '../legislature/measureTypes';

export const hearingPublications = {
  hearings: 'hearings',
  hearingsAdmin: 'hearingsAdmin', // not sure if we need this.
};

class HearingCollection extends BaseCollection {
  constructor() {
    super('Hearings', new SimpleSchema({
      year: Number,
      measureType: String,
      measureNumber: Number,
      measureRelativeUrl: { type: String, optional: true },
      code: { type: String, optional: true },
      committee: { type: String, optional: true },
      lastUpdated: { type: Date, optional: true },
      timestamp: { type: Date, optional: true },
      datetime: { type: String, optional: true },
      description: { type: String, optional: true },
      room: { type: String, optional: true },
      notice: { type: String, optional: true },
      noticeUrl: { type: String, optional: true },
      noticePdfUrl: { type: String, optional: true },
    }));
  }

  define({ year, measureType, measureNumber, measureRelativeUrl, code, committee, lastUpdated, timestamp, datetime, description, room, notice, noticeUrl, noticePdfUrl }) {
    // UNIQUE (year, measureType, measureNumber, notice)
    if (this.isDefined({ year, measureType, measureNumber, notice })) {
      return this.findDoc({ year, measureType, measureNumber, notice })._id;
    }
    if (!isValidMeasureType(measureType)) {
      throw new Meteor.Error(`${measureType} is an invalid Measure Type.`);
    }
    const docID = this._collection.insert({ year, measureType, measureNumber, measureRelativeUrl, code, committee, lastUpdated, timestamp, datetime, description, room, notice, noticeUrl, noticePdfUrl });
    return docID;
  }

  update(docID, {
    year, measureType, measureNumber, measureRelativeUrl, code, committee, timestamp, datetime, description,
    room, notice, noticeUrl, noticePdfUrl,
  }) {
    const updateData = {};
    // if (year) { NOTE: 0 is falsy, so we need to check if the year is a number.
    if (_.isNumber(year)) {
      updateData.year = year;
    }
    if (measureType) {
      if (!isValidMeasureType(measureType)) {
        throw new Meteor.Error(`${measureType} is an invalid Measure Type.`);
      }
      updateData.measureType = measureType;
    }
    if (_.isNumber(measureNumber)) {
      updateData.measureNumber = measureNumber;
    }
    if (measureRelativeUrl) {
      updateData.measureRelativeUrl = measureRelativeUrl;
    }
    if (code) {
      updateData.code = code;
    }
    if (committee) {
      updateData.committee = committee;
    }
    updateData.lastUpdated = new Date();
    if (timestamp) {
      updateData.timestamp = timestamp;
    }
    if (datetime) {
      updateData.datetime = datetime;
    }
    if (description) {
      updateData.description = description;
    }
    if (measureType) {
      updateData.measureType = measureType;
    }
    if (room) {
      updateData.room = room;
    }
    if (notice) {
      updateData.notice = notice;
    }
    if (noticeUrl) {
      updateData.noticeUrl = noticeUrl;
    }
    if (noticePdfUrl) {
      updateData.noticePdfUrl = noticePdfUrl;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the HearingCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(hearingPublications.hearings, function publish() {
        if (this.userId) {
          return instance._collection.find({});
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(hearingPublications.hearingsAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  subscribeHearings() {
    if (Meteor.isClient) {
      return Meteor.subscribe(hearingPublications.hearings);
    }
    return null;
  }

  subscribeHearingsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(hearingPublications.hearingsAdmin);
    }
    return null;
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @returns {{noticePdfUrl: *, measureNumber: *, code: *, committee: *, year: (*|moment.numberlike|((y: number) => moment.Moment)|(() => number)|number|"numeric"|"2-digit"|string),
   * description: *, room: *, lastUpdated: *, datetime: *, measureRelativeUrl: *, noticeUrl: *, measureType: *, timestamp: *, notice: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const year = doc.year;
    const measureType = doc.measureType;
    const measureNumber = doc.measureNumber;
    const measureRelativeUrl = doc.measureRelativeUrl;
    const code = doc.code;
    const committee = doc.committee;
    const lastUpdated = doc.lastUpdated;
    const timestamp = doc.timestamp;
    const datetime = doc.datetime;
    const description = doc.description;
    const room = doc.room;
    const notice = doc.notice;
    const noticeUrl = doc.noticeUrl;
    const noticePdfUrl = doc.noticePdfUrl;
    return { year, measureType, measureNumber, measureRelativeUrl, code, committee, lastUpdated, timestamp, datetime, description, room, notice, noticeUrl, noticePdfUrl };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Hearings = new HearingCollection();
