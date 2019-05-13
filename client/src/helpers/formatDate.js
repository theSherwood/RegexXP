import moment from "moment";

export default date => {
  moment.locale();
  return moment(date)
    .startOf("minute")
    .fromNow();
};
