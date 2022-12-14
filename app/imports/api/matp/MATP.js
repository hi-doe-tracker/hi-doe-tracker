import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../stuff/StuffCollection';
import { AdminProfiles } from '../user/AdminProfileCollection';
import { UserProfiles } from '../user/UserProfileCollection';
import { Testimonies } from '../testimony/TestimonyCollection';
import { Notices } from '../notice/NoticeCollection';
import { ScraperBills } from '../scraperBill/ScraperBillCollection';
import { Bills } from '../bill/BillCollection';
import { Hearings } from '../hearing/HearingCollection';
import { TestimonyProgresses } from '../testimonyProgress/TestimonyProgressCollection';
import { Notifications } from '../notification/NotificationCollection';

class MATPClass {
  collections;

  collectionLoadSequence;

  collectionAssociation;

  constructor() {
    // list of all the MATP collections
    this.collections = [
      AdminProfiles,
      Stuffs,
      UserProfiles,
      Testimonies,
      TestimonyProgresses,
      Notices,
      ScraperBills,
      Bills,
      Hearings,
      Notifications,
    ];
    /*
     * A list of collection class instances in the order required for them to be sequentially loaded from a file.
     */
    this.collectionLoadSequence = [
      AdminProfiles,
      UserProfiles,
      Stuffs,
      Testimonies,
      TestimonyProgresses,
      Notices,
      ScraperBills,
      Bills,
      Hearings,
      Notifications,
    ];

    /*
     * An object with keys equal to the collection name and values the associated collection instance.
     */
    this.collectionAssociation = {};
    this.collections.forEach((collection) => {
      this.collectionAssociation[collection.getCollectionName()] = collection;
    });

  }

  /**
   * Return the collection class instance given its name.
   * @param collectionName The name of the collection.
   * @returns The collection class instance.
   * @throws { Meteor.Error } If collectionName does not name a collection.
   */
  getCollection(collectionName) {
    // console.log('MATP', collectionName, this.collectionAssociation[collectionName]);
    const collection = this.collectionAssociation[collectionName];
    if (!collection) {
      throw new Meteor.Error(`Called MATP.getCollection with unknown collection name: ${collectionName}`);
    }
    return collection;
  }
}

export const MATP = new MATPClass();
