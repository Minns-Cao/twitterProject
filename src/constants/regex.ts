export const REGEX_USERNAME = /^(?![0-9]+$)[A-Za-z0-9_]{4,15}$/
// /^(?![0-9]+$)[A-Za-z0-9_]{4,15}$/ để xử lý username
// (?![0-9]+$) : không được toàn là số, phải có chữ cái
// [A-Za-z0-9_]: những ký tự được cho phép
// {4,15} :giới hạn từ 4-15 ký tự
