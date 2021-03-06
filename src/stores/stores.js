import { writable } from 'svelte/store';
import { browser } from '$app/env';

export const userToken = writable((browser && localStorage.getItem('token')) || null);

userToken.subscribe((token) => {
	browser && localStorage.setItem('token', token);
});
