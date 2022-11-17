// import { Meteor } from 'meteor/meteor';
// import { expect } from 'chai';
// import faker from 'faker';
// import { Testimonies, testimonyPositions, testimonyTestifyingAs, testimonyTestifyingMethod } from './TestimonyCollection';
// import { defineTestUser, withLoggedInUser, withSubscriptions } from '../../test-utilities/test-utilities';
// import { defineMethod, updateMethod, removeItMethod } from '../base/BaseCollection.methods';

// /* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
// /* eslint-env mocha */

// if (Meteor.isClient) {
//   describe('TestimonyCollection Meteor Methods', function testSuite() {
//     it('Can define, update, and remove testimony', async function test1() {
//       // const { username, password } = await defineTestUser.callPromise();
//       // await withLoggedInUser({ username, password });
//       await withLoggedInUser({ });
//       await withSubscriptions();
//       const collectionName = Testimonies.getCollectionName();
//       const definitionData = {};
//       definitionData.billNo = faker.lorem.words();
//       definitionData.firstName = faker.lorem.words();
//       definitionData.lastName = faker.lorem.words();
//       definitionData.position = testimonyPositions[faker.datatype.number({ min: 0, max: testimonyPositions.length - 1 })];
//       definitionData.testifyingAs = testimonyTestifyingAs[faker.datatype.number({ min: 0, max: testimonyTestifyingAs.length - 1 })];
//       definitionData.organization = faker.lorem.words();
//       definitionData.testifyingMethod = testimonyTestifyingMethod[faker.datatype.number({ min: 0, max: testimonyTestifyingMethod.length - 1 })];
//       definitionData.testimony = faker.lorem.words();
//       definitionData.hasPdf = faker.datatype.boolean();
//       definitionData.owner = username;
//       const docID = await defineMethod.callPromise({ collectionName, definitionData });
//       expect(Testimonies.isDefined(docID)).to.be.true;
//       let doc = Testimonies.findDoc(docID);
//       expect(doc.billNo).to.equal(definitionData.billNo);
//       expect(doc.firstName).to.equal(definitionData.firstName);
//       expect(doc.lastName).to.equal(definitionData.lastName);
//       expect(doc.position).to.equal(definitionData.position);
//       expect(doc.testifyingAs).to.equal(definitionData.testifyingAs);
//       expect(doc.organization).to.equal(definitionData.organization);
//       expect(doc.testifyingMethod).to.equal(definitionData.testifyingMethod);
//       expect(doc.testimony).to.equal(definitionData.testimony);
//       expect(doc.hasPdf).to.equal(definitionData.hasPdf);
//       const updateData = {};
//       updateData.id = docID;
//       updateData.firstName = faker.lorem.words();
//       updateData.position = testimonyPositions[faker.datatype.number({ min: 0, max: testimonyPositions.length - 1 })];
//       updateData.testimony = faker.lorem.words();
//       await updateMethod.callPromise({ collectionName, updateData });
//       doc = Testimonies.findDoc(docID);
//       expect(doc.firstName).to.equal(updateData.firstName);
//       expect(doc.position).to.equal(updateData.position);
//       expect(doc.testimony).to.equal(updateData.testimony);
//       await removeItMethod.callPromise({ collectionName, instance: docID });
//       expect(Testimonies.isDefined(docID)).to.be.false;
//     });
//   });
// }
