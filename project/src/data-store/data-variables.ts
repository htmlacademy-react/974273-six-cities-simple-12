export enum AppRoute {
	Main = '/',
	Room = 'offer/:id',
	Login = 'login',
	PrivateOffice = 'private',
	NoPlace = 'no-place',
	Error_404 = 'error/404'
}

export enum AuthorizationStatus {
	Auth = 'AUTH',
	NoAuth = 'NO_AUTH',
	Unknown = 'UNKNOWN',
}

export const optionsSorting = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export enum RentSort {
	PriceMax = 'Price: low to high',
	PriceMin = 'Price: high to low',
	RatingMax = 'Top rated first',
}

export enum APIRoute {
	Hotels = '/hotels',
	Login = '/login',
	Logout = '/logout',
	Comments = '/comments/',
}

export enum NameSpace {
	Data = 'DATA',
	Main = 'MAIN',
	User = 'USER',
}
