import { rateLimit } from 'express-rate-limit'

export const limiter = rateLimit({
	windowMs: 5 * 1000, // 5 sec
	limit: 1,
	standardHeaders: 'draft-8',
	legacyHeaders: false,
	// store: ... , // Redis, Memcached, etc. See below.
})