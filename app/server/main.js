import { Meteor } from 'meteor/meteor';
import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
// be sure to import the methods.
import '../imports/api/base/BaseCollection.methods';
import '../imports/api/user/UserProfileCollection.methods';
import '../imports/api/testimony/TestimonyFileCollection';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

if(!Meteor.settings.test){
  dotenv.config( {
  path: Assets.absoluteFilePath('.env'),
} )
const nodeMailer = nodemailer.createTransport({
    host: 'smtp.fastmail.com',
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
 }
);
Meteor.methods({
  sendEmail(subject, html, recepient) {
    console.log(recepient)
    nodeMailer.sendMail(
        { 
            from: '"HI DOE TRACKER" <hidoetracker@fastmail.com>',
            to: recepient === '' ? `ugautam@hawaii.edu` : recepient,
            subject: subject,
            html : html,
        }
          , (err) => {
      if (err) {
        // throw new Meteor.Error('invalid')
        console.log(err)
        return err
      }
    });
  }
}, );

}


// console.log(Meteor.isServer)
