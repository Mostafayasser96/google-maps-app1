import axiosLib from 'axios';
const getCookie = (cookie: string): string => {
	console.log('get cookie', document.cookie)
	if (document.cookie) {
		const allCookies = document.cookie.split(';')
		for (let i = 0; i < allCookies.length; i += 1) {
			const name = allCookies[i].split('=')[0].toLowerCase().trim()
			const value = allCookies[i].split('=')[1].trim()
			if (name === cookie) {
				return value
			}
			if (value === cookie) {
				return name
			}
		}
	}
	return ''
}
const axiosInst = axiosLib.create({
	headers: {
		'Accept': 'application/json',
		'Authorization': `Bearer ${getCookie('token')}`
	}
})
export default axiosInst;