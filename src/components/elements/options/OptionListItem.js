import React from 'react';
import { Switch } from 'antd';
//custom components
// import NodeRenderer from '../../../types/render/NodeRenderer';

const OptionListItem = (props) => {
	// render the input type for each value
	const renderInputType = () => {
		switch (props.type) {
			case 'string':
				return (
					<input
						type='text'
						defaultValue={props.value}
						style={{ float: 'right', margin: 0, padding: 0 }}
						onBlur={() => {
							props.onChange(props.keyName, props.value);
						}}
					></input>
				);
			case 'boolean':
				return (
					// <div style={{ float: 'right', margin: 0, padding: 0 }}>{props.value.toString()}</div>
					<Switch
						checked={props.value}
						checkedChildren=''
						unCheckedChildren=''
						style={{ float: 'right', margin: 0, padding: 0 }}
						onBlur={(e) => {
							props.onChange(props.keyName, !props.value);
						}}
					/>
				);
			case 'number':
				return (
					<input
						type='text'
						defaultValue={props.value.toString()}
						style={{ float: 'right', margin: 0, padding: 0 }}
						onBlur={(e) => {
							props.onChange(props.keyName, parseInt(e.target.value));
						}}
					></input>
				);
			case 'dropdown':
				// build options list for select dropdown
				let options = props.optionObject.options.map((item) => {
					return (
						<option value={item} key={item}>
							{item}
						</option>
					);
				});
				// return the select dropdown
				return (
					<select
						name={props.keyName}
						id={props.keyName}
						defaultValue={props.value}
						style={{ float: 'right', margin: 0, padding: 0 }}
						onChange={(e) => {
							props.onChange(props.keyName, e.target.value);
						}}
					>
						{options}
					</select>
				);
			default:
				return;
		}
	};

	// render the option item
	const renderOptionItem = () => {
		return (
			<li
				style={{
					color: 'black',
					width: '100%',
					backgroundColor: 'white',
					padding: '0.7rem 1.7rem',
					margin: 0,
					borderBottom: '1px solid grey',
				}}
			>
				<div style={{ float: 'left', margin: 0, padding: 0 }}>{props.name}</div>
				{renderInputType()}
			</li>
		);
	};

	return <div>{renderOptionItem()}</div>;
};

export default OptionListItem;
