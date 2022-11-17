// import { Meteor } from 'meteor/meteor';
// import { expect } from 'chai';
// // import faker from 'faker';
// import fc from 'fast-check';
// import { Testimonies, testimonyPositions, testimonyTestifyingAs, testimonyTestifyingMethod } from './TestimonyCollection';
// import { removeAllEntities } from '../base/BaseUtilities';

// /* eslint prefer-arrow-callback: "off",  no-unused-expressions: "off" */
// /* eslint-env mocha */

// if (Meteor.isServer) {
//   describe('TestimonyCollection', function testSuite() {
//     before(function setup() {
//       removeAllEntities();
//     });

//     after(function teardown() {
//       removeAllEntities();
//     });

//     it('Can define and removeIt', function test1(done) {
//       fc.assert(
//         fc.property(
//           fc.lorem({ maxCount: 1 }),
//           fc.lorem({ maxCount: 1 }),
//           fc.integer({ min: 0, max: testimonyPositions.length - 1 }),
//           fc.lorem({ maxCount: 1 }),
//           fc.integer({ min: 0, max: testimonyTestifyingAs.length - 1 }),
//           fc.integer({ min: 0, max: testimonyTestifyingMethod.length - 1 }),
//           fc.lorem({ maxCount: 1 }),
//           fc.lorem({ maxCount: 1 }),
//           fc.boolean(),
//           (firstName, lastName, choice1, organization, choice2, choice3, testimony, billNo, hasPdf) => {
//             const position = testimonyPositions[choice1];
//             const testifyingAs = testimonyTestifyingAs[choice2];
//             const testifyingMethod = testimonyTestifyingMethod[choice3];
//             const docID = Testimonies.define({
//               firstName,
//               lastName,
//               position,
//               organization,
//               testifyingAs,
//               testifyingMethod,
//               testimony,
//               billNo,
//               hasPdf,
//             });
//             expect(Testimonies.isDefined(docID)).to.be.true;
//             Testimonies.removeIt(docID);
//             expect(Testimonies.isDefined(docID)).to.be.false;
//           },
//         ),
//       );
//       done();
//     });
//     /*
//     it('Can define duplicates', function test2() {
//       const firstName = faker.animal.dog();
//       const lastName = faker.animal.dog();
//       const quantity = faker.datatype.number({ min: 1, max: 5 });
//       const owner = faker.internet.email();
//       const condition = stuffConditions[Math.floor(Math.random() * stuffConditions.length)];
//       const docID1 = Stuffs.define({ name, quantity, condition, owner });
//       const docID2 = Stuffs.define({ name, quantity, condition, owner });
//       expect(docID1).to.not.equal(docID2);
//     });

//     it('Can update', function test3(done) {
//       const name = faker.lorem.words();
//       const quantity = faker.datatype.number({
//         min: 1,
//         max: 10,
//       });
//       const owner = faker.lorem.words();
//       const condition = stuffConditions[faker.datatype.number({ min: 1, max: stuffConditions.length - 1 })];
//       const docID = Stuffs.define({
//         name,
//         quantity,
//         owner,
//         condition,
//       });
//       fc.assert(
//         fc.property(
//           fc.lorem(2),
//           fc.integer(10),
//           fc.integer(0, stuffConditions.length - 1),
//           (newName, newQuantity, index) => {
//             Stuffs.update(docID, {
//               name: newName,
//               quantity: newQuantity,
//               condition: stuffConditions[index],
//             });
//             const stuff = Stuffs.findDoc(docID);
//             expect(stuff.name).to.equal(newName);
//             expect(stuff.quantity).to.equal(newQuantity);
//             expect(stuff.condition).to.equal(stuffConditions[index]);
//           },
//         ),
//       );
//       done();
//     });

//     it('Can dumpOne, removeIt, and restoreOne', function test4() {
//       const origDoc = Stuffs.findOne({});
//       let docID = origDoc._id;
//       const dumpObject = Stuffs.dumpOne(docID);
//       Stuffs.removeIt(docID);
//       expect(Stuffs.isDefined(docID)).to.be.false;
//       docID = Stuffs.restoreOne(dumpObject);
//       expect(Stuffs.isDefined(docID)).to.be.true;
//       const doc = Stuffs.findDoc(docID);
//       expect(doc.name).to.equal(origDoc.name);
//       expect(doc.quantity).to.equal(origDoc.quantity);
//       expect(doc.condition).to.equal(origDoc.condition);
//       expect(doc.owner).to.equal(origDoc.owner);
//     });
//     */
//   });
// }
