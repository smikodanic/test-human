/**
 * Library for authentication
 */
import * as crypto from 'crypto';
import * as moment from 'moment';


class AuthLib {

  algorithm;
  encryption_key;
  algo: any;


  constructor() {
    this.algorithm = 'des-ede3-cbc';
    this.encryption_key = 'xcEWyDogt23wers';
    this.algo = 'base64'; // can be 'hex'
  }


  /**
   * Crypt string by synchronous Password-Based Key Derivation Function 2 (PBKDF2).
   * @param  {[type]} str - input string to be crypted
   * @return {[type]}     - encrypted string: "66ca2509023527f51651d20c898e2201e801ad0817"
   *
   * Possible alghoritms: sha1, sha256, sha512, md5
   * PBKDF2 is a one-way hashing algorithm. It's not possible to decrypt the generated hash.
   */
  strToSha256(str, salt, length) {
    if (str) {
      return crypto.pbkdf2Sync(str, salt, 1000, length, 'sha256').toString('hex');
    } else {
      return '';
    }
  }




  /**
   * Base64 encoder. Base64 is reversible function, so string can be reverted back (decoded).
   * @param  {[type]} str - input string to be crypted "test"
   * @return {[type]}     - encoded string: "dGVzdA=="
   */
  strToBase64(str) {
    const buff = new Buffer(str);
    const b64 = buff.toString('base64');
    return b64;
  }

  /**
   * Base64 decoder.
   * @param  {[type]} b64 - input string to be decoded: dGVzdA==
   * @return {[type]}     - decoded string: "test"
   */
  base64ToStr(b64) {
    const buff = new Buffer(b64, 'base64');
    const str = buff.toString();
    return str;
  }


  /**
   * Crypt and decrypt password
   * @param  {[type]} text [description]
   * @return {[type]}      [description]
   */
  encrypt(text) {
    const cipher = crypto.createCipher(this.algorithm, this.encryption_key);
    let crypted = cipher.update(text, 'utf8', this.algo);
    crypted += cipher.final(this.algo);
    return crypted;
  }

  decrypt(text) {
    const decipher = crypto.createDecipher(this.algorithm, this.encryption_key);
    let dec = decipher.update(text, this.algo, 'utf8');
    dec += decipher.final('utf8');
    return dec;
  }



  /**
   * Create moment hash.
   */
  momentEncode() {
    const now = moment().toString(); // "2017-01-06T09:10:19.542"
    const momentHash = this.strToBase64(now); // =cXQU10dzNkVORWRJBTUq9UMFp2T1EERJNTRE1UeBlmT3FUaihGcFlEcK5mU

    return momentHash;
  }

  /**
   * Decode moment hash and return Date.
   * @param {String} b64 - encoded moment value : =cXQU10dzNkVORWRJBTUq9UMFp2T1EERJNTRE1UeBlmT3FUaihGcFlEcK5mU
   */
  momentDecode(b64) {
    const momentStr = this.base64ToStr(b64);
    const momentDate = new Date(momentStr);
    const mom = moment(momentDate);

    return mom;
  }


}



export default AuthLib;
