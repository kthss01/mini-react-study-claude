interface HelloWorldProps {
	name: string;
	message: string;
}

const HelloWorld = ({ name, message }: HelloWorldProps): React.JSX.Element => {
	return (
		<div>
			안녕하세요, {name}님!
			<br />
			{message}
		</div>
	);
};

export default HelloWorld;
