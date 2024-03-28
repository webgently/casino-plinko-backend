import colors from 'colors'

export const setlog = function(title: string,msg?: any,noWrite?: boolean) {
	const date = new Date();
	const timetext:string = [('0' + date.getUTCHours()).slice(-2), ('0' + date.getUTCMinutes()).slice(-2), ('0' + date.getUTCSeconds()).slice(-2)].join(':')
	let isError = false
	if (msg instanceof Error) {
		msg = msg.stack || msg.message
		isError = true
	}
	if (msg) msg = msg.split(/\r\n|\r|\n/g).map((v:any)=>'\t' + String(v)).join('\r\n')
	if (msg && isError) msg = colors.red(msg)
	console.log(
		colors.gray('[' + timetext + ']'),
		colors.white(title),
		msg ? '\r\n' + msg : ''
	)
};

export const getPaginationMeta = (page: number, count: number, limit: number) => {
	const total = Math.ceil(count / limit);
	if (page > total) page = total;
	if (page < 1) page = 1;
	let start = (page - 3) <= 0 ? 1 : (page - 3);
	let last = (start + 5) > total ? total : (start + 5);
	if (last - start < 5) start = (last - 5) <= 0 ? 1 : (last - 5);
	return {page, start, last, total, limit};
}

export const currentTime = () => Math.round(new Date().getTime() / 1000)

export const currentDate = () => {
	const d = new Date();
	return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}