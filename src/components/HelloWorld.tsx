import React from "react";

interface HelloWorldProps {
	name: string;
	message: string;
}

const HelloWorld = ({ name, message }: HelloWorldProps) => {
	return (
		<div>
			안녕하세요, {name}님!
			<br />
			{message}
		</div>
	);
};

export default HelloWorld;
