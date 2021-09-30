const EventEmitter = require("events");
const event = new EventEmitter();
const logger = require("./logger.js");

module.exports = {
  init: () => {
    logger.info("Event has been initialized");

    return event;
  },
  getEvent: (eventname) => {
    logger.info("getEvent called ");
    event.on(eventname, (data) => {
      logger.info("event is on");
      console.log(
        `emmited event: ${eventname} has been registered with data = ${data}`
      );
    });
  },
};
