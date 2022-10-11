import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const TestimonyFileCollection = new FilesCollection({
  collectionName: 'testimonyfiles',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /pdf/i.test(file.extension)) {
      return true;
    }
    return 'Please upload files, with size equal or less than 10MB';
  }
});

if (Meteor.isClient) {
  Meteor.subscribe('testimony_files');
}

if (Meteor.isServer) {
  Meteor.publish('testimony_files', function () {
    return TestimonyFileCollection.find().cursor;
  });
}