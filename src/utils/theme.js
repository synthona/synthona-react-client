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
				cardTitleColor: 'white',
				cardButtonColor: 'white',
				cardHeaderColor: 'rgba(0, 0, 0, .6)',
				cardBodyColor: 'rgba(0, 0, 0, .3)',
				cardTextColor: '#e7e7e7',
				graphNodeColor: 'rgba(255, 255, 255, .7)',
				graphNodeBorderColor: '#e7e7e7',
				graphNodeHoverColor: 'rgba(255, 255, 255, .4)',
				graphNodeBorderHoverColor: 'rgba(255, 255, 255, .4)',
				textEditorBackground: 'white',
				textEditorText: '#272727',
			};
			break;
		case 'translucent green':
			colors = {
				cardTitleColor: '#03fc88',
				cardButtonColor: '#03fc88',
				cardHeaderColor: 'rgba(0, 0, 0, .6)',
				cardBodyColor: 'rgba(0, 0, 0, .3)',
				cardTextColor: '#e7e7e7',
				graphNodeColor: '#03fc88',
				graphNodeBorderColor: '#03fc88',
				graphNodeHoverColor: 'rgba(3, 252, 136, .5)',
				graphNodeBorderHoverColor: 'rgba(3, 252, 136, .5)',
				textEditorBackground: 'white',
				textEditorText: '#272727',
			};
			break;
		case 'translucent blue':
			colors = {
				cardTitleColor: '#34d5eb',
				cardButtonColor: '#34d5eb',
				cardHeaderColor: 'rgba(0, 0, 0, .6)',
				cardBodyColor: 'rgba(0, 0, 0, .3)',
				cardTextColor: '#e7e7e7',
				graphNodeColor: '#34d5eb',
				graphNodeBorderColor: '#3651ff',
				graphNodeHoverColor: 'rgba(50, 66, 168, .5)',
				graphNodeBorderHoverColor: 'rgba(50, 66, 168, .5)',
				textEditorBackground: 'white',
				textEditorText: '#272727',
			};
			break;
		case 'translucent red':
			colors = {
				cardTitleColor: '#ff3d78',
				cardButtonColor: '#ff3d78',
				cardHeaderColor: 'rgba(0, 0, 0, .6)',
				cardBodyColor: 'rgba(0, 0, 0, .3)',
				cardTextColor: '#e7e7e7',
				graphNodeColor: '#ff3d78',
				graphNodeBorderColor: '#c70a43',
				graphNodeHoverColor: 'rgba(255, 61, 120, .5)',
				graphNodeBorderHoverColor: 'rgba(255, 61, 120, .5)',
				textEditorBackground: 'white',
				textEditorText: '#272727',
			};
			break;
		case 'translucent yellow':
			colors = {
				cardTitleColor: '#faff63',
				cardButtonColor: '#faff63',
				cardHeaderColor: 'rgba(0, 0, 0, .6)',
				cardBodyColor: 'rgba(0, 0, 0, .3)',
				cardTextColor: '#e7e7e7',
				graphNodeColor: '#faff63',
				graphNodeBorderColor: '#e7e7e7',
				graphNodeHoverColor: 'rgba(250, 255, 99, .5)',
				graphNodeBorderHoverColor: 'rgba(250, 255, 99, .5)',
				textEditorBackground: 'white',
				textEditorText: '#272727',
			};
			break;
		case 'translucent orange':
			colors = {
				cardTitleColor: '#ffa424',
				cardButtonColor: '#ffa424',
				cardHeaderColor: 'rgba(0, 0, 0, .6)',
				cardBodyColor: 'rgba(0, 0, 0, .3)',
				cardTextColor: '#e7e7e7',
				graphNodeColor: '#ffa424',
				graphNodeBorderColor: '#e7e7e7',
				graphNodeHoverColor: 'rgba(255, 164, 36, .5)',
				graphNodeBorderHoverColor: 'rgba(255, 164, 36, .5)',
				textEditorBackground: 'white',
				textEditorText: '#272727',
			};
			break;
		default:
			break;
	}
	return colors;
};
