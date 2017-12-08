//appid及appsecret
const AppConf = { 'appid': 'wxaa96bb0942b0eff2', 'appsecret': '0b44d65c2e289bc8bee75e5b9df23b99' };
const apiHost = 'https://ab.crm.magcloud.cc';

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
