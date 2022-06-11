/**
 * Library for time manipulation
 */

class TimeLib {

  /**
   * Convert seconds to more human readable string
   * @param   seconds [description]
   * @return        [description]
   */
  secondsToString(seconds) {
    const numdays = Math.floor(seconds / 86400);
    const numhours = Math.floor((seconds % 86400) / 3600);
    const numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
    const numseconds = ((seconds % 86400) % 3600) % 60;
    return numdays + ' days ' + numhours + ' hours ' + numminutes + ' minutes ' + numseconds + ' seconds';
  }

}


export default TimeLib;
