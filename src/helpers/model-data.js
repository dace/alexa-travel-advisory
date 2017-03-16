const parser = require('xml2json');

const modelData = (dataObj) => {
  const notices = {
    warnings: {},
    alerts: {},
  };
  
  dataObj.forEach((item) => {
    const advisory = JSON.parse(parser.toJson(item)).rss.channel;
    const type = advisory.title.toLowerCase().includes('warning') ? 'warnings' : 'alerts';
    notices[type].title = `travel ${type}`;
    notices[type].description = advisory.description;
    notices[type].list = [];
    advisory.item.forEach((detail) => {
      notices[type].list.push({
        title: detail.title,
        issuedAt: detail.pubDate,
        description: detail.description
                      .replace(/\\n/g, ' ')
                      .replace(/\<.*?\>\s?/g, ' ')
                      .replace(/\&.*?\;\s?/g, ' '),
      });
    });
  });
  return notices;
};

module.exports = { modelData };
