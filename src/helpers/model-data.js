const parseString = require('xml2js').parseString;

const modelData = (data) => {
  const notices = {
    warnings: {},
    alerts: {},
  };

  data.forEach((dataObj) => {
    parseString(dataObj, (err, res) => {
      const advisory = res.rss.channel[0];
      const title = advisory.title[0];
      const type = title.toLowerCase().includes('warning') ? 'warnings' : 'alerts';
      notices[type].title = `travel ${type}`;
      notices[type].description = advisory.description[0].toLowerCase();
      notices[type].list = [];
      advisory.item.forEach((detail) => {
        notices[type].list.push({
          country: detail.title[0].toLowerCase()
                   .replace(/ travel (warning|alert)/g, ''),
          issuedAt: detail.pubDate[0].replace(/EST/, 'Eastern Standard Time')
                    .toLowerCase(),
          description: detail.description[0]
                        .toLowerCase()
                        .replace(/\\n/g, ' ')
                        .replace(/\<.*?\>\s?/g, ' ')
                        .replace(/\&.*?\;\s?/g, ' '),
        });
      });
    });
  });
  return notices;
};

module.exports = { modelData };
