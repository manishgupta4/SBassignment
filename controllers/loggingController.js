import fs from 'fs'

class LoggingController {
  static RequestLogCreater = async (req) => {
    return [req.body, req.user , req.param];
  }

  static ResponseLogCreater = async (res) => {
    return res;
  }

  static logToCsv(request , response) {
    const reqBody = JSON.stringify(request.body || '');
    const reqUser = JSON.stringify(request.user || '');
    const reqParam = JSON.stringify(request.params || '');
    response = JSON.stringify(response || '');
    const logData = `${reqBody},${reqUser},${reqParam},${response}\n`;
    fs.appendFile('log.csv', logData, (err) => {
        if (err) throw err;
    });
  }
}

export default LoggingController