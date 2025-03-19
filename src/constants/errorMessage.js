export const errorCodeMessages = {
	// 认证错误
	AUTH_INVALID_CREDENTIALS: "用户名或密码错误",
	AUTH_ACCOUNT_LOCKED: "账户已被锁定",
	AUTH_FAILED: "认证失败",
	AUTH_WRONG_CAPTCHA: "验证码错误",
	AUTH_EXPIRED_CAPTCHA: "验证码已过期",

	// 用户相关错误
	USER_ALREADY_EXISTS: "用户名已被注册",
	USER_NOT_FOUND: "用户不存在",
	USER_INVALID_EMAIL: "邮箱格式不正确",
	USER_TYPE_NOT_EXIST: "用户类型不存在",
	ROLE_TYPE_NOT_EXIST: "角色类型不存在",
	PASSWORD_DOUBLE_CHECK_FAILED: "新密码与确认密码不一致",
	USER_PASSWORD_MISMATCH: "用户密码不匹配",

	// 权限相关
	ACCESS_DENIED: "访问权限不足",

	// 通用错误
	INVALID_NUMBER_FORMAT: "数字格式不正确",
	INVALID_PARAMETER: "请求参数无效",
	INVALID_HTTP_MESSAGE: "非法的JSON数据格式",
	INTERNAL_SERVER_ERROR: "服务器内部错误"
}