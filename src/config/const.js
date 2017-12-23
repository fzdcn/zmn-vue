// API接口基础地址
export const DEBUG = process.env.NODE_ENV !== 'production'
export const API_BASE = DEBUG ? 'http://192.168.18.69/zhuomuniao/frontend/web/api/v2/' : ('http://' + window.location.host + '/api/v2')
export const QI_NIU_CDN_DOMAIN = 'cdn.yfcanshi.com'

// 本地存储的文件信息相关，本地存储的信息内容【格式】有更新时更改次版本
export const LOCAL_STORAGE_VERSION = 1.0
