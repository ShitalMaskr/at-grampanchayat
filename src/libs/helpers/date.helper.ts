import moment from "moment";

/**
 * 
 * @param hours add number of hours 
 * @returns 
 */
export const getUTCTimestamp = (hours: number = 0) =>
    moment().add((hours), 'h').utc().valueOf()
