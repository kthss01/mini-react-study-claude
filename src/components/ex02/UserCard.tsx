type UserCardProps = {
	name: string;
	email: string;
	age?: number;
	isAdmin?: boolean;
	bio?: string;
};

export const UserCard = ({
	name,
	email,
	age,
	isAdmin,
	bio,
}: UserCardProps): React.JSX.Element => {
	return (
		<div>
			[{name}] {isAdmin ? "(관리자)" : ""}
			<br />
			나이: {age ? `${age}세` : "정보 없음"}
			<br />
			이메일: {email}
			<br />
			{bio ? `자기소개: ${bio}` : ""}
		</div>
	);
};
