export const setupTheme = () => {
	let theme = JSON.parse(localStorage.getItem('theme'));
	let colors = {};
	switch (theme) {
		case 'classic':
			colors = {
				cardTitleColor: '#03fc88',
				cardButtonColor: 'white',
				cardHeaderColor: '#111111',
				cardBodyColor: '#111111',
				cardTextColor: '#e7e7e7',
				graphNodeColor: '#ffffff',
				graphNodeBorderColor: '#fff019',
				graphNodeHoverColor: '#f0ff99',
				graphNodeBorderHoverColor: '#f0ff99',
				textEditorBackground: 'white',
				textEditorText: 'black',
			};
			break;
		case 'light':
			colors = {
				cardTitleColor: 'black',
				cardButtonColor: 'black',
				cardHeaderColor: '#e7e7e7',
				cardBodyColor: '#e7e7e7',
				cardTextColor: 'grey',
				graphNodeColor: '#f0ff99',
				graphNodeBorderColor: '#f0ff99',
				graphNodeHoverColor: 'white',
				graphNodeBorderHoverColor: 'white',
				textEditorBackground: 'white',
				textEditorText: 'black',
			};
			break;
		case 'translucent':
			colors = {
				cardTitleColor: '#03fc88',
				cardButtonColor: '#03fc88',
				cardHeaderColor: 'rgba(0, 0, 0, .8)',
				cardBodyColor: 'rgba(0, 0, 0, .3)',
				cardTextColor: '#e7e7e7',
				graphNodeColor: '#03fc88',
				graphNodeBorderColor: '#e7e7e7',
				graphNodeHoverColor: 'rgba(3, 252, 136, .3)',
				graphNodeBorderHoverColor: 'rgba(3, 252, 136, .3)',
				textEditorBackground: 'white',
				textEditorText: '#272727',
			};
			break;
		default:
			break;
	}
	return colors;
};
